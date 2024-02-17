'use client';

import { faComments } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LikeIcon from './LikeIcon';
import BookmarkIcon from './BookmarkIcon';

type IconsType = {
  commentId: number;
  likes: number;
  isLiked: boolean;
  comments: number;
  isBookmarked: boolean;
}

const Icons: React.FC<IconsType> = (props) => {
  return (
    <div className='flex justify-between'>
      <div className='flex gap-4 items-center' onClick={e => e.preventDefault()}>
        <LikeIcon commentId={props.commentId} likes={props.likes} isLiked={props.isLiked} />
        <div className='flex gap-1 hover:cursor-pointer items-center'>
          <FontAwesomeIcon icon={faComments} className='h-4' />
          <p>{props.comments}</p>
        </div>
        <BookmarkIcon commentId={props.commentId} initialBookmarked={props.isBookmarked} />
      </div>
    </div>
  )
}

export default Icons;