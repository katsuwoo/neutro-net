import Layout from "@/components/Layout";
import React from "react";
import { NextPage } from "next";
import ThreadsPageComponent from "@/components/pages/Threads";

const ThreadsPage: NextPage = () => {
  return (
    <Layout>
      <ThreadsPageComponent />
    </Layout>
  );
}

export default ThreadsPage;

