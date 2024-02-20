"use client";

import React from "react";
import { signIn } from "next-auth/react";

const SigninButton: React.FC<{body: string}> = ({body}) => {
  return (
    <button 
    className="bg-sub-blue hover:bg-main-blue text-white font-bold py-4 px-8 rounded-3xl"
      onClick={() => {
        signIn(undefined, { callbackUrl: `${window.location.href}threads` });
      }}
    >
      {body}
    </button>
  );
}

export default SigninButton;