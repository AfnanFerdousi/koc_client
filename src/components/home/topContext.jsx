import { Button } from "@mui/material";
import Image from "next/image";

export const TopContent = () => {
  return (
    <div className="hero">
      <div className="hero-text">
        <h4>
          <i>KocFreelancing ,</i> yetenekleri olan insanları yeteneğine uygun
          işlerle kolay ve basit şekilde buluşturan bir platformdur.
        </h4>
        <div>
          <form className="form">
            <i className="ri-search-line"></i>
            <input type="text" placeholder="NE ARIYORSUN?" />
            <Button className="top-btn">Ara</Button>
          </form>
        </div>
        <div className="chip">
          {" "}
          Popüler:{" "}
          <a className="chip-element" href="">
            Web Tasarım
          </a>
          <a className="chip-element" href="">
            Grafik Tasarım
          </a>
          <a className="chip-element" href="">
            Boya-Badana
          </a>
          <a className="chip-element" href="">
            Fotoğrafçılık
          </a>
          <a className="chip-element" href="">
            Temizlik
          </a>
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
