"use client";
import { useState } from "react";
import { showProducts } from "../../constants/data";

export const Projects = () => {
    const [select, setSelect] = useState<number>();
    const handleClick = (index: number) => {
        if (select === index) {
            setSelect(10);
        } else {
            setSelect(index);
        }
    };

    return (
        <div className="eye-section">
            <div className="product-title">
                KOCFREELANCING&apos;E YAPILAN İLHAM VERİCİ ÇALIŞMALAR
            </div>
            <ul className="eye-card">
                {showProducts.map((element, idx) => {
                    return (
                        <li
                            key={`showproducts-${idx}`}
                            className={`card-item  ${
                                select === idx && "expand"
                            }`}
                        >
                            <img src={element} alt="" />
                            <span>
                                <i
                                    className="ri-eye-line"
                                    onClick={() => handleClick(idx)}
                                ></i>
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
