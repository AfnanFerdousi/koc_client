import React from "react";
import { IoMegaphoneSharp } from "react-icons/io5";
import { FaCheckDouble } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";

export const Steps = () => {
    return (
        <div className="body2">
            <div className="main2">
                <div className="body2-text">
                    <h1>3 ADIMDA İŞİNİZİ HALLEDİN</h1>
                    <p className="flex items-center gap-x-4">
                        <FaWpforms className="text-2xl"/>{" "}
                        KocFreelancing&ados;e kayıt olun.
                    </p>
                    <p className="flex items-center gap-x-4">
                        <IoMegaphoneSharp className="text-2xl"/> İşiniz için ilan
                        verin.
                    </p>
                    <p className="flex items-center gap-x-4">
                        <FaCheckDouble className="text-2xl"/> Gelen
                        tekliflerden işinize uygun olan profesyoneli seçin.
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
