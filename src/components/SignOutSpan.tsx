"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function SignOutSpan() {
  return (
    <span onClick={() => {
      signOut();
    }}>ログアウト</span>
  );
}