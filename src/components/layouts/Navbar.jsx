import * as React from "react";
import AccountMenu from "./menu";
import MenuBar from "./menuBar";
import Link from "next/link";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="header">
      <div className="left-part ">
        <Link href="/" className="logo">
          KocFreelancing <i className="ri-user-follow-line"></i>
        </Link>
        {isAuthenticated ? (
          <div className="navlist">
            <MenuBar
              menuName={"İş bul"}
              menuItems={[
                "İş bul",
                "Kategoriler",
                "Kaydedilen iş",
                "Teklifler",
              ]}
            />
            <MenuBar
              menuName={"Benim işim"}
              menuItems={["My Job", "Work Diary"]}
            />
            <Link href="/jobs" className="nav-text">
              Find Work
            </Link>
          </div>
        ) : (
          <div className="navlist">
            <a className="nav-text">Yardım & Destek</a>
            <a className="nav-text">Kategoriler</a>
            <a className="nav-text">İletişim</a>
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
