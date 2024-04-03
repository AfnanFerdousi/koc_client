import { addJob, getJobs } from "@/axios/axios";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import ProjectCard from "@/components/projectCard/projectCard";
import { setLoading } from "@/redux/reducers/jobSlice";
import { RootState } from "@/redux/store";
import Modal from "@/components/ui/Modal";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

const Jobs = () => {
  const dispatch = useDispatch();

  // Fetch data and loading state from Redux store
  const jobs = useSelector((state: RootState) => state?.jobs.jobs.data);
  const loading = useSelector((state: RootState) => state?.jobs.loading);
  const userProfile = useSelector((state: RootState) => state.auth.data);
  const [searchTerm, setSearchTerm] = useState("");
  // Dispatch the getJobs action on component mount
  useEffect(() => {
    dispatch(getJobs(searchTerm));
  }, [dispatch, searchTerm]);

  const [matchingJobs, setMatchingJobs] = useState<any[]>([]);
  const [remainingJobs, setRemainingJobs] = useState<any[]>([]);
  const [activeJobs, setActiveJobs] = useState<any>("remaining");
  // Assuming allJobs is an array of objects representing jobs
  const allJobs: any[] = [...jobs]; // Your array of jobs

  // Filter jobs based on whether their user value matches userProfile?.user?._id
  const filterJobs = () => {
    const userProfileId = userProfile?.user?._id;
    if (!userProfileId) return; // Exit if userProfileId is not available

    const matching: any[] = [];
    const remaining: any[] = [];

    allJobs.forEach((job) => {
      if (job.user === userProfileId) {
        matching.push(job);
      } else {
        remaining.push(job);
      }
    });

    setMatchingJobs(matching);
    setRemainingJobs(remaining);
  };
  const [displayedRemainingJobs, setDisplayedRemainingJobs] = useState(10);
  const [displayedMatchingJobs, setDisplayedMatchingJobs] = useState(10);

  const loadMoreJobs = () => {
    if (activeJobs === "remaining") {
      setDisplayedRemainingJobs((prev) => prev + 10);
    } else if (activeJobs === "matching") {
      setDisplayedMatchingJobs((prev) => prev + 10);
    }
  };

  const showLessJobs = () => {
    if (activeJobs === "remaining") {
      setDisplayedRemainingJobs(10);
    } else if (activeJobs === "matching") {
      setDisplayedMatchingJobs(10);
    }
  };

  // Call filterJobs when the component mounts or when userProfile changes
  useEffect(() => {
    filterJobs();
  }, [userProfile, jobs, searchTerm]);
  console.log(matchingJobs, remainingJobs);
  // Selecting necessary data from Redux store
  const addJobLoading: boolean = useSelector(
    (state: RootState) => state.jobs?.loading
  );

  // State variables
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: "",
    budget: "",
    deadline: "",
    project_size: "",
    job_description: "",
    skills: [],
    user: "",
  });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  // Function to check form validity
  const checkFormValidity = () => {
    const { budget, deadline, title } = formData;
    setIsSaveEnabled(title && budget && deadline);
  };

  useEffect(() => {
    // Call checkFormValidity whenever formData changes
    checkFormValidity();
  }, [formData]);
  // Function to handle saving experience data
  const handleSaveJob = () => {
    if (isSaveEnabled) {
      dispatch(setLoading(true));
      dispatch(
        addJob({
          jobData: formData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getJobs(""));
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setLoading(false));
          setShowAddJobModal(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };

  useEffect(() => {
    // Reset form data when the modal is closed
    if (!showAddJobModal) {
      setFormData({
        title: "",
        budget: "",
        deadline: "",
        project_size: "",
        job_description: "",
        skills: [],
        user: "",
      });
    }
  }, [showAddJobModal]);

  return (
    <div>
      <Head>
        <title>Find work | KocFreelancing</title>
      </Head>
      <Navbar />
      <div className=" max-w-screen-xl  my-28 mx-auto grid grid-cols-4 gap-x-6">
        <div className="col-span-3">
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
              placeholder="Search for jobs"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <p className="my-8 font-medium  text-2xl">Jobs you might like</p>

          <div className="border rounded-3xl max-w-screen-xl  justify-center    mb-14 mx-auto">
            <div>
              <ul className="hidden text-secondary font-medium text-center rounded-t-3xl shadow sm:flex  ">
                <li className="w-full focus-within:z-10">
                  <button
                    className={
                      activeJobs === "remaining"
                        ? "inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200  rounded-tl-3xl active "
                        : "inline-block w-full p-4 bg-white border-r border-gray-200  hover:text-gray-700 rounded-tl-3xl hover:bg-gray-50"
                    }
                    onClick={() => setActiveJobs("remaining")}
                  >
                    Best matches ({remainingJobs?.length})
                  </button>
                </li>
                <li className="w-full focus-within:z-10">
                  <button
                    className={
                      activeJobs === "matching"
                        ? "inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200  rounded-tr-3xl active "
                        : "inline-block w-full p-4 bg-white border-r border-gray-200  hover:text-gray-700 rounded-tr-3xl hover:bg-gray-50"
                    }
                    onClick={() => setActiveJobs("matching")}
                  >
                    Your jobs ({matchingJobs?.length})
                  </button>
                </li>
              </ul>
            </div>

            {loading ? (
              <div className="rounded-3xl max-w-screen-xl flex items-center justify-center h-[80vh]  mb-14 mx-auto">
                <div className="loader"></div>
              </div>
            ) : activeJobs === "remaining" ? (
              remainingJobs?.length > 0 ? (
                remainingJobs
                  ?.slice(0, displayedRemainingJobs)
                  .map((item: any, index: number) => (
                    <ProjectCard
                      data={item}
                      key={index}
                      length={remainingJobs?.length}
                      index={index}
                      myJob={false}
                    />
                  ))
              ) : (
                <p className="text-secondary my-2">No data found</p>
              )
            ) : activeJobs === "matching" ? (
              matchingJobs?.length > 0 ? (
                matchingJobs
                  ?.slice(0, displayedMatchingJobs)
                  .map((item: any, index: number) => (
                    <ProjectCard
                      data={item}
                      key={index}
                      length={matchingJobs?.length}
                      index={index}
                      myJob={true}
                    />
                  ))
              ) : (
                <p className="text-secondary my-2">No data found</p>
              )
            ) : (
              ""
            )}
            <div
              className={`${
                loading ? "hidden" : "flex"
              } items-center justify-center gap-x-2 `}
            >
              {activeJobs === "matching" &&
                matchingJobs?.length > displayedMatchingJobs && (
                  <div className="flex items-center justify-center my-4">
                    <button
                      className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                      onClick={loadMoreJobs}
                    >
                      Load more jobs
                    </button>
                  </div>
                )}
              {activeJobs === "matching" && displayedMatchingJobs > 10 && (
                <div className="flex items-center justify-center my-4">
                  <button
                    className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                    onClick={showLessJobs}
                  >
                    Show less
                  </button>
                </div>
              )}
            </div>
            <div
              className={`${
                loading ? "hidden" : "flex"
              } items-center justify-center gap-x-2 `}
            >
              {activeJobs === "remaining" &&
                remainingJobs?.length > displayedRemainingJobs && (
                  <div className="flex items-center justify-center my-4">
                    <button
                      className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                      onClick={loadMoreJobs}
                    >
                      Load more jobs
                    </button>
                  </div>
                )}
              {activeJobs === "remaining" && displayedRemainingJobs > 10 && (
                <div className="flex items-center justify-center my-4">
                  <button
                    className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                    onClick={showLessJobs}
                  >
                    Show less
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <button
            className=" rounded-3xl  w-full py-3 bg-primary hover:bg-opabudget-90 transition-all border text-white text-center active:scale-95 "
            onClick={() => setShowAddJobModal(true)}
          >
            Post a new job
          </button>
          <p className="my-8 font-medium  text-2xl">Filters</p>
          <div className=" w-full h-1/2 border mt-6 rounded-3xl focus-within:shadow-lg bg-[#ffffff] overflow-hidden py-3 px-6"></div>
        </div>
      </div>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {showAddJobModal && (
          <Modal>
            <div className="p-8 rounded-2xl bg-white min-w-[768px] max-w-lg relative">
              <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-semibold">Post a new job</p>
                  <RxCross1
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowAddJobModal(false)}
                  />
                </div>
                <div className="flex flex-col space-y-4 my-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <label
                      htmlFor="title"
                      className="col-span-full font-medium"
                    >
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                          user: userProfile?.user?._id,
                        })
                      }
                      className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Ex: Upwork"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    {/* Input fields for budget and deadline */}
                    <div className="w-1/2">
                      <label htmlFor="budget" className=" font-medium">
                        Budget (USD)
                      </label>
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            budget: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Enter budget"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="deadline" className=" font-medium">
                        Project Time (Days)
                      </label>
                      <input
                        type="number"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deadline: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Ex: United States"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    {/* Input field for job title */}
                    <label
                      htmlFor="project_size"
                      className="col-span-full font-medium"
                    >
                      Project Size
                    </label>
                    <select
                      id="efficiency"
                      name="efficiency"
                      value={formData.project_size}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          project_size: e.target.value,
                        })
                      }
                      className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full my-2"
                      required
                    >
                      <option value="">Select Project Size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>

                  <div>
                    {/* Input field for job_description */}
                    <h3 className="font-medium">Job Description</h3>
                    <div className="mt-2">
                      <textarea
                        id="job_description"
                        rows={3}
                        value={formData.job_description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            job_description: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="Enter Job Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                <button
                  type="button"
                  className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                  onClick={() => setShowAddJobModal(false)}
                >
                  Cancel
                </button>
                {addJobLoading ? (
                  <button
                    type="button"
                    className={`px-4 py-4 font-medium text-white bg-primary bg-opabudget-80 border border-transparent rounded-md shadow-sm hover:bg-opabudget-90 transition-all focus:outline-none w-full cursor-context-menu  `}
                  >
                    <div className="loaderProfile mx-auto"></div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`px-4 py-3 font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opabudget-90 transition-all focus:outline-none w-full ${
                      isSaveEnabled ? "" : "opabudget-50 cursor-not-allowed"
                    }`}
                    onClick={handleSaveJob}
                    disabled={!isSaveEnabled}
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Jobs;
