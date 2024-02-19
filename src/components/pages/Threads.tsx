import React from 'react';
import PostParts from '../PostParts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth-options';
import { CommentType } from '@/lib/schema/comment';
import { listThreads } from '@/lib/db/thread';
import ThreadList from '../ThreadList';

const ThreadsPageComponent: React.FC<
  {searchParams: { [key: string]: string | string[] | undefined }}
> = async({searchParams}) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    return <></>
  }
  const genre = searchParams.genre && typeof searchParams.genre === "string" 
                ? parseInt(searchParams.genre) : undefined;
  const comments: CommentType[] = await listThreads({
    userId: session.user.id,
    salaryRangeId: session.user.salary.sr,
    genre: genre,
  })
  return (
    <div>
      <ThreadList comments={comments} genre={genre} />
      <PostParts />
    </div>
  );
};

export default ThreadsPageComponent;