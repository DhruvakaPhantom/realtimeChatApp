import React from "react";
import { auth, provider } from "../Config/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Auth = (props) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      props.setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center flex-col gap-4">
      <p className="text-xl font-semibold font-[roboto]">
        Sign In with Google to continue
      </p>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-600 p-4 rounded-full text-white font-medium text-xl font-[roboto]"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Auth;
