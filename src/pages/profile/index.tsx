import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import Image from "next/image";
import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function Profile() {
  return (
    <div>
      <Navbar />
      <div className="border rounded-3xl max-w-screen-xl  mt-28 mx-auto">
        <div className="flex justify-between p-6 border-b">
          <div className="flex items-center gap-x-8 ">
            <Image
              src="https://wallpapers.com/images/hd/cute-anime-profile-pictures-vmrch99bgo5mjm4v.jpg"
              width={112}
              height={112}
              alt="profile picture"
              className="rounded-full"
            />
            <div>
              <p className="text-4xl font-semibold">Saidur R.</p>
              <p className="flex items-center mt-2">
                <MdOutlineLocationOn className="w-6 h-6 mr-1 -ml-1 text-gray-700" />
                <span className="text-lg text-gray-700 ">
                  Bhola, Bangladesh - 5:28 am local time
                </span>
              </p>
            </div>
          </div>
          <button className="flex items-center cursor-pointer active:scale-95">
            <p className="text-lg text-[#35B900] mr-1">Share</p>
            <IoShareSocial className="w-6 h-6 text-[#35B900]" />
          </button>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1 border-r  ">
            <div className="flex items-center justify-between border-b p-6">
              <div>
                <p className="text-2xl font-semibold">$1K+</p>
                <p className="text-sm text-gray-700 ">Total earnings</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">11</p>
                <p className="text-sm text-gray-700 ">Completed projects</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">2</p>
                <p className="text-sm text-gray-700 ">Active projects</p>
              </div>
            </div>
            <div className=" p-6">
              <div className="mb-5">
                <p className="text-2xl font-semibold mb-2">Languages</p>
                <p className="font-medium mb-2">
                  English : <span className="  font-normal">Fluent</span>
                </p>
                <p className="font-medium mb-2">
                  Turkish : <span className="  font-normal">Begginer</span>
                </p>
                <p className="font-medium">
                  Bangla : <span className="  font-normal">Native</span>
                </p>
              </div>
              <div className="mb-5">
                <p className="text-2xl font-semibold mb-2">Verifications</p>
                <p className="font-medium mb-2 flex items-center">
                  Phone: <span className="mx-1 font-normal">Verified</span>
                  <RiVerifiedBadgeFill />
                </p>
                <p className="font-medium mb-2 flex items-center">
                  Payment: <span className="mx-1 font-normal">Verified</span>
                  <RiVerifiedBadgeFill />
                </p>
              </div>
              <div className="mb-5">
                <p className="text-2xl font-semibold mb-2">Education</p>
                <div className="mb-2">
                  <p className="font-medium  text-xl">
                    University of Dhaka, Bangladesh
                  </p>
                  <p className="  text-lg text-gray-700">2015 - 2019</p>
                </div>
                <div className="mb-2">
                  <p className="font-medium  text-xl">
                    Dhaka College, Bangladesh
                  </p>
                  <p className="  text-lg text-gray-700">2013 - 2015</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="p-6 border-b">
              <p className="text-2xl font-semibold mb-6">
                WordPress Expert & Front-End Developer
              </p>
              <p>
                I have 15 years of WordPress developer and designing experience.{" "}
                <br />
                <br />
                Welcome! <br /> <br /> I’m a UI/UX Designer, Product Designer,
                Interaction Designer and Frontend Developer with more than 9
                years of experience. My goal is to make your ideas and business
                objectives into stunning useful designs. In each project, I
                first listen, learn, and understand and then execute my solution
                to the highest level....
              </p>
              <p className="text-[#35B900] underline cursor-pointer hover:no-underline">
                See More
              </p>
            </div>
            <div className="p-6 border-b">
              <p className="text-2xl font-semibold mb-4">Skills</p>
              <div className="flex items-center flex-wrap gap-2">
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  HTML
                </button>
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  CSS
                </button>
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  JavaScript
                </button>
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  React JS
                </button>
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  Next JS
                </button>
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  Tailwind CSS
                </button>
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  MongoDB
                </button>
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  Node JS
                </button>
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  Express JS
                </button>
                <button className="rounded-3xl px-3 py-1 bg-[#34b90018] text-gray-700 text-center active:scale-95 ">
                  Github
                </button>
              </div>
            </div>
            {/* <div className="p-6 border-b">
              <p className="text-2xl font-semibold mb-4">Portfolio</p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="border rounded-3xl max-w-screen-xl p-6 mt-8 mb-28 mx-auto">
        <p className="text-3xl font-semibold mb-4">Employment History</p>
        <div className="my-2 py-6 border-b">
          <p className="text-2xl font-semibold mb-2">
            WordPress Expert & Front-End Developer
          </p>
          <p className=" font-medium text-lg text-gray-700 mb-2">
            January 2018 - Present
          </p>
          <p className="text-lg text-gray-700">
            At Wangard International, I work lead a team of designers skilled in
            graphic designing, video editing, animated videos, etc.
          </p>
        </div>
        <div className="my-2 py-6 ">
          <p className="text-2xl font-semibold mb-2">
            Graphic Designer | Primary Secondary Health Care Department of
            Barishal
          </p>
          <p className=" font-medium text-lg text-gray-700 mb-2">
            December 2016 - December 2017
          </p>
          <p className="text-lg text-gray-700">
            At Wangard International, I work lead a team of designers skilled in
            graphic designing, video editing, animated videos, etc.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
