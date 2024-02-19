'use client';

import React, { useState, useEffect, useRef } from "react";
import NoteDiv from "./NoteDiv";
import { NAME_LEGNTH } from "@/constants";

const NameInput: React.FC<{initialValue: string}> = ({ initialValue }) => {
  const [name, setName] = useState(initialValue);
  const [error, setError] = useState<string>("");
  const formRef = React.useRef<HTMLFormElement | null>();
  return (
    <form className="flex gap-2 mb-[-15px]" ref={el => formRef.current = el} onSubmit={e => {
      e.preventDefault();
    }} >
      <div>
        <input 
          type="text"
          required
          maxLength={NAME_LEGNTH}
          value={name} 
          className="border-2 border-gray-300 rounded-lg py-1 px-2 w-[270px]" 
          onSubmit={e => {
            console.log("通過")
            e.preventDefault()
          }}
          onChange={e => {
            const validity = e.currentTarget.validity;
            if (validity.valueMissing) {
              setError("必須入力です。")
            } else {
              setError("")
            }
            setName(e.target.value)
          }}
          onInvalid={e => {
            e.preventDefault();
            setError("必須入力です。")
          }}
          onFocus={() => {
            setError("")
          }}
          onBlur={e => {
            const validity = e.currentTarget.validity;
            if (validity.valueMissing) {
              setError("必須入力です。")
            } else {
              setError("")
            }
          }}
        />          
        <NoteDiv errMessage={error} msgLength={name.length} maxLength={NAME_LEGNTH} />
      </div>
      <button 
        type="button" 
        className="h-[38px] bg-sub-blue hover:bg-main-blue text-white rounded-lg py-1 px-2" 
        onClick={e => {
          e.preventDefault();
          if (formRef.current && formRef.current.checkValidity()) {
            console.log("変更")
          }
        }} 
      >
        変更
      </button>
    </form>
  )
}

export default NameInput;