import Layout from "@/components/Layout";
import React, { Suspense } from "react";
import { NextPage } from "next";
import ThreadsPageComponent from "@/components/pages/Threads";
import FullScreenLoading from "@/components/FullScreenLoading";

const ThreadsPage: NextPage<{
  searchParams: { 
    genre: string | undefined
  }
}> = ({ searchParams }) => {
  const genre = searchParams.genre && typeof searchParams.genre === "string" 
                ? parseInt(searchParams.genre) : undefined;
  // Suspense doesn't work when Only searchParams changes
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Layout>
        <ThreadsPageComponent genre={genre} bookmarked={true} />
      </Layout>
    </Suspense>
  );
}

export default ThreadsPage;

