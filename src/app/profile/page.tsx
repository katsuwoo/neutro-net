import Layout from "@/components/Layout";
import ProfilePageComponent from "@/components/pages/Profile";
import { NextPage } from "next";

const ProfilePage: NextPage = async () => {
  return (
    <Layout>
      <ProfilePageComponent />
    </Layout>
  );
};

export default ProfilePage;