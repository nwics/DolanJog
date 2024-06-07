import React from "react";
import heroBg from "../assets/home/header.png"
// import Container from "./Container";


const Hero = () => {
    // const labSublabel = (props) => {
    //     return (
    //         <div>
    //             <p></p>
    //             <p></p>
    //         </div>
    //     );
    // }
    return (
        <div className="flex">
                <div className="columns-2 pt-20 ">
                    <div className=" row-span-5 mt-24 ml-10 flex-col">
                        <h1 className="text-heading-1 text-gray-100 font-sans font-bold w-[586px] ml-8">
                            buat duniamu lebih berwarna dengan jelajahi dunia
                        </h1>
                        <p className="font-sans text-gray-70 text-heading-2 mt-10">
                        Jelajahi dunia yang indah dengan satu sentuhan dengan pesan tiket
                        di Travel kamu akan dapatkan pelayanan terbaik untuk wisata
                        liburanmu kemana saja dan kapan saja  
                        </p>
                    </div>
                    <img className="h-[764px] ml-40" 
                    src={heroBg} alt="heroBg"
                    />
                    <div className="ml-[-700px]">
                        <div className="flex gap-40 text-center">
                        <p className="text-gray-100 text-heading-1 font-sans font-bold mb-2"> +50 Tempat</p>
                        <p className="text-gray-100 text-heading-1 font-sans font-bold mb-2">+100 Wisata</p>
                        <p className="text-gray-100 text-heading-1 font-sans font-bold mb-2">+10 Event</p>
                        <p className="text-gray-100 text-heading-1 font-sans font-bold mb-2">+10 Kategori</p>
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default Hero