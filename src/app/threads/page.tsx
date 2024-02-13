import Layout from "@/components/Layout";
import React, { Suspense } from "react";
import { NextPage } from "next";
import ThreadsPageComponent from "@/components/pages/Threads";
import FullScreenLoading from "@/components/FullScreenLoading";

const ThreadsPage: NextPage = () => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Layout>
        <ThreadsPageComponent />
      </Layout>
    </Suspense>
  );
}

export default ThreadsPage;

