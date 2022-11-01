import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebaseConfig";
import { BiUser } from "react-icons/bi";

function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <nav className=" flex justify-between items-center bg-cyan-400 py-4 px-2">
      <div>
        <Link to="/">
          <h1 className="text-2xl font-sm text-white">InstaShare</h1>
        </Link>
      </div>

      {user ? (
        <div className="flex items-center gap-3 text-medium text-white">
          <Link to="/post">Post</Link>
          <Link to="/profile">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="user"
                className="w-12 rounded-full"
              />
            ) : (
              <BiUser className="w-10 h-10 bg-gray-200 rounded-full" />
            )}
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <button className="bg-white rounded-lg px-12 py-2 text-gray-800">
            Sign in
          </button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
