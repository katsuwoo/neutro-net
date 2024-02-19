'use client';

import { CommentType } from "@/lib/schema/comment";
import React, { useEffect, useRef, useState } from "react";
import Comment from "@/components/Comment";
import { COMMENTS_LIMIT } from "@/constants";
import { useInView } from "@/lib/hooks";
import { listComments } from "@/lib/api";

const ReplyList: React.FC<{toCommentId: number, replyList: CommentType[]}> = (props) => {
  const [ replyList, setReplyList ] = useState<CommentType[]>(props.replyList);
  const [isFetching, setIsFetching] = useState(false);
  const [allFetched, setAllFetched] = useState(props.replyList.length < COMMENTS_LIMIT);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView && allFetched === false) {
      setIsFetching(true);
    }
  }, [inView]);

  useEffect(() => {
    if (isFetching) {
      const prevId = replyList[replyList.length - 1].id
      listComments({
        toCommentId: props.toCommentId,
        prevId: prevId,
      }).then((res) => {
        if (res !== null) {
          setReplyList((prev) => {
            return [
              ...prev,
              ...res
            ]
          });
          if (res.length < COMMENTS_LIMIT) {
            setAllFetched(true);
          }
        } else {
          // TODO: Show error message
          setAllFetched(true);
        }
        setIsFetching(false);
      });
    }
  }, [isFetching]);
  
  return (
    <div>
      <ul>
        {replyList.map((reply, index) => (
          <li key={`comment_${index}`} className='p-2 border-b-2'>
            <Comment {...reply} />
          </li>
        ))}
      </ul>
    </div>
  )
};

export default ReplyList;