import React, { Suspense } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import NotificationsPageComponent from '@/components/pages/Notifications';
import FullScreenLoading from '@/components/FullScreenLoading';

const CommentPage: NextPage = () => {

  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Layout>
      <NotificationsPageComponent />
      </Layout>
    </Suspense>
  );
};

export default CommentPage;
