import { IoIosStarOutline } from "react-icons/io";
import { CiDollar, CiLock } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";

export const Benefit = () => {
    return (
        <div className="body3">
            <div className="main3">
                <div className="body3-text">
                    <h1>
                        KULLANICILAR NEDEN KOCFREELANCING&ados;İ TERCİH EDİYOR?
                    </h1>
                    <p className="flex items-center gap-x-4">
                       <IoIosStarOutline className="text-2xl" /> Üye olma ücreti yok.
                    </p>
                    <p className="flex items-center gap-x-4">
                       <CiDollar className="text-2xl"/> İşinizi
                        teslim alıp onay verene kadar paranız provizyonda
                        bekletilir.
                    </p>
                    <p className="flex items-center gap-x-4">
                        <FaPeopleGroup className="text-2xl"/> Geniş ve profesyonel
                        kullanıcı ağına sahiptir.
                    </p>
                    <p className="flex items-center gap-x-4">
                       <MdOutlineMiscellaneousServices className="text-2xl"/> İki taraflı
                        kullanıcı sözleşmeleri ve doğrulamaları ile birlikte,
                        çalışan ve iş veren arasında güven bağı oluşturulur.
                    </p>
                    <p className="flex items-center gap-x-4">
                        <CiLock className="text-2xl"/> Verilerinizi ve
                        gizliliğinizi özenle korumaya yönelik adımlar atıyoruz.
                    </p>
                    <p className="flex items-center gap-x-4">
                        <IoPeopleSharp className="text-2xl"/>{" "}
                        İhtiyacınız olduğu anda 7/24 canlı destek ile buradayız.
                    </p>
                </div>
            </div>
        </div>
    );
};
