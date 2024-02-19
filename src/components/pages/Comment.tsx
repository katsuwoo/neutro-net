import React from 'react';
import Comment from '../Comment';
import PostParts from '../PostParts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth-options';
import { CommentWithTitle } from '@/lib/schema/comment';
import ReplyList from '../ReplyList';
import { commentWithReplies } from '@/lib/db/comment';

const CommentPageComponent: React.FC<{
  commentId: number;
}> = async ({commentId}) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    return <></>
  }
  const commentWithTitle: CommentWithTitle = await commentWithReplies({
    userId: session.user.id,
    salaryRangeId: session.user.salary.sr,
    commentId: commentId,
  })
  return (
    <>
    <div className='p-2 border-b-2' id='title-section'>
      <div className='flex justify-between'>
        <p className='text-sm text-gray-500'>{"# " + commentWithTitle.genre}</p>
      </div>
      <h2 className='font-bold text-xl'>{commentWithTitle.title}</h2>
    </div>
    <div className='p-2'>
      <Comment
        id={commentId}
        threadId={commentWithTitle.id}
        author={commentWithTitle.author}
        date={commentWithTitle.date}
        content={commentWithTitle.content}
        likes={commentWithTitle.likes}
        comments={commentWithTitle.comments}
        isLiked={commentWithTitle.isLiked}
        isBookmarked={commentWithTitle.isBookmarked}
      />
    </div>
    <h3 className='p-4 border-y-4 text-xs'>コメント一覧</h3>
    <ReplyList toCommentId={commentId} replyList={commentWithTitle.commentList} />
    <PostParts comment={{
      id: commentId,
      threadId: commentWithTitle.id,
      content: commentWithTitle.content,
    }}/>
    </>
  );
};

export default CommentPageComponent;
