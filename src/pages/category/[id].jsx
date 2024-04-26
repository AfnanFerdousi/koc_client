import { getJobById } from "@/axios/axios";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlArrowLeftCircle } from "react-icons/sl";
import Head from "next/head";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { Rating, StickerStar } from "@smastrom/react-rating";
import { getCategoriesById } from "../../axios/axios";
import Description from "../../components/ui/Description";
import { setLoading } from "../../redux/reducers/loadingSlice";
import { AnimatePresence } from "framer-motion";
import JobsModal from "../../components/modals/JobsModal";

const Category = () => {
  // Next.js router
  const router = useRouter();
  const { id } = router.query;
  // Component state
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.data);
  const [searchTerm, setSearchTerm] = useState("");
  // Fetch profile data by ID
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch categories data
        const categoriesResponse = await dispatch(
          getCategoriesById({ id, search: searchTerm })
        );
        setData(categoriesResponse?.payload?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, id, searchTerm]);

  const [showHireNowModal, setShowHireNowModal] = useState(null);

  console.log(router.query);
  // Toggle show more Data
  const [displayedRemainingData, setDisplayedRemainingData] = useState(12);

  const loadMoreData = () => {
    setDisplayedRemainingData((prev) => prev + 12);
  };

  const showLessData = () => {
    setDisplayedRemainingData(12);
  };
  return (
    <div>
      <Head>
        <title>{data?.name} | KocFreelancing</title>
      </Head>
      <Navbar />
      <div className=" max-w-screen-xl  my-28 mx-auto  gap-x-6">
        <div className="relative flex items-center w-full border h-12 rounded-3xl focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-secondary pr-2"
            type="text"
            id="search"
            placeholder="Search for freelancers"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        {!isLoading && (
          <p className="my-8 font-medium  text-2xl">
            Best freelancers of {data?.name} (
            {
              data?.freelancers?.filter(
                (item) => item?.user?._id !== userProfile?.user?._id
              )?.length
            }
            )
          </p>
        )}

        <div className=" max-w-screen-xl grid grid-cols-3  gap-6  my-14 mx-auto">
          {isLoading ? (
            <div className="flex items-center col-span-3 justify-center h-[50vh]  mb-14 mx-auto">
              <div className="loader"></div>
            </div>
          ) : data?.freelancers?.length > 0 ? (
            [...data?.freelancers]
              .reverse()
              .filter((item) => item?.user?._id !== userProfile?.user?._id)
              .slice(0, displayedRemainingData)
              .map((item, index) => (
                <div
                  className="relative flex flex-col rounded-xl bg-white border shadow cursor-pointer group transition-all text-secondary p-6"
                  key={index}
                  onClick={() => router.push(`/profile/${item?.user?._id}`)}
                >
                  <div className="rounded-xl flex items-center justify-center">
                    {item?.user?.profile_picture ? (
                      <img
                        src={item?.user?.profile_picture}
                        alt="picture"
                        className="rounded-full w-28 h-28 "
                        style={{
                          objectFit: "cover", // cover, contain, none
                        }}
                      />
                    ) : (
                      <div className="w-[78px] h-[78px] border bg-primary flex items-center justify-center rounded-full hover:cursor-pointer relative">
                        <p className="text-2xl text-white">
                          {(item?.user?.first_name?.slice(0, 1) ?? "") +
                            (item?.user?.lastName?.slice(0, 1) ?? "")}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-1 mb-6">
                    <h5 className="text-center block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {item?.user?.first_name + " " + item?.user?.lastName}
                    </h5>
                    <p className="block text-center font-sans text-sm leading-relaxed text-secondary">
                      {" "}
                      {item?.sub_title}{" "}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-x-2 pt-0 mt-auto">
                    {" "}
                    <button className=" rounded-3xl  w-full lg:py-3 lg:px-4 px-3 py-2  bg-white border-primary hover:bg-opacity-90 transition-all border text-primary text-center active:scale-95 ">
                      View profile
                    </button>
                    <button
                      className=" rounded-3xl  w-full lg:py-3 lg:px-4 px-3 py-2  bg-primary hover:bg-opacity-90 transition-all border text-white text-center active:scale-95 "
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHireNowModal(item?.user?._id);
                      }}
                    >
                      Hire now
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-secondary my-2">No data to show</p>
          )}
          <div
            className={`flex items-center justify-center gap-x-2 col-span-2 `}
          >
            {data?.freelancers?.length > displayedRemainingData && (
              <div className="flex items-center justify-center my-4">
                <button
                  className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                  onClick={loadMoreData}
                >
                  Load more
                </button>
              </div>
            )}
            {displayedRemainingData > 12 && (
              <div className="flex items-center justify-center my-4">
                <button
                  className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                  onClick={showLessData}
                >
                  Show less
                </button>
              </div>
            )}
          </div>
        </div>
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
      <Footer />
    </div>
  );
};

export default Category;
