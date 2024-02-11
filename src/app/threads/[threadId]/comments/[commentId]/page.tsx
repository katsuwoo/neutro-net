import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import CommentPageComponent from '@/components/pages/Comment';

const CommentPage: NextPage = () => {
  return (
    <Layout>
      <CommentPageComponent />
    </Layout>
  );
};

export default CommentPage;
