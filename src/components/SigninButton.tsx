"use client";

import React from "react";
import { signIn } from "next-auth/react";

export default function SigninButton() {
  return (
    <button className="mt-8 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        console.log("hoge");
        signIn(undefined, { callbackUrl: "/threads" });
      }}
    >
      コミュニティへ参加する
    </button>
  );
}