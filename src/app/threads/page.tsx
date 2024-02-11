import Layout from "@/components/Layout";
import React from "react";
import { NextPage } from "next";
import ThreadsPageComponent from "@/components/pages/Threads";

const ThreadsPage: NextPage = () => {
  return (
    <Layout>
      <ThreadsPageComponent posts={[
        {
          id: 1,
          title: "Get Started",
          content: "Edit src/app/page.tsx and save to reload.",
        }
      ]}/>
    </Layout>
  );
}

export default ThreadsPage;