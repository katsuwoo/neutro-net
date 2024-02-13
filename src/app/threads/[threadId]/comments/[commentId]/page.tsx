import React, { Suspense } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import CommentPageComponent from '@/components/pages/Comment';
import FullScreenLoading from '@/components/FullScreenLoading';

const CommentPage: NextPage<{params: {threadId: string, commentId: string}}> = ({params}) => {

  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Layout>
      <CommentPageComponent 
      threadId={parseInt(params.threadId)} 
      commentId={parseInt(params.commentId)} />
      </Layout>
    </Suspense>
  );
};

export default CommentPage;
