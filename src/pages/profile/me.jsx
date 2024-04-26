import React, { useEffect } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ProfileHeader from "../../components/profile/ProfileHeader";
import LeftSideBar from "../../components/profile/LeftSideBar";
import MainContent from "../../components/profile/MainContent";
import Experiences from "@/components/profile/Experiences";
import ProtectedRoute from "../../components/layouts/ProtectedRoute";

export default function Profile() {
  // Selecting necessary data from Redux store
  const userProfile = useSelector((state) => state.user?.data);
  const isLoading = useSelector((state) => state.user?.loading);

  // Log profile data for debugging
  useEffect(() => {
    console.log("profile", userProfile);
  }, [userProfile]);

  return (
    <ProtectedRoute>
      <Head>
        <title>My Profile | KocFreelancing</title>
      </Head>
      <Navbar />
      {isLoading ? (
        <div className="border rounded-3xl max-w-screen-xl flex items-center justify-center h-[100vh] mt-28 mb-14 mx-auto">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="border rounded-3xl max-w-screen-xl mt-28 mx-auto">
            <ProfileHeader
              isMine={true}
              userProfile={userProfile}
              isLoading={isLoading}
            />
            <div className="lg:grid grid-cols-3">
              <LeftSideBar isMine={true} userProfile={userProfile} />
              <MainContent isMine={true} userProfile={userProfile} />
            </div>
          </div>
          <Experiences isMine={true} userProfile={userProfile} />
        </>
      )}
      <Footer />
    </ProtectedRoute>
  );
}
