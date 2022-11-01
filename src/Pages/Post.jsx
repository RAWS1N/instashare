import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notifier from "../utils/notifier";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

  function Post() {
  const [post, setPostData] = useState({ title: "", description: "" });
  const Navigate = useNavigate();
  const { id } = useParams();
  const collectionRef = collection(db, "posts");
  const [user, loading] = useAuthState(auth);
  const docRef = id && doc(db, "posts", id);
  

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setPostData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function checkUser() {
    if (loading) return;
    if (!user) return Navigator("/login");
    const docSnap =  await getDoc(docRef);
    const { title, description } =  docSnap.data();
    setPostData({title:title, description:description });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      console.log("id received");
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      Notifier("Post has been updated")
      return Navigate("/");
    } else {
      const generateDoc = await addDoc(collectionRef, {
        ...post,
        user: user.uid,
        avatar:  user.photoURL,
        username: user.displayName,
        timestamp: serverTimestamp(),
      });
      Notifier("Post added successfully")
      Navigate("/");
      setPostData({ title: "", description: "" });
      return generateDoc;
    }
  }

  useEffect(() => {
    checkUser()
  }, [ user, loading]);
  return (
    <div className="flex  justify-center items-center w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex sm: w-5/6 sm: -mt-32 md:w-1/3  sm:my- h-1/2 gap-4 justify-center rounded-lg  flex-col items-center bg-gray-800"
      >
        <h2 className="text-white  font-medium text-lg my-4">Create Post</h2>

        <input
          name="title"
          id="title"
          className="pl-2 w-3/4 m-2 mt-0 pt-0 rounded-sm"
          placeholder="Title*"
          value={post.title}
          onChange={handleChange}
          required={true}
        />
        <textarea
          name="description"
          placeholder="description*"
          className="pl-2 w-3/4 h-1/3 rounded-lg"
          value={post.description}
          onChange={handleChange}
          required={true}
        />
        <button className="bg-cyan-400 px-2 rounded-sm py-1 w-1/3 my-4 ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Post;
