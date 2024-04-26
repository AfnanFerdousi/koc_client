import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import ProjectCard from "@/components/projectCard/projectCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Head from "next/head";
import JobsModal from "../../components/modals/JobsModal";
import { AnimatePresence } from "framer-motion";
import {
  getBookmarks,
  getMyJobs,
  getJobs,
  getAllJobs,
} from "../../axios/axios";
import { setLoading } from "../../redux/reducers/loadingSlice";
import ProtectedRoute from "../../components/layouts/ProtectedRoute";

const Jobs = () => {
  const dispatch = useDispatch();
  const [activeJobs, setActiveJobs] = useState("bestMatches");
  const loading = useSelector((state) => state.loading.loading);
  const userProfile = useSelector((state) => state.user.data);
  const [searchTerm, setSearchTerm] = useState("");
  const allJobs = useSelector((state) => state.jobs?.allJobs?.data);
  const bestMatches = useSelector((state) => state.jobs?.jobs?.data);
  const bookmarks = useSelector((state) => state.jobs?.bookmarks?.data);
  const myJobs = useSelector((state) => state.jobs?.myJobs?.data);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("createdAt");
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      await dispatch(
        getJobs({
          user_id: userProfile?.user?._id,
          sortOrder: sortOrder,
          sortBy: sortBy,
        })
      );

      await dispatch(getBookmarks(userProfile?.user?._id));
      await dispatch(getMyJobs(userProfile?.user?._id));
      dispatch(setLoading(false));
    };

    fetchData();
  }, [dispatch, sortBy, sortOrder, userProfile]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      await dispatch(
        getAllJobs({
          user_id: userProfile?.user?._id,
          sortOrder: sortOrder,
          sortBy: sortBy,
          searchTerm: searchTerm,
        })
      );
      dispatch(setLoading(false));
    };

    fetchData();
  }, [dispatch, searchTerm, sortBy, sortOrder, userProfile]);

  console.log("jobs", bestMatches, allJobs, loading);

  const [displayedBestMatches, setDisplayedBestMatches] = useState(10);
  const [displayedMyJobs, setDisplayedMyJobs] = useState(10);
  const [displayedBookmarks, setDisplayedBookmarks] = useState(10);
  const [displayedAllJobs, setDisplayedAllJobs] = useState(10);

  const loadMoreJobs = () => {
    if (activeJobs === "bestMatches") {
      setDisplayedBestMatches((prev) => prev + 10);
    } else if (activeJobs === "myJobs") {
      setDisplayedMyJobs((prev) => prev + 10);
    } else if (activeJobs === "bookmarks") {
      setDisplayedBookmarks((prev) => prev + 10);
    } else if (searchTerm !== "") {
      setDisplayedAllJobs((prev) => prev + 10);
    }
  };

  const showLessJobs = () => {
    if (activeJobs === "bestMatches") {
      setDisplayedBestMatches(10);
    } else if (activeJobs === "myJobs") {
      setDisplayedMyJobs(10);
    } else if (activeJobs === "bookmarks") {
      setDisplayedBookmarks(10);
    } else if (searchTerm !== "") {
      setDisplayedAllJobs(10);
    }
  };

  const [showAddJobModal, setShowAddJobModal] = useState(false);
  console.log(searchTerm, searchTerm === "", searchTerm !== "", allJobs);
  return (
    <ProtectedRoute>
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
          <div className="flex items-center justify-between my-8 ">
            <p className="font-medium  text-2xl">Jobs you might like</p>
            <p>
              {" "}
              <label htmlFor="sort" className="mx-2 font-medium">
                Sort By
              </label>
              <select
                id="sort"
                className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-48"
                onChange={(event) => {
                  const selectedOption = event.target.value;
                  if (selectedOption === "Newest") {
                    setSortBy("createdAt");
                    setSortOrder("asc");
                  } else if (selectedOption === "Oldest") {
                    setSortBy("createdAt");
                    setSortOrder("dsc");
                  } else if (selectedOption === "Lowest Bids") {
                    setSortBy("proposals.length");
                    setSortOrder("asc");
                  } else if (selectedOption === "Highest Bids") {
                    setSortBy("proposals.length");
                    setSortOrder("dsc");
                  } else if (selectedOption === "Lowest Price") {
                    setSortBy("budget");
                    setSortOrder("asc");
                  } else if (selectedOption === "Highest Price") {
                    setSortBy("budget");
                    setSortOrder("dsc");
                  }
                }}
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Lowest Bids">Fewest Bids</option>
                <option value="Highest Bids">Most Bids</option>
                <option value="Lowest Price">Lowest Price</option>
                <option value="Highest Price">Highest Price</option>
              </select>
            </p>
          </div>

          <div className="border rounded-3xl max-w-screen-xl  justify-center    mb-14 mx-auto">
            {searchTerm !== "" &&
              (loading ? (
                <div className="rounded-3xl max-w-screen-xl flex items-center justify-center h-[80vh]  mb-14 mx-auto">
                  <div className="loader"></div>
                </div>
              ) : allJobs?.length > 0 ? (
                [...allJobs]
                  .slice(0, displayedAllJobs)
                  .map((item, index) => (
                    <ProjectCard
                      data={item}
                      key={index}
                      length={allJobs?.length}
                      index={index}
                      myJob={false}
                      userProfile={userProfile}
                    />
                  ))
              ) : (
                <p className="text-secondary my-2">No data to show</p>
              ))}

            {searchTerm === "" && (
              <div>
                <ul className="hidden text-secondary font-medium text-center rounded-t-3xl shadow sm:flex  ">
                  <li className="w-full focus-within:z-10">
                    <button
                      className={
                        activeJobs === "bestMatches"
                          ? "inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200  rounded-tl-3xl active "
                          : "inline-block w-full p-4 bg-white border-r border-gray-200  hover:text-gray-700 rounded-tl-3xl hover:bg-gray-50"
                      }
                      onClick={() => setActiveJobs("bestMatches")}
                    >
                      Best matches ({bestMatches?.length ?? 0})
                    </button>
                  </li>
                  <li className="w-full focus-within:z-10">
                    <button
                      className={
                        activeJobs === "bookmarks"
                          ? "inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200   active "
                          : "inline-block w-full p-4 bg-white border-r border-gray-200  hover:text-gray-700  hover:bg-gray-50"
                      }
                      onClick={() => setActiveJobs("bookmarks")}
                    >
                      Bookmarks ({bookmarks?.length ?? 0})
                    </button>
                  </li>
                  <li className="w-full focus-within:z-10">
                    <button
                      className={
                        activeJobs === "myJobs"
                          ? "inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200  rounded-tr-3xl active "
                          : "inline-block w-full p-4 bg-white border-r border-gray-200  hover:text-gray-700 rounded-tr-3xl hover:bg-gray-50"
                      }
                      onClick={() => setActiveJobs("myJobs")}
                    >
                      Your jobs ({myJobs?.length ?? 0})
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {loading ? (
              <div className="rounded-3xl max-w-screen-xl flex items-center justify-center h-[80vh]  mb-14 mx-auto">
                <div className="loader"></div>
              </div>
            ) : searchTerm === "" && activeJobs === "bestMatches" ? (
              bestMatches?.length > 0 ? (
                [...bestMatches]
                  .slice(0, displayedBestMatches)
                  .map((item, index) => (
                    <ProjectCard
                      data={item}
                      key={index}
                      length={bestMatches?.length}
                      index={index}
                      myJob={false}
                      userProfile={userProfile}
                    />
                  ))
              ) : (
                <p className="text-secondary my-2">No data to show</p>
              )
            ) : searchTerm === "" && activeJobs === "bookmarks" ? (
              bookmarks?.length > 0 ? (
                [...bookmarks]
                  .reverse()
                  .slice(0, displayedBookmarks)
                  .map((item, index) => (
                    <ProjectCard
                      data={item}
                      key={index}
                      length={bookmarks?.length}
                      index={index}
                      myJob={false}
                      isBookmark={true}
                      userProfile={userProfile}
                    />
                  ))
              ) : (
                <p className="text-secondary my-2">No data to show</p>
              )
            ) : searchTerm === "" && activeJobs === "myJobs" ? (
              myJobs?.length > 0 ? (
                [...myJobs]
                  .reverse()
                  .slice(0, displayedMyJobs)
                  .map((item, index) => (
                    <ProjectCard
                      data={item}
                      key={index}
                      length={myJobs?.length}
                      index={index}
                      myJob={true}
                      userProfile={userProfile}
                    />
                  ))
              ) : (
                <p className="text-secondary my-2">No data to show</p>
              )
            ) : (
              ""
            )}
            <div
              className={`${
                loading ? "hidden" : "flex"
              } items-center justify-center gap-x-2 `}
            >
              {searchTerm !== "" && allJobs?.length > displayedAllJobs && (
                <div className="flex items-center justify-center my-4">
                  <button
                    className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                    onClick={loadMoreJobs}
                  >
                    Load more jobs
                  </button>
                </div>
              )}

              {searchTerm !== "" && displayedAllJobs > 10 && (
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
              {activeJobs === "myJobs" &&
                bestMatches?.length > displayedMyJobs && (
                  <div className="flex items-center justify-center my-4">
                    <button
                      className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                      onClick={loadMoreJobs}
                    >
                      Load more jobs
                    </button>
                  </div>
                )}

              {activeJobs === "myJobs" && displayedMyJobs > 10 && (
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
              {activeJobs === "bookmarks" &&
                bookmarks?.length > displayedBookmarks && (
                  <div className="flex items-center justify-center my-4">
                    <button
                      className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                      onClick={loadMoreJobs}
                    >
                      Load more
                    </button>
                  </div>
                )}
              {activeJobs === "bookmarks" && displayedBookmarks > 10 && (
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
              {activeJobs === "bestMatches" &&
                bestMatches?.length > displayedBestMatches && (
                  <div className="flex items-center justify-center my-4">
                    <button
                      className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                      onClick={loadMoreJobs}
                    >
                      Load more
                    </button>
                  </div>
                )}
              {activeJobs === "bestMatches" && displayedBestMatches > 10 && (
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
            className=" rounded-3xl  w-full py-3 bg-primary hover:bg-opacity-90 transition-all border text-white text-center active:scale-95 "
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
          <JobsModal
            setShowJobsModal={setShowAddJobModal}
            showJobsModal={showAddJobModal}
            userProfile={userProfile}
          />
        )}
      </AnimatePresence>
      <Footer />
    </ProtectedRoute>
  );
};

export default Jobs;
