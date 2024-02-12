import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import CommentPageComponent from '@/components/pages/Comment';

const CommentPage: NextPage<{params: {threadId: string, commentId: string}}> = ({params}) => {

  return (
    <Layout>
      <CommentPageComponent 
      threadId={parseInt(params.threadId)} 
      commentId={parseInt(params.commentId)} />
    </Layout>
  );
};

export default CommentPage;
