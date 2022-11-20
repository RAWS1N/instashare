import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {db} from '../utils/firebaseConfig'
import { Message } from "../Components";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";


function HomePage() {
  const [posts, setAllPosts] = useState([]);

  async function getPosts() {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts.map(post => <Message key={post.id} {...post}>
        <div className="flex gap-2 items-center">
          <Link to={`/comment/${post.id}`}>
          <button className="bg-cyan-500 px-4 py-1 mt-4 my-2 rounded-lg text-white">{post?.comments?.length ? post?.comments?.length :0 } Comments</button>
          </Link>
          {/* <h4 className="bg-cyan-500 px-4 py-1 mt-4 my-2 rounded-lg text-white">Share</h4> */}
        </div>
      </Message>)}
    </div>
  );
}

export default HomePage;
