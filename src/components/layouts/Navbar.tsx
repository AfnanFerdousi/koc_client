import * as React from "react";
import AccountMenu from "./menu";
import MenuBar from "./menuBar";
import Link from "next/link";

interface HeaderProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar: React.FC<any> = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    return (
        <div className="header">
            <div className="left-part">
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
                        <div className="nav-text">Mesajlar</div>
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
                <AccountMenu setIsAuthenticated={setIsAuthenticated} />
            ) : (
                <div className="btn-group">
                    <Link href="/login" className="login-btn">Giriş</Link>
                    <Link href="/signup" className="signup-btn">Kayıt</Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
