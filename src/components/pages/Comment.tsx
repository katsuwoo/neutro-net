import React from 'react';
import Comment, { CommentType } from '@/components/Comment';
import PostParts from '../PostParts';
import prisma from '@/lib/prisma';

interface Thread {
  genre: string;
  title: string;
  content: string;
  author: string;
  date: string;
  favs: number;
  comments: number;
  commentList: CommentType[];
}

const CommentPageComponent: React.FC<{
  threadId: number;
  commentId: number;
}> = async ({threadId, commentId}) => {
  const {genre, title} = await prisma.thread.findUniqueOrThrow({
    where: {
      id: threadId,
    },
    select: {
      genre: true,
      title: true,
    }
  })
  const thread: Thread = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    select: {
      body: true,
      user: {
        select: {
          name: true,
        }
      },
      createdAt: true,
      replies: {
        select: {
          id: true,
          body: true,
          user: {
            select: {
              name: true,
            }
          },
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        }
      }
    },
  }).then((res) => {
    return {
      genre: genre.name,
      title: title,
      content: res.body,
      author: res.user.name,
      date: new Date(res.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
      favs: 0,
      comments: 0,
      commentList: res.replies.map((reply) => {
        return {
          id: reply.id,
          threadId: threadId,
          author: reply.user.name,
          date: new Date(reply.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
          content: reply.body,
          favs: 0,
          comments: 0,
        }
      })
    }
  })
  return (
    <>
    <div className='p-2 border-b-2' id='title-section'>
      <div className='flex justify-between'>
        <p className='text-sm text-gray-500'>{"# " + thread.genre}</p>
      </div>
      <h2 className='font-bold text-xl'>{thread.title}</h2>
    </div>
    <div className='p-2'>
      <Comment
        id={1}
        threadId={1}
        author={thread.author}
        date={thread.date}
        content={thread.content}
        favs={thread.favs}
        comments={thread.comments}
      />
    </div>
    <h3 className='p-4 border-y-4 text-xs'>コメント一覧</h3>
    <ul>
      {thread.commentList.map((comment, index) => (
        <li key={`comment_${index}`} className='p-2 border-b-2'>
          <Comment {...comment} />
        </li>
      ))}
    </ul>
    <PostParts comment={{
      id: commentId,
      content: thread.content,
    }}/>
    </>
  );
};

export default CommentPageComponent;
