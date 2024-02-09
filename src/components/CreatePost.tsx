"use client";

import React from "react";
import Modal from "./Modal";

const CreatePost: React.FC<{
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
  isShown: boolean;
  comment?: {
    id: number;
    content: string;
  }
}> = (props) => {
  return <Modal 
    title={props.comment ? "コメントする" : "投稿する" }
    isShown={props.isShown} 
    setIsShown={props.setIsShown} 
    closeClick={() => {
      props.setIsShown(false);
    }}
    select={{
      label: "投稿",
      handler: () => {
        props.setIsShown(false);
      },
    }}
  >
    {props.comment && <div className="flex flex-col gap-1 p-2 text-gray-400 border-b-2">
      <p className="text-xs">元のメッセージ</p>
      <p className="text-ms">{props.comment.content}</p>
    </div>}
    <div className="flex flex-col gap-4 p-2">
      {props.comment === undefined && <>
        <div className="flex flex-col gap-1">
          <p className="min-w-fit pl-2">タイトル</p>
          <input type="text" className="w-full border-2 border-gray-300 rounded-lg p-2" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="min-w-fit pl-2">ジャンル</p>
          <input type="text" className="w-full border-2 border-gray-300 rounded-lg p-2" />
        </div>
      </>}
      <div className="flex flex-col gap-1">
        <p className="min-w-fit pl-2">内容</p>
        <textarea className="w-full min-h-60 border-2 border-gray-300 rounded-lg p-2" />
      </div>
    </div> 
  </Modal>
}

export default CreatePost;