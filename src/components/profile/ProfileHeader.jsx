import { Avatar } from "@material-tailwind/react";
import { Rating, StickerStar } from "@smastrom/react-rating";
import React, { useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import { MdEdit, MdOutlineLocationOn } from "react-icons/md";
import { editProfile, getProfile } from "@/axios/axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
const ProfileHeader = ({ userProfile, isMine }) => {
  const dispatch = useDispatch();
  const [pfpLoading, setPfpLoading] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user?.data);
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
      <div className="flex items-center gap-x-8 ">
        {isMine ? (
          userProfile?.user?.profile_picture ? (
            !pfpLoading ? (
              <label
                htmlFor="pfpUpload"
                className="w-[112px] h-[112px] border rounded-full hover:cursor-pointer relative"
              >
                <Image
                  src={userProfile?.user?.profile_picture}
                  width={112}
                  height={112}
                  alt="profile picture"
                  className="object-cover rounded-full w-full h-full"
                />
                <div className="absolute bottom-0 right-0 rounded-full p-[5px] hover:bg-opacity-80 border-[2px] border-primary bg-gray-50 cursor-pointer transition-all">
                  <MdEdit className="text-primary text-lg" />
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
              </label>
            ) : (
              <div
                className={`px-4 py-4 font-medium      shadow-sm hover:bg-opacity-90 transition-all focus:outline-none  cursor-context-menu w-[112px] h-[112px] border rounded-full flex items-center justify-center`}
              >
                <div className="loader mx-auto"></div>
              </div>
            )
          ) : !pfpLoading ? (
            <label
              htmlFor="pfpUpload"
              className="w-[112px] h-[112px] border bg-primary flex items-center justify-center rounded-full hover:cursor-pointer relative"
            >
              <p className="text-3xl text-white">
                {(userProfile?.user?.first_name?.slice(0, 1) ?? "") +
                  (userProfile?.user?.lastName?.slice(0, 1) ?? "")}
              </p>

              <div className="absolute bottom-0 right-0 rounded-full p-[5px] hover:bg-opacity-80 border-[2px] border-primary bg-gray-50 cursor-pointer transition-all">
                <MdEdit className="text-primary text-lg" />
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
            </label>
          ) : (
            <div
              className={`px-4 py-4 font-medium      shadow-sm hover:bg-opacity-90 transition-all focus:outline-none  cursor-context-menu w-[112px] h-[112px] border rounded-full flex items-center justify-center`}
            >
              <div className="loader mx-auto"></div>
            </div>
          )
        ) : userProfile?.user?.profile_picture ? (
          <div className="w-[112px] h-[112px] border rounded-full  relative">
            <Image
              src={userProfile?.user?.profile_picture}
              width={112}
              height={112}
              alt="profile picture"
              className="object-cover rounded-full w-full h-full"
            />
          </div>
        ) : (
          <div className="w-[112px] h-[112px] border bg-primary flex items-center justify-center rounded-full hover:cursor-pointer relative">
            <p className="text-3xl text-white">
              {(userProfile?.user?.first_name?.slice(0, 1) ?? "") +
                (userProfile?.user?.lastName?.slice(0, 1) ?? "")}
            </p>
          </div>
        )}

        <div>
          <p className="text-4xl font-semibold">
            {userProfile?.user?.first_name + " " + userProfile?.user?.lastName}
          </p>
          <p className="flex items-center mt-2">
            <MdOutlineLocationOn className="w-6 h-6 mr-1 -ml-1 text-secondary" />
            <span className="text-lg text-secondary">
              {userProfile?.location} -{" "}
              {new Date().toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}{" "}
              local time{" "}
            </span>
          </p>
          <div className="mt-1 text-secondary flex items-center gap-x-2 font-medium">
            <Rating
              style={{ maxWidth: 100 }}
              value={userProfile?.overall_rating}
              readOnly
              itemStyles={{
                itemShapes: StickerStar,
                activeFillColor: "#35B900",
                inactiveFillColor: "#cecece",
              }}
            />

            <p className="font-medium  text-secondary">
              {" "}
              {userProfile?.overall_rating?.toFixed(2)}
            </p>
            <p>({userProfile?.completed_projects} reviews)</p>
          </div>
        </div>
      </div>
      {isMine ? (
        <div className="flex flex-col items-end gap-y-2 justify-center">
          <div className="flex items-center justify-between gap-x-4 ">
            <button
              className=" rounded-3xl whitespace-nowrap w-full lg:py-3 lg:px-4 px-3 py-2  bg-white border-primary  hover:bg-opacity-90 text-secondary transition-all border text-center active:scale-95 "
              onClick={() => router.push(`/profile/${userProfile?.user?._id}`)}
            >
              See Public View
            </button>
            <button
              className=" rounded-3xl  w-full lg:py-3 lg:px-4 px-3 py-2  bg-primary hover:bg-opacity-90 transition-all border text-white text-center active:scale-95 "
              onClick={() => router.push("/profile/settings")}
            >
              Profile Settings
            </button>
          </div>
          <button className="flex items-center cursor-pointer active:scale-95">
            <p className="text-lg text-primary mr-1">Share</p>
            <IoShareSocial className="w-6 h-6 text-primary" />
          </button>
        </div>
      ) : !isMine && userProfile?.user?._id === user?.user?._id ? (
        <div className="flex  gap-x-4 items-center">
          <div className="flex items-center justify-between gap-x-4 ">
            <button
              className=" rounded-3xl whitespace-nowrap w-full lg:py-3 lg:px-4 px-3 py-2  bg-white border-primary  hover:bg-opacity-90 text-secondary transition-all border text-center active:scale-95 "
              onClick={() => router.push(`/profile/me`)}
            >
              See Private View
            </button>
          </div>
          <button className="flex items-center cursor-pointer active:scale-95">
            <p className="text-lg text-primary mr-1">Share</p>
            <IoShareSocial className="w-6 h-6 text-primary" />
          </button>
        </div>
      ) : (
        <button className="flex items-center cursor-pointer active:scale-95">
          <p className="text-lg text-primary mr-1">Share</p>
          <IoShareSocial className="w-6 h-6 text-primary" />
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
