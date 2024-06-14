import React from "react";
import heroBg from "../assets/home/header.png"
// import Container from "./Container";
import { useMediaQuery } from "@uidotdev/usehooks";

const Hero = () => {
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px")
    // const labSublabel = (props) => {
    //     return (
    //         <div>
    //             <p></p>
    //             <p></p>
    //         </div>
    //     );
    // }
    return (
        <div className={`flex ${isSmallDevice ? "flex-col" : ""}`}>
                <div className={`${isSmallDevice ? "p-5 text-center" : "columns-2 ml-8 "}`}>
                    <div className={`flex-col ${isSmallDevice ? "mt-5" : "mt-24 ml-10"}`}>
                        <h1 className={`text-gray-100 font-sans font-bold ${isSmallDevice ? "text-heading-3 " : "text-heading-1 w-[586px] ml-8"}`}>
                            buat duniamu lebih berwarna dengan jelajahi dunia
                        </h1>
                        <p className={`font-sans text-gray-70 ${isSmallDevice ? "text-base mt-5" : "text-heading-2 mt-10"}`}>
                        Jelajahi dunia yang indah dengan satu sentuhan dengan pesan tiket
                        di Travel kamu akan dapatkan pelayanan terbaik untuk wisata
                        liburanmu kemana saja dan kapan saja  
                        </p>
                    </div>
                    <img className={`${isSmallDevice ? "h-[300px] ml-5" : "h-[764px] ml-12"}`}
                    src={heroBg} alt="heroBg"
                    />
                    <div className={`${isSmallDevice ? "mt-5" : "ml-[-700px]"}`}>
                        <div className={`flex ${isSmallDevice ? "flex-col-2 gap-2" : "gap-40 text-center"}`}>
                        <p className={`${isSmallDevice ? "text-heading-4" : "text-heading-1"} text-gray-100 font-sans font-bold mb-2`}> +50 Tempat</p>
                        <p className={`${isSmallDevice ? "text-heading-4" : "text-heading-1"} text-gray-100 font-sans font-bold mb-2`}>+100 Wisata</p>
                        <p className={`${isSmallDevice ? "text-heading-4" : "text-heading-1"} text-gray-100 font-sans font-bold mb-2`}>+10 Event</p>
                        <p className={`${isSmallDevice ? "text-heading-4" : "text-heading-1"} text-gray-100 font-sans font-bold mb-2`}>+10 Kategori</p>
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default Hero