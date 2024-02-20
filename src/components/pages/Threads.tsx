import React from 'react';
import PostParts from '../PostParts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth-options';
import { CommentType } from '@/lib/schema/comment';
import { listThreads } from '@/lib/db/thread';
import ThreadList from '../ThreadList';

const ThreadsPageComponent: React.FC<{
  genre: number | undefined,
  bookmarked?: boolean | undefined 
}> = async({genre, bookmarked}) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    return <></>
  }
  const comments: CommentType[] = await listThreads({
    userId: session.user.id,
    salaryRangeId: session.user.salary.sr,
    genre: genre,
    bookmarked: bookmarked,
  })
  return (
    <div>
      <ThreadList comments={comments} genre={genre} bookmarked={bookmarked} />
      <PostParts />
    </div>
  );
};

export default ThreadsPageComponent;