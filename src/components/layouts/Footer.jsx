import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="footer w-full">
                <div className="w-full mx-auto max-w-[1380px]">
                    <hr />
                    <div className="row footer-content">
                        <div className="footer-col" style={{ textAlign: "left" }}>
                            <h4>BİLGİ</h4>
                            <ul>
                                <li>
                                    <a className="footer-link" href="">
                                        Nasıl çalışır?
                                    </a>
                                </li>
                                <li>
                                    <a className="footer-link" href="">
                                        Yardım
                                    </a>
                                </li>
                                <li>
                                    <a className="footer-link" href="">
                                        Hakkımızda
                                    </a>
                                </li>
                                <li>
                                    <a className="footer-link" href="">
                                        İş veren sözleşmesi
                                    </a>
                                </li>
                                <li>
                                    <a className="footer-link" href="">
                                        İş alan sözleşmesi
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-col" style={{ textAlign: "center" }}>
                            <h4>POPÜLER KATAGORİLER</h4>
                            <ul>
                                <li>
                                    <a
                                        className="footer-link"
                                        href="kgrafiktasarim.html"
                                    >
                                        Grafik Tasarım
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="footer-link"
                                        href="kdijitalmarket.html"
                                    >
                                        Dijital Market
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="footer-link"
                                        href="kvideoanimasyon.html"
                                    >
                                        Video & Animasyon
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="footer-link"
                                        href="kprogramlama.html"
                                    >
                                        Programlama
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="footer-link"
                                        href="kboyabadana.html"
                                    >
                                        Boya & Badana
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="footer-link"
                                        href="korganizasyon.html"
                                    >
                                        Organizasyon
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="footer-link"
                                        href="ktemizlik.html"
                                    >
                                        Temizlik
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="footer-link"
                                        href="kfotografcilik.html"
                                    >
                                        Fotoğrafçılık
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="footer-link"
                                        href="kyazmaceviri.html"
                                    >
                                        Yazma & Çeviri
                                    </a>
                                </li>
                                <li>
                                    <a className="footer-link" href="knakliye.html">
                                        Nakliye
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-col" style={{ textAlign: "right" }}>
                            <h4>DESTEK</h4>
                            <ul>
                                <li>
                                    <a className="footer-link" href="">
                                        destek@kf.com
                                    </a>
                                </li>
                                <li>
                                    <a className="footer-link" href="">
                                        Müşteri Hizmetleri
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <p>KocFreelancing &#169; 2023 Tüm Hakları Saklıdır.</p>
                        </div>
                        <div className="col-logo">
                            <p>KocFreelancing</p>
                        </div>
                        <div className="socialIcons">
                            <a className="footer-link" href="">
                                <i className="ri-instagram-line"></i>
                            </a>
                            <a className="footer-link" href="">
                                <i className="ri-tiktok-line"></i>
                            </a>
                            <a className="footer-link" href="">
                                <i className="ri-twitter-line"></i>
                            </a>
                            <a className="footer-link" href="">
                                <i className="ri-facebook-line"></i>
                            </a>
                            <a className="footer-link" href="">
                                <i className="ri-mail-line"></i>
                            </a>
                            <a className="footer-link" href="">
                                <i className="ri-linkedin-line"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;