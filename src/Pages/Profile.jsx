import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  onSnapshot,
  query,
  where,
  doc,
} from "firebase/firestore";
import { Message } from "../Components";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import Notifier from "../utils/notifier";

function Profile() {
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const Navigate = useNavigate();

  function getPosts() {
    if (loading) return;
    if (!user) return Navigate("/login");
    const collectionRef = collection(db, "posts");
    const Query = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(Query, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }

  function logOut() {
    Notifier("Logged out successfully");
    signOut(auth);
  }
  function deletePost(id) {
    const docRef = doc(db, "posts", id);
    deleteDoc(docRef);
  }

  useEffect(() => {
    if (!user) return Navigate("/login");
    getPosts();
  }, [user, loading]);

  return (
    <div>
      <div className="flex m-4 border-b-2 border-black items-center justify-between">
        <h1>Welcome, {user?.displayName ? user.displayName : "Anonymous"}</h1>
        <button
          onClick={logOut}
          className="bg-gray-600 px-4 py-1 m-2 text-white"
        >
          Logout
        </button>
      </div>
      <div>
        {posts.map((post) => (
          <Message key={post.id} {...post}>
            <div className="flex items-center gap-4 font-medium text-2xl mt-4 bg-white pr-4 cursor-pointer">
              <div
                onClick={() => deletePost(post.id)}
                className="flex items-center"
              >
                <MdDeleteForever className="text-red-500 " />
                <p className="text-sm self-end">Delete</p>
              </div>
              <Link to={`/post/${post.id}`}>
                <div className="flex items-center gap-1">
                  <AiOutlineEdit className="text-green-500" />
                  <p className="text-sm self-end">Edit</p>
                </div>
              </Link>
            </div>
          </Message>
        ))}
      </div>
    </div>
  );
}

export default Profile;
