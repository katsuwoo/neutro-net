import React from 'react';
import PostParts from '../PostParts';
import Comment from '../Comment';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth-options';
import { CommentType } from '@/lib/schema/comment';

const ThreadsPageComponent: React.FC = async() => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    return <></>
  }
  const comments: CommentType[] = await prisma.comment.findMany({
    where: {
      thread: {
        salaryRangeId: session.user.salary.sr
      },
      toCommentId: null
    },
    select: {
      id: true,
      thread: {
        select: {
          id: true,
          title: true,
          genre: {
            select: {
              name: true,
            }
          },
        }
      },
      user: {
        select: {
          name: true,
        }
      },
      body: true,
      createdAt: true,
      _count: {
        select: {
          likes: true,
          replies: true,
        }
      },
      likes: {
        select: {
          userId: true
        },
        where: {
          userId: session.user.id
        }
      },
      bookmarks: {
        select: {
          userId: true
        },
        where: {
          userId: session.user.id
        }
      }
    },
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  }).then((comments) => {
    return comments.map((comment) => {
      return {
        id: comment.id,
        thread: {
          title: comment.thread.title,
          genre: comment.thread.genre.name,
        },
        threadId: comment.thread.id,
        author: comment.user.name,
        content: comment.body,
        date: new Date(comment.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
        likes: comment._count.likes,
        comments: comment._count.replies,
        isLiked: comment.likes.length > 0,
        isBookmarked: comment.bookmarks.length > 0,
      };
    });
  });
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