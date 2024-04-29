import { Avatar } from "@material-tailwind/react";
import { Rating, StickerStar } from "@smastrom/react-rating";
import React, { useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import { MdEdit, MdJoinInner, MdOutlineLocationOn } from "react-icons/md";
import { editProfile, getProfile } from "@/axios/axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import JobsModal from "../modals/JobsModal";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
const ProfileHeader = ({ userProfile, isMine }) => {
  const dispatch = useDispatch();
  const [pfpLoading, setPfpLoading] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user?.data);
  const [showHireNowModal, setShowHireNowModal] = useState(null);
  const handleDPChange = async (event) => {
    setPfpLoading(true);
    const file = event.target.files[0];

    // Check if the file is an image
    if (file?.type?.startsWith("image/")) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          formData
        );
        const imageUrl = response.data.data.url;
        await dispatch(
          editProfile({
            dynamicParams: { userId: userProfile?.user?._id },
            bodyData: { profile_picture: imageUrl },
          })
        );
        await dispatch(getProfile());
        console.log("image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      // Display error message or handle non-image file
      console.error("Please select an image file.");
    }

    setPfpLoading(false);
  };

  return (
    <div className="lg:flex justify-between lg:p-6 p-3 border-b">
      <div className="flex items-center gap-x-8">
        {isMine ? (
          userProfile?.user?.profile_picture ? (
            // Display profile picture with edit button
            <label
              htmlFor="pfpUpload"
              className="relative rounded-full w-[112px] h-[112px] border hover:cursor-pointer overflow-hidden"
            >
              {pfpLoading ? (
                <div className="flex items-center justify-center  w-full h-full">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  {" "}
                  <Image
                    src={userProfile?.user?.profile_picture}
                    width={112}
                    height={112}
                    alt="profile picture"
                    className="object-cover rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 transition-opacity opacity-0 hover:opacity-100">
                    <MdEdit className="text-white text-lg" />
                  </div>
                  <input
                    type="file"
                    id="pfpUpload"
                    name="pfpUpload"
                    accept="image/*"
                    onChange={handleDPChange}
                    className="hidden"
                    required
                  />
                </>
              )}
            </label>
          ) : (
            // Display placeholder initials if no profile picture
            <label
              className="bg-primary w-[112px] h-[112px] flex items-center justify-center rounded-full text-white text-3xl relative overflow-hidden"
              htmlFor="pfpUpload"
            >
              {pfpLoading ? (
                <div className="flex items-center justify-center  w-full h-full">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  {(userProfile?.user?.first_name?.slice(0, 1) ?? "") +
                    (userProfile?.user?.lastName?.slice(0, 1) ?? "")}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 transition-opacity opacity-0 hover:opacity-100">
                    <MdEdit className="text-white text-lg" />
                  </div>
                  <input
                    type="file"
                    id="pfpUpload"
                    name="pfpUpload"
                    accept="image/*"
                    onChange={handleDPChange}
                    className="hidden"
                    required
                  />
                </>
              )}
            </label>
          )
        ) : userProfile?.user?.profile_picture ? (
          // Display profile picture for other users
          <div className="w-[112px] h-[112px] border rounded-full overflow-hidden">
            <Image
              src={userProfile?.user?.profile_picture}
              width={112}
              height={112}
              alt="profile picture"
              className="object-cover"
            />
          </div>
        ) : (
          // Display placeholder initials for other users if no profile picture
          <div className="w-[112px] h-[112px] bg-primary flex items-center justify-center rounded-full text-white text-3xl">
            {(userProfile?.user?.first_name?.slice(0, 1) ?? "") +
              (userProfile?.user?.lastName?.slice(0, 1) ?? "")}
          </div>
        )}

        <div>
          <div className="flex items-center ">
            <p className="text-4xl font-semibold mr-2">
              {(userProfile?.user?.first_name ?? "") +
                " " +
                (userProfile?.user?.lastName ?? "")}{" "}
            </p>{" "}
            {userProfile?.category && (
              <button className="rounded-3xl px-3 py-1 bg-primary bg-opacity-[0.18] text-secondary text-center active:scale-95">
                {userProfile?.category?.name}
              </button>
            )}
            {isMine && (
              <div
                className="rounded-full p-[5px] hover:bg-opacity-80 border-[1px] mx-2 border-primary bg-gray-50 cursor-pointer transition-all"
                onClick={() => router.push("/profile/settings")}
              >
                <MdEdit className="text-primary text-lg" />
              </div>
            )}{" "}
          </div>

          <p className="flex items-center mt-2">
            <MdOutlineLocationOn className="w-6 h-6 mr-1 -ml-1 text-secondary" />
            <span className="text-lg text-secondary">
              {userProfile?.city}, {userProfile?.country} -{" "}
              {userProfile &&
                new Date(userProfile?.createdAt) != "Invalid Date" &&
                format(
                  formatInTimeZone(
                    new Date(),
                    userProfile?.timezone,
                    "yyyy-MM-dd HH:mm:ss zzz"
                  ),
                  "h:mm a"
                )}{" "}
              local time
            </span>
          </p>
          <p className="flex items-center ">
            <MdJoinInner className="w-6 h-6 mr-1 -ml-1 text-secondary" />
            <span className="text-lg text-secondary">
              Member since{" "}
              {userProfile &&
                new Date(userProfile?.createdAt) != "Invalid Date" &&
                format(new Date(userProfile?.createdAt), "MMM dd, yyyy")}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:justify-end">
        {isMine ? (
          // Buttons for the current user
          <div className="flex gap-x-4 items-center">
            <button
              className="rounded-3xl whitespace-nowrap w-full lg:py-3 lg:px-4 px-3 py-2 bg-white border-primary hover:bg-opacity-90 text-secondary transition-all border text-center active:scale-95"
              onClick={() => router.push(`/profile/${userProfile?.user?._id}`)}
            >
              See Public View
            </button>
            <button
              className="rounded-3xl w-full lg:py-3 lg:px-4 px-3 py-2 bg-primary hover:bg-opacity-90 transition-all border text-white text-center active:scale-95"
              onClick={() => router.push("/profile/settings")}
            >
              Profile Settings
            </button>
          </div>
        ) : !isMine && userProfile?.user?._id === user?.user?._id ? (
          // Button for other users to see their private view
          <div className="flex gap-x-4 items-center">
            <button
              className="rounded-3xl whitespace-nowrap w-full lg:py-3 lg:px-4 px-3 py-2 bg-white border-primary hover:bg-opacity-90 text-secondary transition-all border text-center active:scale-95"
              onClick={() => router.push(`/profile/me`)}
            >
              See Private View
            </button>
          </div>
        ) : (
          // Button for other users to hire
          <div className="flex gap-x-4 items-center">
            <button
              className="rounded-3xl w-full lg:py-3 lg:px-5 px-3 py-2 bg-primary hover:bg-opacity-90 transition-all border text-white text-center active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                if (userProfile) {
                  setShowHireNowModal(item?.user?._id);
                } else {
                  router.push("/auth/login");
                }
              }}
            >
              Hire now
            </button>
          </div>
        )}
      </div>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {showHireNowModal && (
          <JobsModal
            setShowJobsModal={setShowHireNowModal}
            showJobsModal={showHireNowModal}
            userProfile={userProfile}
            isHireNow={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileHeader;
