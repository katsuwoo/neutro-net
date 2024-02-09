import Board from "@/components/Board";
import Layout from "@/components/Layout";
import React from "react";

export default function Home() {
  return (
    <Layout>
      <Board posts={[
        {
          id: 1,
          title: "Get Started",
          content: "Edit src/app/page.tsx and save to reload.",
        }
      ]}/>
    </Layout>
  );
}
