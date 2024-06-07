import React, { useState } from "react";
// import Image from "next/Image"
// import searchIcon from "../assets/icons/search-icon.svg"
import Container from "./Container";
// import { wisataData } from "../assets/namaTempatWisata";
import { SearchBar } from "./search/SearchBar";
import { SearchResultList } from "./search/SearchResultList";
// import { SearchResultList } from "./search/SearchResultList";
// import Login from "../pages/Login"

const Header = () => {
    const [results, setResults] = useState([])
    console.log("ini resultsnya:",results)
    // const [searchTerm, setSearchTerm] = useState("")
    // const [results, setResult] = useState([])
    // const handleChange = e => {
    //     setSearchTerm(e.target.value)
    // }
    // const handleSubmit = e => {
    //     e.preventDevault();
    //     const hasil = wisataData.filter(wisata =>
    //         wisata.nama.toLocaleLowerCase().includes
    //         (searchTerm.toLocaleLowerCase()))
    //     setResult(hasil)
    // }

    return (
        <header className="h-[95px] fixed left-0 right-0 top-0 bg-white shadow-lg p-4 z-20">
            <Container>
                <div className="flex gap-40 items-center h-12">
                    <div className="">
                        <h1 className="text-4xl font-sans font-bold -ml-40">DolanJog</h1>
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
                    <div className="search-bar-container" style={{position: 'relative'}}>
                        <SearchBar setResults={setResults} />
                        {/* {results && results.length > 0 && <SearchResultList results={results} />} */}
                        {results && results.map((result) => (
                                <SearchResultList key={result.id} result={result} />
                            ))}

                    </div>
                    <ul >
                        <li className="flex items-center gap-5">
                            <a href="/#" className="text-heading-3 text-gray-70 font-sans font-bold">Home</a>
                            <a href="/rekomendasi" className="text-heading-3 text-gray-70 font-sans font-bold">Rekomendasi</a>
                            <a href="/" className="text-heading-3 text-gray-70 font-sans font-bold">Destinasi</a>
                            {/* <a href="/login" className="text-heading-3 text-gray-70 font-sans font-bold">Login</a> */}
                        </li>
                    </ul>
                    
                    {/* membuat button */}
                    {/* <button className="bg-blue-100 text-xl font-label text-white m-5 p-4 rounded-lg w-72">Masuk</button> */}
                </div>
            </Container>

        </header>
    )
}

export default Header