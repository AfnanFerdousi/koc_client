import Link from "next/link";
import { useRouter } from "next/router";
import { RxCross1 } from "react-icons/rx";
import { MdMenu } from "react-icons/md";
import React from "react";
import { useEffect, useState } from "react";
import AccountMenu from "./menu";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {/* for mobile */}
      <div className="fixed top-0 left-0 z-50 w-[100vw] lg:hidden block bg-[#111822] px-8 py-5">
        <div className="flex items-center justify-between w-full ">
          <Link href="/" className="logo ">
            KocFreelancing <i className="ri-user-follow-line"></i>
          </Link>
          {isAuthenticated && <AccountMenu />}
          {!showMenu ? (
            <MdMenu
              className="w-7 h-7 text-white"
              onClick={() => setShowMenu(!showMenu)}
            />
          ) : (
            <RxCross1
              className="w-7 h-7 text-white"
              onClick={() => setShowMenu(!showMenu)}
            />
          )}
        </div>
        {showMenu && (
          <div className="bg-[#111822] w-full p-2 rounded">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2 ">
                <Link
                  href="/jobs"
                  className={`${
                    router.pathname === "/jobs" && "!text-primary"
                  }  hover:underline text-white`}
                >
                  Jobs
                </Link>
                <Link
                  href="/categories"
                  className={`${
                    router.pathname === "/categories" && "!text-primary"
                  }  hover:underline text-white`}
                >
                  Categories
                </Link>
                <Link
                  href="/myhires"
                  className={`${
                    router.pathname === "/myhires" && "!text-primary"
                  }  hover:underline text-white`}
                >
                  Hired Freelancers
                </Link>
                <Link
                  href="/myclients"
                  className={`${
                    router.pathname === "/myclients" && "!text-primary"
                  }  hover:underline text-white`}
                >
                  My Clients
                </Link>
                <Link
                  href="/contact"
                  className={`${
                    router.pathname === "/contact" && "!text-primary"
                  }  hover:underline text-white`}
                >
                  Contact Us
                </Link>
              </div>
            ) : (
              <div className="navlist">
                <Link
                  href="/jobs"
                  className={`${
                    router.pathname === "/jobs" && "!text-primary"
                  }  hover:underline text-white`}
                >
                  Jobs
                </Link>
                <Link
                  href="/categories"
                  className={`${
                    router.pathname === "/categories" && "!text-primary"
                  }  hover:underline text-white`}
                >
                  Categories
                </Link>
                <Link
                  href="/contact"
                  className={`${
                    router.pathname === "/contact" && "!text-primary"
                  }  hover:underline text-white`}
                >
                  Contact Us
                </Link>
              </div>
            )}
            {!isAuthenticated && (
              <div className="flex items-center  my-2 ">
                <Link href="/auth/login" className="login-btn">
                  Giriş
                </Link>
                <Link href="/auth/signup" className="signup-btn">
                  Kayıt
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {/* for pc  */}
      <div className="fixed top-0 right-0 z-50 w-[100vw] hidden lg:flex items-center justify-between bg-[#111822] px-8 py-5">
        <div className="flex items-center ">
          <Link href="/" className="logo ">
            KocFreelancing <i className="ri-user-follow-line"></i>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <div>
            {" "}
            {isAuthenticated ? (
              <div className="navlist">
                <Link
                  href="/jobs"
                  className={`${
                    router.pathname === "/jobs" && "!text-primary"
                  } nav-text`}
                >
                  Jobs
                </Link>
                <Link
                  href="/categories"
                  className={`${
                    router.pathname === "/categories" && "!text-primary"
                  } nav-text`}
                >
                  Categories
                </Link>
                <Link
                  href="/myhires"
                  className={`${
                    router.pathname === "/myhires" && "!text-primary"
                  } nav-text`}
                >
                  Hired Freelancers
                </Link>
                <Link
                  href="/myclients"
                  className={`${
                    router.pathname === "/myclients" && "!text-primary"
                  } nav-text`}
                >
                  My Clients
                </Link>
                <Link
                  href="/contact"
                  className={`${
                    router.pathname === "/contact" && "!text-primary"
                  } nav-text`}
                >
                  Contact US
                </Link>
              </div>
            ) : (
              <div className="navlist">
                <Link
                  href="/jobs"
                  className={`${
                    router.pathname === "/jobs" && "!text-primary"
                  } nav-text`}
                >
                  Jobs
                </Link>
                <Link
                  href="/categories"
                  className={`${
                    router.pathname === "/categories" && "!text-primary"
                  } nav-text`}
                >
                  Categories
                </Link>
                <Link
                  href="/contact"
                  className={`${
                    router.pathname === "/contact" && "!text-primary"
                  } nav-text`}
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
          <div>
            {" "}
            {isAuthenticated ? (
              <AccountMenu />
            ) : (
              <div className="btn-group">
                <Link href="/auth/login" className="login-btn">
                  Giriş
                </Link>
                <Link href="/auth/signup" className="signup-btn">
                  Kayıt
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
