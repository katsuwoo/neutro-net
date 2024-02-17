"use client";

import React from 'react';
import PostButton from './PostButton';
import CreatePost from './CreatePost';

const PostParts: React.FC<{
  comment?: {
    id: number;
    threadId: number;
    content: string;
  } | undefined
}> = ({comment}) => {
  const [isShown, setIsShown] = React.useState(false);
  return (
    <>
      <PostButton handleClick={() => {
        setIsShown(true);
      }}/>
      <CreatePost isShown={isShown} setIsShown={setIsShown} comment={comment} />
    </>
  )
}

export default PostParts;