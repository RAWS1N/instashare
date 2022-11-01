import React from "react";

import { FcGoogle } from "react-icons/fc";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import Notifier from "../utils/notifier";

function SignUp() {
  const googleAuthProvider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const Navigator = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  async function signUpViaEmail(e) {
    e.preventDefault();
    try {
      const userLogin = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      Notifier("Successfully signed up")
      console.log(userLogin.user);
    } catch (e) {
      console.log(e.message);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function SignInViaPopup() {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (user) return Navigator("/");
  }, [user, loading, Navigator]);

  return (
    <div className="mt-20 p-4 mx-auto flex flex-col items-center shadow-2xl md:w-1/2 sm: w-10/12 text-gray-700">
      <h2 className="text-2xl mb-4 font-medium">Sign up</h2>
      <div className="flex items-center flex-col w-full md:w-1/2">
        <form className="flex flex-col w-full gap-4 " onSubmit={signUpViaEmail}>
          <label>
            Email
            <br />
            <input
              name="email"
              type="email"
              required={true}
              onChange={handleChange}
              className="w-full border-2 pl-2 border-gray-600 rounded-sm"
            />
          </label>
          <label>
            Password
            <br />
            <input
              type="password"
              name="password"
              required={true}
              onChange={handleChange}
              className="w-full border-2 pl-2 border-gray-600   rounded-sm"
            />
          </label>
          <button className="bg-gray-800  my-4 text-white py-1 rounded-sm">
            Sign up
          </button>
        </form>
        <div className="py-4">
          <h3 className="py-4">Sign in with one of the providers</h3>
          <button
            onClick={SignInViaPopup}
            className="text-white text-center bg-gray-700 px-6 py-2  font-medium rounded-sm flex 
        gap-2
        align-middle"
          >
            <FcGoogle className="text-2xl " />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
