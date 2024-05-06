import React from "react";
import { IoMegaphoneSharp } from "react-icons/io5";
import { FaCheckDouble } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";

export const Steps = () => {
  return (
    <div className="w-full overflow-x-hidden bg-[whitesmoke] px-0 py-[78px]">
      <div className="w-[1130px] max-w-[95%] flex items-center justify-around mx-auto my-0">
        <div className="w-[500px]">
          <h1 className="text-[rgb(53,185,0)] text-3xl capitalize text-center mb-10">
            3 ADIMDA İŞİNİZİ HALLEDİN
          </h1>
          <p className="flex items-center gap-x-4">
            <FaWpforms className="text-2xl" /> KocFreelancing&ados;e kayıt olun.
          </p>
          <p className="flex items-center gap-x-4">
            <IoMegaphoneSharp className="text-2xl" /> İşiniz için ilan verin.
          </p>
          <p className="flex items-center gap-x-4">
            <FaCheckDouble className="text-2xl" /> Gelen tekliflerden işinize
            uygun olan profesyoneli seçin.
          </p>
          &nbsp;{" "}
          <a href="">
            <button className="button1">Şimdi Keşfedin</button>
          </a>
        </div>
      </div>
    </div>
  );
};
