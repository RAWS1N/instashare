import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import Notifier from "../utils/notifier";
import { Message, Comment } from "../Components";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function CommentPage() {
  const { id } = useParams();
  const [user, loading] = useAuthState(auth);
  const Navigate = useNavigate();
  const [data, setData] = useState({
    show: false,
    comment: "",
    post: "",
  });
  const [allComments, setAllComments] = useState([]);

  function toggleShow() {
    setData((prevState) => ({
      ...prevState,
      comment: "",
      show: !prevState.show,
    }));
  }

  async function getAllComments() {
    // if(!user) return Navigate("/login")
    const docRef = doc(db, "posts", id);
    // const docSnap = await getDoc(docRef);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllComments(snapshot.data()?.comments?.reverse());
      setData((prevState) => ({ ...prevState, post: snapshot.data() }));
    });
    return unsubscribe;
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function getPost() {
    if (loading) return;
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    setData((prevState) => ({
      ...prevState,
      post: docSnap?.data(),
    }));
  }

  function notify(message) {
    return Notifier(message);
  }
  async function AddComment(e) {
    if (!user) return Navigate("/login");
    e.preventDefault();
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        comment: data.comment,
        username: user.displayName,
        avatar: user.photoURL,
        timestamp: Timestamp.now(),
      }),
    });
    notify("Comment added successfully");
    setData((prevState) => ({ ...prevState, comment: "" }));
  }

  useEffect(() => {
    if (loading) return;
    // if (!user) return Navigate("/login");
    getPost();
    getAllComments();
  }, [loading, user]);

  return (
    <div>
      <div className="sticky top-0 bg-white">
        <Message key={id} {...data.post} styles="shadow-lg border-2">
          <div className="flex justify-end my-2">
            <div
              onClick={toggleShow}
              className="flex items-center cursor-pointer select-none gap-2 bg-black px-6 py-2 rounded-lg text-white"
            >
              <h4>Add Comment</h4>
              {!data.show ? (
                <BsChevronDown className="font-medium  text-xl" />
              ) : (
                <BsChevronUp className="font-medium text-xl" />
              )}
            </div>
          </div>
        </Message>
      </div>
      {data.show && (
        <form
          onSubmit={AddComment}
          className="flex md:flex-row sm: flex-col  w-full gap-4 items-center my-4"
        >
          <input
            placeholder="comment..."
            required={true}
            name="comment"
            value={data.comment}
            onChange={handleChange}
            className="w-4/5 h-10 my-auto mx-3 py-auto border-2 border-gray-500 max-h-10 rounded-lg px-2"
          />
          <div className="flex md:gap-2 sm: gap-4">
            <button
              type="submit"
              className="border rounded-full px-6  bg-black text-white py-1.5"
              disabled={!data.comment.length > 0}
            >
              Comment
            </button>
            <button
              onClick={toggleShow}
              className="border mr-4 rounded-full bg-gray-100 px-6 py-1.5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div>
        {allComments?.map((item, idx) => (
          <Comment key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

export default CommentPage;
