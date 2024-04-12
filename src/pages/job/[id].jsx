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

const Job = () => {
  // Next.js router
  const router = useRouter();
  const { id } = router.query;
  // Component state
  const [jobData, setJobData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userProfile = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  // Fetch profile data by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getJobById(id));
        setJobData(response?.payload?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <div>
      <Head>
        <title>{jobData?.title} | KocFreelancing</title>
      </Head>
      <Navbar />
      {isLoading ? (
        <div className=" max-w-screen-xl  my-28 mx-auto grid grid-cols-4 gap-x-6">
          <div className="border rounded-3xl max-w-screen-xl p-6  mb-14 mx-auto col-span-3 w-full flex items-center justify-center h-[90vh]">
            <div className="loader"></div>
          </div>{" "}
          <div className="col-span-1">
            <div className=" w-full h-full border rounded-3xl focus-within:shadow-lg bg-[#f5f5f5] overflow-hidden py-3 px-6"></div>
          </div>
        </div>
      ) : (
        <div className=" max-w-screen-xl  my-28 mx-auto grid grid-cols-4 gap-x-6">
          <div className="border rounded-3xl max-w-screen-xl  justify-center  p-6  mb-14 mx-auto col-span-3 w-full">
            <SlArrowLeftCircle
              className="text-primary text-xl cursor-pointer transition-all hover:text-secondary"
              onClick={() => router.push("/jobs")}
            />
            <div className="flex items-center my-4">
              <p className=" font-medium text-2xl">{jobData?.title}</p>{" "}
              <button className="rounded-3xl ml-2 px-4 py-1 text-sm bg-primary bg-opacity-[0.18] text-secondary text-center active:scale-95 ">
                OPEN
              </button>
            </div>
            <p className="text-sm text-secondary">Posted recently</p>
            <p className="py-3 text-green-900">{jobData?.job_description}</p>
            <div className="flex justify-between items-center"></div>
            <div className="flex items-center  ">
              <p className=" py-3 text-secondary ">
                Est. budget :{" "}
                <span className="font-medium">${jobData?.budget}</span> |
              </p>

              <p className=" py-3 text-secondary ml-1">
                Est. duration :{" "}
                <span className="font-medium">{jobData?.deadline} days</span> |
              </p>
              <p className=" py-3 text-secondary ml-1">
                Project size :{" "}
                <span className="font-medium">{jobData?.project_size} </span>
              </p>
            </div>

            <p className="text-md py-3 font-medium text-secondary">
              Required skills :
            </p>
            <div className="flex flex-wrap gap-x-2  gap-y-2 mb-3">
              {jobData?.skills?.map((element, idx) => (
                <div key={`skillset-${idx}`}>
                  <button className="rounded-3xl px-3 py-1  bg-gray-400 bg-opacity-[0.18] text-secondary text-center active:scale-95 ">
                    {element?.name}
                  </button>
                </div>
              ))}
            </div>
            <p className="text-md  text-secondary">
              Proposals : <span className="font-medium">0</span>
            </p>
            {/* {
              userProfile?.user?._id === 
            } */}
            <div className="border-t pt-6 my-6">
              <p className="text-2xl font-medium mb-6">Place a bid</p>
              <div>
                <div className="flex items-center justify-between gap-3">
                  {/* Input fields for From month and year */}
                  <div className="w-1/2">
                    <label htmlFor="fromMonth" className="font-medium text-sm">
                      Bid Amount (USD)
                    </label>
                    <input
                      type="number"
                      id="fromYear"
                      name="fromYear"
                      className="w-full rounded-md border mt-1 border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                      required
                      placeholder="Ex. 500"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="fromYear" className="font-medium text-sm">
                      Delivery Time (Days)
                    </label>
                    <input
                      type="number"
                      id="fromYear"
                      name="fromYear"
                      className="w-full rounded-md border mt-1  border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                      required
                      placeholder="Ex. 5"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label htmlFor="fromMonth" className="font-medium text-sm">
                    Proposal{" "}
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    className="w-full rounded-md border mt-1 border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="What makes you the best candidate for this project?"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-x-3 mt-4">
                <button className=" rounded-3xl  w-full py-3 border border-primary hover:bg-opacity-90 transition-all  text-primary text-center active:scale-95 ">
                  Save
                </button>
                <button className=" rounded-3xl  w-full py-3 bg-primary hover:bg-opacity-90 transition-all border text-white text-center active:scale-95 ">
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className=" w-full h-full border rounded-3xl focus-within:shadow-lg bg-[#fff] overflow-hidden py-3 px-6">
              <h5 className="text-2xl mb-6 my-3 font-semibold">
                About the client
              </h5>
              {/* {console.log("ula", jobData)} */}
              {/* <div className="gap-y-6">
                {jobData?.profile?.payment_verified ? (
                  <div className="flex items-center gap-x-1 text-secondary">
                    <RiVerifiedBadgeFill /> Payment Verified{" "}
                  </div>
                ) : (
                  <div className="flex items-center gap-x-1 text-secondary">
                    <VscUnverified /> Payment Unverified{" "}
                  </div>
                )}

                <div className=" text-secondary flex items-center gap-x-2 font-medium">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={jobData?.profile?.overall_rating}
                    readOnly
                    itemStyles={{
                      itemShapes: StickerStar,
                      activeFillColor: "#35B900",
                      inactiveFillColor: "#cecece",
                    }}
                  />

                  <p className="font-medium  text-secondary">
                    {" "}
                    {jobData?.profile?.overall_rating?.toFixed(2)}
                  </p>
                  <p>({jobData?.profile?.completed_projects} reviews)</p>
                </div>
                <p className="text-md  text-secondary">
                  <span className="font-medium">
                    ${jobData?.profile?.amount_earned}
                  </span>{" "}
                  spent
                </p>
                <p className="flex items-center">
                  <MdOutlineLocationOn className="text-md mr-1 font-medium text-secondary" />
                  <span className="text-md text-secondary ">
                    {jobData?.profile?.location}
                  </span>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Job;
