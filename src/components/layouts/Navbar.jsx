import * as React from "react";
import AccountMenu from "./menu";
import MenuBar from "./menuBar";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="header">
      <div className="flex items-center justify-center ">
        <Link href="/" className="logo ">
          KocFreelancing <i className="ri-user-follow-line"></i>
        </Link>
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
          </div>
        ) : (
          <div className="navlist">
            <a className="nav-text">Jobs</a>
            <a className="nav-text">Categories</a>
          </div>
        )}
      </div>
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
  );
};

export default Navbar;
