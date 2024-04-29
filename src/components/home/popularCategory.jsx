import { Container, Stack } from "@mui/material";
import { getPopularCategories } from "../../axios/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Description from "../ui/Description";
import { useRouter } from "next/router";
import Link from "next/link";

export const PopularCategory = ({ categories, categoryLoading }) => {
  const router = useRouter();

  return (
    <div className="card1">
      <Stack>
        <h1 className="h1">Popüler Kategoriler</h1>
      </Stack>
      <Container>
        <div className=" max-w-screen-xl grid grid-cols-1 lg:grid-cols-3  gap-x-6 gap-y-24 mt-20 mb-14 mx-auto">
          {categoryLoading ? (
            <div className="flex items-center col-span-1 lg:col-span-3 justify-center h-[50vh]  mb-14 mx-auto">
              <div className="loader"></div>
            </div>
          ) : categories?.length > 0 ? (
            [...categories]
              .reverse()
              .slice(0, 12)
              .map((item, index) => (
                <div
                  className="relative flex flex-col rounded-xl bg-white border shadow cursor-pointer group transition-all text-secondary "
                  key={index}
                  onClick={() => router.push(`/category/${item?._id}`)}
                >
                  <div className="w-full transition-all  px-6 rounded-xl">
                    {item?.image ? (
                      <img
                        src={item?.image}
                        alt="picture"
                        className="rounded-xl w-full  transition-all -mt-8 h-48 overflow-hidden h-full"
                        style={{
                          objectFit: "cover", // cover, contain, none
                        }}
                      />
                    ) : (
                      <p>No image found</p>
                    )}
                  </div>
                  <div className="p-6 -mt-8">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {item?.name}
                    </h5>
                    <Description
                      description={item?.description}
                      maxLines={5}
                      maxWords={20}
                      className={"block font-sans text-base   "}
                    />
                    <p className="font-medium mt-2">
                      Total Freelancers : {item?.freelancers ?? 0}
                    </p>
                  </div>
                  <div className="p-6 pt-0 mt-auto">
                    <button
                      className=" rounded-3xl  w-full lg:py-3 lg:px-4 px-3 py-2  bg-primary hover:bg-opacity-90 transition-all border text-white text-center active:scale-95 "
                      onClick={() => router.push(`/category/${item?._id}`)}
                    >
                      See details
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="flex items-center justify-center">
              <Image
                src="/assets/404.png"
                width={400}
                height={400}
                alt="No Data Found"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center my-8">
          <Link
            className=" rounded-3xl  lg:py-4 lg:px-8 px-4 py-2  bg-primary hover:bg-opacity-90 transition-all border text-white text-center active:scale-95 "
            href="/categories"
          >
            See all Categories
          </Link>
        </div>
      </Container>
    </div>
  );
};
