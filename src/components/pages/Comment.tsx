import React from 'react';
import Comment from '../Comment';
import PostParts from '../PostParts';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth-options';
import { Thread } from '@/lib/schema/thread';

const CommentPageComponent: React.FC<{
  commentId: number;
}> = async ({commentId}) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    return <></>
  }
  const thread: Thread = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      thread: {
        salaryRangeId: session.user.salary.sr
      }
    },
    select: {
      thread: {
        select: {
          id: true,
          genre: {
            select: {
              name: true,
            }
          },
          title: true,
        }
      },
      body: true,
      user: {
        select: {
          name: true,
        }
      },
      _count: {
        select: {
          likes: true,
          replies: true,
        }
      },
      likes: {
        select: {
          userId: true, // Anything is ok for isLiked
        },
        where: {
          userId: session.user.id,
        }
      },
      bookmarks: {
        select: {
          userId: true, // Anything is ok for isBookmarked
        },
        where: {
          userId: session.user.id,
        }
      },
      createdAt: true,
      replies: {
        select: {
          id: true,
          body: true,
          _count: {
            select: {
              likes: true,
              replies: true,
            }
          },
          likes: {
            select: {
              userId: true, // Anything is ok for isLiked
            },
            where: {
              userId: session.user.id,
            }
          },
          bookmarks: {
            select: {
              userId: true, // Anything is ok for isBookmarked
            },
            where: {
              userId: session.user.id,
            }
          },
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
      id: res.thread.id,
      genre: res.thread.genre.name,
      title: res.thread.title,
      content: res.body,
      author: res.user.name,
      date: new Date(res.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
      likes: res._count.likes,
      comments: res._count.replies,
      isLiked: res.likes.length > 0,
      isBookmarked: res.bookmarks.length > 0,
      commentList: res.replies.map((reply) => {
        return {
          id: reply.id,
          threadId: res.thread.id,
          author: reply.user.name,
          date: new Date(reply.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
          content: reply.body,
          likes: reply._count.likes,
          comments: reply._count.replies,
          isLiked: reply.likes.length > 0,
          isBookmarked: reply.bookmarks.length > 0,
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
        id={commentId}
        threadId={thread.id}
        author={thread.author}
        date={thread.date}
        content={thread.content}
        likes={thread.likes}
        comments={thread.comments}
        isLiked={thread.isLiked}
        isBookmarked={thread.isBookmarked}
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
      threadId: thread.id,
      content: thread.content,
    }}/>
    </>
  );
};

export default CommentPageComponent;
