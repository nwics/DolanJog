import React, { useState } from 'react';
import { wisataData } from '../../assets/namaTempatWisata';
import searchIcon from "./search-icon.svg"


export const SearchBar = ({setResults}) => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [input, setInput] = useState("")

  const fetchData = (value) => {
    const results = wisataData.filter((wisata)=>{
      return (
        value &&
        wisata &&
        wisata.nama &&
        wisata.id &&
        wisata.nama.toLowerCase().includes(value.toLowerCase())
      ) ? wisata : null
    })
    setResults(results)
    console.log("coba cek",results)
    return results
  }
 
  const handleChange = (value) =>{
    setInput(value)
    fetchData(value)
    console.log("ini buat apa",setInput(value))

  }

//   const results = !searchTerm
//     ? wisataData
//     : wisataData.filter(wisata =>
//         wisata.nama.toLowerCase().includes(searchTerm.toLocaleLowerCase())
//       );

  return (
    <div>
        <form className="h-[50px] w-[300px] flex items-center">

            <input className="border border-gray-50 px-5 py-3"
                type="text"
                placeholder="Cari tempat wisata..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            <button className="flex justify-center items-center bg-blue-100 border border-blue-100 text-sm rounded-r-md h-[51px] w-[46px]"
                type="submit">   
                <img src={searchIcon} alt="searchIcon" height="24" width="24" />
            </button>
        </form>
      {/* {results.map(item => (
        <div key={item.id}>
          <h2>{item.nama}</h2>
          <p>{item.deskripsi}</p>
         
        </div>
      ))} */}
    </div>
  );
};


