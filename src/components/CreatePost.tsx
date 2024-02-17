"use client";

import React from "react";
import Modal from "./Modal";
import GenreDropdown from "./GenreDropdown";
import NoteDiv from "./NoteDiv";
import { TITLE_LENGTH } from "@/constants";
import { useRouter } from "next/navigation";
import { createComment, createThread } from "@/lib/api";

const CreatePost: React.FC<{
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
  isShown: boolean;
  comment?: {
    id: number;
    content: string;
    threadId: number;
  }
}> = (props) => {
  const [title, setTitle] = React.useState<string>("");
  const [genre, setGenre] = React.useState<number | null>(null);
  const [content, setContent] = React.useState<string>("");

  const [errorForTitle, setErrorForTitle] = React.useState<string>(""); 
  const [errorForGenre, setErrorForGenre] = React.useState<string>("");
  const [errorForContent, setErrorForContent] = React.useState<string>("");

  const formRef = React.useRef<HTMLFormElement | null>();
  const router = useRouter();

  const checkValidityFunc = (
    validity: ValidityState, 
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (validity.valueMissing) {
      setError("必須入力です。")
    } else {
      setError("")
    }
  }

  return <Modal 
    title={props.comment ? "コメント" : "投稿" }
    isShown={props.isShown} 
    setIsShown={props.setIsShown} 
    closeClick={() => {
      props.setIsShown(false);
    }}
    select={{
      label: props.comment ? "コメントする" : "投稿する",
      handler: () => {
        let isError = false
        if (props.comment === undefined && genre === null) {
          isError = true
          setErrorForGenre("ジャンルを選んでください")
        }
        if (formRef.current && formRef.current.checkValidity() && !isError) {
          if (props.comment) {
            // コメントの場合
            createComment({
              toCommentId: props.comment.id,
              threadId: props.comment.threadId,
              content
            }).then(val => {
              if (val !== null && props.comment && 'commentId' in val) {
                window.location.reload()
              }
            })
          } else if (genre !== null) {
            // 投稿の場合
            createThread({
              title,
              genre,
              content
            }).then(val => {
              if (val !== null) {
                window.location.reload()
              }
            })
          }
        }
      },
    }}
  >
    {props.comment && <div className="flex flex-col gap-1 p-2 text-gray-400 border-b-2">
      <p className="text-xs">元のメッセージ</p>
      <p className="text-ms">{props.comment.content}</p>
    </div>}
    <form className="flex flex-col gap-4 p-2" ref={el => formRef.current = el}>
      {props.comment === undefined && <>
        <div className="flex flex-col gap-1">
          <p className="min-w-fit pl-2">タイトル</p>
          <input 
            type="text" 
            className="w-full border-2 border-gray-300 rounded-lg p-2" 
            required 
            maxLength={TITLE_LENGTH}
            value={title}
            onSubmit={e => {
              e.preventDefault()
            }}
            onChange={e => {
              setTitle(e.currentTarget.value)
              checkValidityFunc(e.currentTarget.validity, setErrorForTitle)
            }}
            onInvalid={e => {
              e.preventDefault()
              checkValidityFunc(e.currentTarget.validity, setErrorForTitle)
            }}
            onBlur={e => {
              checkValidityFunc(e.currentTarget.validity, setErrorForTitle)
            }}
          />
          <NoteDiv errMessage={errorForTitle} msgLength={title.length} maxLength={TITLE_LENGTH} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="min-w-fit pl-2">ジャンル</p>
          {/* <input type="text" className="w-full border-2 border-gray-300 rounded-lg p-2" /> */}
          <GenreDropdown 
          selected={genre} setSelected={setGenre} 
          error={errorForGenre} setError={setErrorForGenre} />
        </div>
      </>}
      <div className="flex flex-col gap-1">
        <p className="min-w-fit pl-2">内容</p>
        <textarea 
          className="w-full min-h-80 border-2 border-gray-300 rounded-lg p-2" 
          value={content}
          required
          onChange={e => {
            setContent(e.currentTarget.value);
            checkValidityFunc(e.currentTarget.validity, setErrorForContent)
          }}
          onInvalid={e => {
            e.preventDefault()
            checkValidityFunc(e.currentTarget.validity, setErrorForContent)
          }}
          onBlur={e => {
            setContent(content.trim())
            checkValidityFunc(e.currentTarget.validity, setErrorForContent)
          }}
        />
        <NoteDiv errMessage={errorForContent} msgLength={content.length} maxLength={1000} />
      </div>
    </form> 
  </Modal>
}

export default CreatePost;

const ErrP: React.FC<{message: string}> = ({message}) => {
  return (
    <p className="m-0 mb-2 text-red-600 text-xs">{message}</p>
  )
}