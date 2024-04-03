import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import ProjectCard from "@/components/projectCard/projectCard";
import React from "react";

const index = () => {
  return (
    <div>
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
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search for jobs"
            />
          </div>
          <p className="my-8 font-medium  text-2xl">Jobs you might like</p>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <div className="flex items-center justify-center my-4">
            <button className=" rounded-3xl  px-3 py-1 border-[#34b900] border text-[#34b900] text-center active:scale-95 ">
              Load more jobs
            </button>
          </div>
        </div>
        <div className="col-span-1">
          <div className=" w-full border h-full rounded-3xl focus-within:shadow-lg bg-[#f9f9f9] overflow-hidden p-6"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default index;
