import { Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPopularCategories } from "../../axios/axios";
import Link from "next/link";
import { useRouter } from "next/router";

export const TopContent = ({ categories, categoryLoading }) => {
  const router = useRouter();
  // Local state to store jobs and loading
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Filter categories based on the search term
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredCategories);
  };

  return (
    <div className="hero">
      <div className="hero-text">
        <h4>
          <i>KocFreelancing ,</i> yetenekleri olan insanları yeteneğine uygun
          işlerle kolay ve basit şekilde buluşturan bir platformdur.
        </h4>
        <div>
          <div className="inline-flex flex-col justify-center relative text-gray-500">
            <form className="form">
              <i className="ri-search-line"></i>
              <input
                type="text"
                placeholder="NE ARIYORSUN?"
                value={searchTerm}
                onChange={handleSearchChange} // Call handleSearchChange on input change
              />
              <Button
                className="top-btn"
                onClick={() => {
                  if (searchTerm !== "" && searchResults?.length > 0) {
                    router.push(`/category/${searchResults[0]?._id}`);
                  }
                }}
              >
                Ara
              </Button>
            </form>
            {console.log(searchResults)}
            {searchTerm !== "" && (
              <div className="absolute left-0 w-full top-full z-10">
                <ul className="bg-white border border-gray-100 rounded p-3">
                  {searchResults.length > 0 ? (
                    <div className="search-results">
                      {searchResults.map((item, index) => (
                        <li
                          onClick={() => router.push(`/category/${item?._id}`)}
                          key={index}
                          className=" p-3 border-b hover:bg-gray-100 hover:rounded cursor-pointer"
                        >
                          {item?.name}
                        </li>
                      ))}
                    </div>
                  ) : (
                    <li className=" p-3  hover:bg-gray-100 hover:rounded cursor-pointer">
                      No results found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="chip space-y-2 space-x-2">
          {" "}
          Popüler:{" "}
          {!categoryLoading ? (
            categories?.length > 0 ? (
              categories.slice(0, 4).map((item, index) => (
                <Link href={`/category/${item._id}`} key={index}>
                  {item.name}
                </Link>
              ))
            ) : (
              <span>No data to show</span>
            )
          ) : (
            <Link href="#" className="chip-element">
              ...
            </Link>
          )}
        </div>
      </div>
      <div className="hero-img">
        <Image
          src="/assets/img/anasayfa3.png"
          alt="anasayfa3.png"
          width={500}
          height={500}
          className="max-h-[500px] max-w-[500px]"
        />
      </div>
    </div>
  );
};
