import React from 'react';
import PostParts from '../PostParts';
import Comment, { CommentType } from '../Comment';
import prisma from '@/lib/prisma';

const ThreadsPageComponent: React.FC = async() => {
  const comments: CommentType[] = await prisma.thread.findMany({
    select: {
      id: true,
      title: true,
      genre: {
        select: {
          name: true,
        }
      },
      initialComment: {
        select: {
          id: true,
          body: true,
          user: {
            select: {
              name: true,
            }
          },
          createdAt: true,
        }
      },
    },
    orderBy: {
      initialComment: {
        createdAt: 'desc',
      }
    }
  }).then((res) => {
    return res.map((thread) => {
      return {
        id: thread.initialComment.id,
        thread: {
          title: thread.title,
          genre: thread.genre.name,
        },
        threadId: thread.id,
        author: thread.initialComment.user.name,
        comments: 0,
        content: thread.initialComment.body,
        // JST YYYY/MM/DD HH:MM
        date: new Date(thread.initialComment.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
        favs: 0,
      }
    })
  })
  return (
    <div>
      <ThList comments={comments} />
      <PostParts />
    </div>
  );
};

export default ThreadsPageComponent;

const ThList: React.FC<{comments: CommentType[]}> = ({comments}) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className='border-b-2 p-2'>
          <Comment
            key={comment.id}
            {...comment} />
        </li>
      ))}
    </ul>
  );
};