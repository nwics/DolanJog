import React, { useState } from "react";
// import Image from "next/Image"
// import searchIcon from "../assets/icons/search-icon.svg"
import Container from "./Container";
// import { wisataData } from "../assets/namaTempatWisata";
import { SearchBar } from "./search/SearchBar";
import { SearchResultList } from "./search/SearchResultList";
import { useMediaQuery } from "@uidotdev/usehooks";
// import { SearchResultList } from "./search/SearchResultList";
// import Login from "../pages/Login"
import BurgerIcon from "../assets/icons/burger-bar.png"
// import {unstable_HistoryRouter} from "react-router-dom"
import logo from "../assets/icons/logo.png"

const Header = () => {
    const [results, setResults] = useState([])
    // console.log("ini resultsnya:",results)
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Menambahkan kelas yang memicu animasi ketika menu dibuka atau ditutup
        
    };  
    
   
    return (
        <header className="h-[95px] left-0 right-0 top-0 bg-white shadow-lg p-4 z-20">
            <Container>
                <div className={`flex items-center h-12 ${isSmallDevice ? "" : "gap-40"}`}>
                    <div className={`${isSmallDevice ? "ml-0 flex" : "-ml-40 flex"}`}>
                        <img
                        className={`${isSmallDevice ? "w-[32px] h-[22px] mt-1":"w-[40px] h-[30px] mt-2  "}`}
                        src={logo}
                        // width="40px"
                        // height="30px"
                        alt="" />
                        <h1 className={`font-sans font-bold ${isSmallDevice ? " text-lg ml-2" : "text-4xl ml-2"}`}>DolanJo</h1>
                    </div>
                    {/* membuat search */}
                    {/* <form onSubmit={handleSubmit} className="h-[50px] w-[300px] flex items-center">
                        <input className="border border-gray-50 px-5 py-3"
                            type="text"
                            placeholder="Search ....."
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <button className="flex justify-center items-center bg-blue-100 border border-blue-100 text-white text-sm rounded-r-md h-[51px] w-[46px]"
                            type="submit">

                            <img src={searchIcon} alt="searchIcon" height="24" width="24" />
                        </button>
                    </form> */}
                    {/* <SearchBar suggestions={wisataData}/> */}
                    <div className={`search-bar-container ${isSmallDevice ? "ml5" : ""}`} style={{position: 'relative'}}>
                        <SearchBar setResults={setResults} />
                
                        {results && results.length > 0 ? <SearchResultList results={results} /> : null}
                    </div>
                    <div className="ml-20">

                        {isSmallDevice ? (
                            <div className="relative">
                            <button onClick={toggleMenu} className="burger-button">
                                <img src={BurgerIcon} alt="Menu" height="24" width="24" />
                            </button>
                            {isMenuOpen && (
                                <ul className="flex flex-col items-center gap-2 bg-white shadow-lg p-5 rounded-lg absolute top-12 right-0 z-10">
                                <li>
                                    <a href="/#" className="text-heading-3 text-gray-70 font-sans font-bold">
                                    Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/rekomendasi" className="text-heading-3 text-gray-70 font-sans font-bold">
                                    Rekomendasi
                                    </a>
                                </li>
                                <li>
                                    <a href="/#FAQ" className="text-heading-3 text-gray-70 font-sans font-bold">
                                    FAQ
                                    </a>
                                </li>
                                </ul>
                            )}
                            </div>
                        ) : (
                            <ul className="flex items-center gap-5">
                            <li>
                                <a href="/#" className="text-heading-3 text-gray-70 font-sans font-bold">
                                Home
                                </a>
                            </li>
                            <li>
                                <a href="/rekomendasi" className="text-heading-3 text-gray-70 font-sans font-bold">
                                Rekomendasi
                                </a>
                            </li>
                            <li>
                                <a href="/#FAQ"  className="text-heading-3 text-gray-70 font-sans font-bold"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (window.location.pathname === '/') {
                                        document.getElementById('FAQ').scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        window.location.href = '/#FAQ';
                                    }
                                }}
                                >
                                FAQ
                                </a>
                            </li>
                            </ul>
                        )}
                    </div>
                    
                    {/* membuat button */}
                    {/* <button className="bg-blue-100 text-xl font-label text-white m-5 p-4 rounded-lg w-72">Masuk</button> */}
                </div>
            </Container>

        </header>
    )
}

export default Header