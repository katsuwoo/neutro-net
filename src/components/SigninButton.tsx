"use client";

import React from "react";
import { signIn } from "next-auth/react";

export default function SigninButton() {
  return (
    <button className="mt-8 bg-sub-blue hover:bg-main-blue text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        signIn(undefined, { callbackUrl: `${window.location.href}threads` });
      }}
    >
      コミュニティへ参加する
    </button>
  );
}