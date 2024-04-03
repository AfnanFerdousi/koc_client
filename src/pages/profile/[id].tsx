// React imports
import React, { useEffect, useState } from "react";

// Next.js imports
import { useRouter } from "next/router";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { getProfileById } from "@/axios/axios";

// Material-UI imports
import { Avatar } from "@mui/material";

// Custom component imports
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Description from "@/components/ui/Description";
import { Rating, StickerStar } from "@smastrom/react-rating";

// Icons imports
import { MdOutlineLocationOn } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { format } from "date-fns";

export default function Profile() {
  // Next.js router
  const router = useRouter();
  const { id } = router.query;

  // Redux state and dispatch
  const userProfile = useSelector((state: RootState) => state.auth?.data);
  const dispatch = useDispatch();

  // Component state
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayedReviews, setDisplayedReviews] = useState(3);
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState(3);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  console.log("siuuu", profileData);
  // Fetch profile data by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getProfileById(id));
        setProfileData(response.payload.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  // Redirect if user tries to access own profile
  useEffect(() => {
    if (
      userProfile?.user?._id &&
      profileData?.user?._id &&
      userProfile.user._id === profileData.user._id
    ) {
      router.push("/profile/me");
    }
  }, [userProfile, profileData, router]);

  // Update document title with profile name
  useEffect(() => {
    if (profileData?.user?.first_name && profileData?.user?.lastName) {
      document.title = `${profileData.user.first_name} ${profileData.user.lastName} | Profile`;
    }
  }, [profileData]);

  // Load more reviews
  const loadMoreReviews = () => {
    const remainingReviews = profileData?.reviews?.length - displayedReviews;
    const newDisplayedReviews =
      remainingReviews > 5
        ? displayedReviews + 5
        : displayedReviews + remainingReviews;
    setDisplayedReviews(newDisplayedReviews);
    setShowMoreReviews(remainingReviews > 5);
  };

  // Toggle show more reviews
  const toggleShowMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
    setDisplayedReviews(showMoreReviews ? 3 : displayedReviews);
  };

  // Load more projects
  const loadMoreProjects = () => {
    const remainingProjects = profileData?.projects?.length - displayedProjects;
    const newDisplayedProjects =
      remainingProjects > 3
        ? displayedProjects + 3
        : displayedProjects + remainingProjects;
    setDisplayedProjects(newDisplayedProjects);
    setShowMoreProjects(remainingProjects > 3);
  };

  // Toggle show more projects
  const toggleShowMoreProjects = () => {
    setShowMoreProjects(!showMoreProjects);
    setDisplayedProjects(showMoreProjects ? 3 : displayedProjects);
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="border rounded-3xl max-w-screen-xl flex items-center justify-center h-[80vh] mt-28 mb-14 mx-auto">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="border rounded-3xl max-w-screen-xl mt-28 mx-auto">
            <div className="flex justify-between p-6 border-b">
              <div className="flex items-center gap-x-8 ">
                {profileData?.user?.profile_picture ? (
                  <img
                    src={profileData?.user?.profile_picture}
                    width={112}
                    height={112}
                    alt="profile picture"
                    className="rounded-full"
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 112,
                      height: 112,
                      backgroundColor: "#35B900",
                      color: "white",
                      fontSize: 24,
                    }}
                  >
                    {(profileData?.first_name?.slice(0, 1) ?? "") +
                      (profileData?.lastName?.slice(0, 1) ?? "")}
                  </Avatar>
                )}
                {/* <Image
                  src="https://wallpapers.com/images/hd/cute-anime-profile-pictures-vmrch99bgo5mjm4v.jpg"
                  width={112}
                  height={112}
                  alt="profile picture"
                  className="rounded-full"
                /> */}
                <div>
                  <p className="text-4xl font-semibold">
                    {profileData?.user?.first_name +
                      " " +
                      profileData?.user?.lastName}
                  </p>
                  <p className="flex items-center mt-2">
                    <MdOutlineLocationOn className="w-6 h-6 mr-1 -ml-1 text-secondary" />
                    <span className="text-lg text-secondary">
                      {profileData?.location} -{" "}
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
                      value={profileData?.overall_rating}
                      readOnly
                      itemStyles={{
                        itemShapes: StickerStar,
                        activeFillColor: "#35B900",
                        inactiveFillColor: "#cecece",
                      }}
                    />

                    <p className="font-medium  text-secondary">
                      {" "}
                      {profileData?.overall_rating?.toFixed(2)}
                    </p>
                    <p>({profileData?.completed_projects} reviews)</p>
                  </div>
                </div>
              </div>
              <button className="flex items-center cursor-pointer active:scale-95">
                <p className="text-lg text-primary mr-1">Share</p>
                <IoShareSocial className="w-6 h-6 text-primary" />
              </button>
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-1 border-r  ">
                <div className="flex items-center justify-between border-b p-6">
                  <div>
                    <p className="text-2xl font-semibold">
                      $ {profileData?.amount_earned}
                    </p>
                    <p className="text-sm text-secondary ">Total earnings</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {profileData?.completed_projects}
                    </p>
                    <p className="text-sm text-secondary ">
                      Completed projects
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {" "}
                      {profileData?.active_projects}
                    </p>
                    <p className="text-sm text-secondary ">Active projects</p>
                  </div>
                </div>
                <div className=" p-6">
                  <div className="mb-5">
                    <p className="text-2xl font-semibold mb-2">Languages</p>
                    {profileData?.languages?.length > 0 ? (
                      profileData?.languages?.map(
                        (item: any, index: React.Key | null | undefined) => (
                          <p className="font-medium mb-2" key={index}>
                            {item?.name}:{" "}
                            <span className="font-normal">
                              {item?.efficiency}
                            </span>
                          </p>
                        )
                      )
                    ) : (
                      <p className=" text-secondary my-2">No data found </p>
                    )}
                  </div>
                  <div className="mb-5">
                    <p className="text-2xl font-semibold mb-2">Verifications</p>
                    <p className="font-medium mb-2 flex items-center">
                      Phone:{" "}
                      {profileData?.phone_verified ? (
                        <>
                          <span className="mx-1 font-normal">Verified</span>
                          <RiVerifiedBadgeFill />
                        </>
                      ) : (
                        <>
                          <span className="mx-1 font-normal">Unverified</span>
                          <RxCrossCircled />
                        </>
                      )}
                    </p>
                    <p className="font-medium mb-2 flex items-center">
                      Payment:{" "}
                      {profileData?.payment_verified ? (
                        <>
                          <span className="mx-1 font-normal">Verified</span>
                          <RiVerifiedBadgeFill />
                        </>
                      ) : (
                        <>
                          <span className="mx-1 font-normal">Unverified</span>
                          <RxCrossCircled />
                        </>
                      )}
                    </p>
                  </div>
                  <div className="mb-5">
                    <p className="text-2xl font-semibold mb-2">Education</p>
                    {userProfile?.education?.length > 0 ? (
                      userProfile?.education?.map(
                        (
                          item: {
                            _id(_id: any): void;
                            school: string;
                            degree: string;
                            from: string;
                            current: any;
                            to: any;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <div className="mb-2" key={index}>
                            <div className="flex items-center justify-between">
                              <p className="font-medium  text-xl">
                                {item?.school}
                              </p>
                            </div>
                            <p className="  text-lg text-secondary">
                              {item?.degree}
                            </p>
                            <p className="  text-lg text-secondary">
                              {" "}
                              {format(
                                new Date(item?.from),
                                "MMMM, yyyy"
                              )} -{" "}
                              {item?.current
                                ? "Present"
                                : format(new Date(item?.to), "MMMM, yyyy")}
                            </p>
                          </div>
                        )
                      )
                    ) : (
                      <p className=" text-secondary my-2">No data found</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="p-6 border-b">
                  <p className="text-2xl font-semibold mb-6">
                    {profileData?.sub_title}
                  </p>
                  <Description
                    description={profileData?.description}
                    maxLines={5}
                    className={"text-secondary"}
                  />
                </div>
                <div className="p-6 border-b">
                  <p className="text-2xl font-semibold mb-4">
                    Work History ({profileData?.completed_projects})
                  </p>

                  {profileData?.reviews?.length > 0 ? (
                    profileData?.reviews.slice(0, displayedReviews).map(
                      (
                        item: {
                          offer: any;
                          rating: any;
                          amount: any;
                          duration: any;
                          _id: string | null;
                          title: string | undefined;
                          to: any;
                          description: string | undefined;
                        },
                        index: number
                      ) => (
                        <div
                          className={`p-3 cursor-pointer transition-all group hover:bg-gray-100 ${
                            index < displayedReviews - 1 ||
                            (profileData?.reviews?.length - 1 !== index &&
                              "border-b")
                          }`}
                          key={index}
                        >
                          <p className="text-lg text-primary group-hover:underline cursor-pointer font-medium">
                            {item?.offer?.title}
                          </p>

                          <div className="flex justify-start gap-x-3 items-center my-2">
                            <div className="items-center flex">
                              <Rating
                                style={{ maxWidth: 100 }}
                                value={item?.rating}
                                readOnly
                                itemStyles={{
                                  itemShapes: StickerStar,
                                  activeFillColor: "#35B900",
                                  inactiveFillColor: "#cecece",
                                }}
                              />
                            </div>
                            <p className="font-medium  text-secondary">
                              {" "}
                              {item?.rating.toFixed(2)}
                            </p>

                            <p>|</p>
                            <p className="text-md  text-secondary">
                              <span className="font-medium">
                                {item?.duration}
                              </span>
                            </p>
                          </div>
                          <p className="text-secondary ">
                            &apos;{item?.description}&apos;
                          </p>
                          <p className="text-md pt-3 text-secondary">
                            Project budget :{" "}
                            <span className="font-medium">${item?.amount}</span>
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-secondary my-2">No data found.</p>
                  )}

                  {profileData?.reviews?.length > 3 && (
                    <div className="flex items-center justify-center my-4">
                      <button
                        className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                        onClick={
                          showMoreReviews
                            ? loadMoreReviews
                            : toggleShowMoreReviews
                        }
                      >
                        {showMoreReviews ? "Show More" : "Show Less"}
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6 border-b">
                  <p className="text-2xl font-semibold mb-4">Portfolio</p>
                  <div className="grid grid-cols-3 gap-4">
                    {profileData?.projects?.length > 0 ? (
                      profileData?.projects.slice(0, displayedProjects).map(
                        (
                          item: {
                            link: string; // Assuming link is of type string
                            image: string | undefined;
                            title:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | Promise<React.AwaitedReactNode>
                              | null
                              | undefined;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <div
                            className="group cursor-pointer"
                            key={index}
                            onClick={() =>
                              item?.link && window.open(item.link, "_blank")
                            } // Open link in new tab
                          >
                            {item?.image ? (
                              <img
                                src={item?.image}
                                width={300}
                                height={400}
                                alt=" picture"
                                className="rounded-xl"
                              />
                            ) : (
                              ""
                            )}
                            <p className="text-lg text-primary group-hover:underline mt-2 font-medium">
                              {item?.title}
                            </p>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-secondary my-2">No data found</p>
                    )}
                  </div>
                  {profileData?.projects?.length > 3 && (
                    <div className="flex items-center justify-center my-4">
                      <button
                        className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                        onClick={
                          showMoreProjects
                            ? loadMoreProjects
                            : toggleShowMoreProjects
                        }
                      >
                        {showMoreProjects ? "Load more" : "Show Less"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-2xl font-semibold mb-4">Skills</p>
                  <div className="flex items-center flex-wrap gap-2">
                    {profileData?.skills?.length > 0 ? (
                      profileData?.skills.map(
                        (
                          item: {
                            name:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | Promise<React.AwaitedReactNode>
                              | null
                              | undefined;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <button
                            className="rounded-3xl px-3 py-1 bg-primary bg-opacity-[0.18] text-secondary text-center active:scale-95 "
                            key={index}
                          >
                            {item?.name}{" "}
                          </button>
                        )
                      )
                    ) : (
                      <p className="text-secondary my-2">No data found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-3xl max-w-screen-xl p-6 mt-8 mb-28 mx-auto">
            <p className="text-3xl font-semibold mb-4">Employment History</p>
            {profileData?.experience?.length > 0 ? (
              profileData?.experience?.map(
                (
                  item: {
                    toYear: string | number | readonly string[] | undefined;
                    fromYear: string | number | readonly string[] | undefined;
                    toMonth: string | number | readonly string[] | undefined;
                    city: string | number | readonly string[] | undefined;
                    country: string | number | readonly string[] | undefined;
                    fromMonth: string | number | readonly string[] | undefined;
                    _id: string | null;
                    title: string | undefined;
                    company: string | undefined;
                    from: string;
                    current: any;
                    to: any;
                    description: string | undefined;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <div
                    className={`my-2 py-6 ${
                      profileData?.experience?.length - 1 !== index &&
                      "border-b"
                    }`}
                    key={index}
                  >
                    <p className="text-2xl font-semibold mb-2">
                      {item?.title} | {item?.company}
                    </p>

                    <p className=" font-medium text-lg text-secondary mb-2">
                      {" "}
                      {format(new Date(item?.from), "MMMM, yyyy")} -{" "}
                      {item?.current
                        ? "Present"
                        : format(new Date(item?.to), "MMMM, yyyy")}
                    </p>
                    <p className="text-lg text-secondary">
                      {item?.description}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className=" text-secondary my-2">No data found. </p>
            )}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
