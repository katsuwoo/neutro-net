import Layout from "@/components/Layout";
import React, { Suspense } from "react";
import { NextPage } from "next";
import ThreadsPageComponent from "@/components/pages/Threads";
import FullScreenLoading from "@/components/FullScreenLoading";

const ThreadsPage: NextPage<{
  searchParams: { [key: string]: string | string[] | undefined };
}> = ({ searchParams }) => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Layout>
        <ThreadsPageComponent searchParams={searchParams} />
      </Layout>
    </Suspense>
  );
}

export default ThreadsPage;

