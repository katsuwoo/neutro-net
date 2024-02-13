import FullScreenLoading from "@/components/FullScreenLoading";
import Layout from "@/components/Layout";
import ProfilePageComponent from "@/components/pages/Profile";
import { NextPage } from "next";
import { Suspense } from "react";

const ProfilePage: NextPage = async () => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Layout>
        <ProfilePageComponent />
      </Layout>
    </Suspense>
  );
};

export default ProfilePage;