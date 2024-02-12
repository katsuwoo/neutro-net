"use client";

import React from "react";
import Modal from "./Modal";
import GenreDropdown from "./GenreDropdown";
import NoteDiv from "./NoteDiv";
import { TITLE_LENGTH } from "@/types/constants";
import axios from 'axios';
import { CreateThreadRequestType, CreateThreadResponseType } from "@/app/api/threads/route";
import { CreateCommentRequestType, CreateCommentResponseType } from "@/app/api/comments/route";
import { useRouter } from "next/navigation";

const fetcherComment = async (data: CreateCommentRequestType): Promise<CreateCommentResponseType | null> => {
  const res = await axios.post(
    "/api/comments", data
  )
  if (res.status !== 201) {
    return null
  } else {
    return res.data
  }
}

const fetcher = async (data: CreateThreadRequestType): Promise<CreateThreadResponseType | null> => {
  const res = await axios.post(
    "/api/threads", data
  )
  if (res.status !== 201) {
    return null
  } else {
    return res.data
  }
}

const CreatePost: React.FC<{
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
  isShown: boolean;
  comment?: {
    id: number;
    content: string;
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
          console.log("通過1")
          isError = true
          setErrorForGenre("ジャンルを選んでください")
        }
        if (formRef.current && formRef.current.checkValidity() && !isError) {
          if (props.comment) {
            // コメントの場合
            console.log("通過")
            fetcherComment({
              toCommentId: props.comment.id,
              content
            }).then(val => {
              if (val !== null && props.comment && 'commentId' in val) {
                window.location.reload()
              }
            })
          } else if (genre !== null) {
            // 投稿の場合
            fetcher({
              title,
              genre,
              content
            }).then(val => {
              if (val !== null && 'threadId' in val && 'commentId' in val) {
                router.push(`/threads/${val.threadId}/comments/${val.commentId}`)
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