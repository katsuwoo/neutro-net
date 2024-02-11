import { faBookmark, faComments, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Icons from './Icons';
import Link from 'next/link';

// Update the Comment type to include a date and title
export type CommentType = {
  thread?: {
    title: string;
    genre: string;
  } | undefined,
  id: number;
  threadId: number;
  author: string;
  date: string;
  content: string;
  favs: number;
  comments: number;
};

const Comment: React.FC<CommentType> = (props) => {
  return (
    <div>
    <Link href={`/threads/${props.threadId}/comments/${props.id}`}>
      {props.thread && <>
        <p className='text-sm text-gray-500'>{"# " + props.thread.genre}</p>
        <h2 className='font-bold text-xl pb-1 text-main-blue'>{props.thread.title}</h2>
      </>}
      <div className='flex justify-between'>
        <div className='flex justify-end gap-2'>
          <p className='text-sm text-gray-500'>{props.author}</p>
          <p className='text-sm'>{props.date}</p>
        </div>
        <div className='flex justify-end '>
          <FontAwesomeIcon icon={faEllipsis} className='h-5' />
        </div>
      </div>
      <p className='text-base py-2 whitespace-pre-wrap'>{props.content}</p>
      <Icons favs={props.favs} comments={props.comments} commentId={props.id} />
    </Link>
    </div>
  );
};

export default Comment;