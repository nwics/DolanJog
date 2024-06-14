import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import {  wisataData } from '../../assets/namaTempatWisata';

export const SearchResult = ({result}) => {
    // Cari objek dalam dataTempatWisata yang memiliki nama yang sama dengan result
    const tempatWisata = wisataData.find(item => item.nama === result);

    const id = tempatWisata ? tempatWisata.id : result;

    // console.log("ini adalah result",typeof(result))
    const [isClicked, setIsClicked] = useState(false);
     // Fungsi untuk menangani klik pada link
     const handleClick = () => {
        setIsClicked(true);
    }
    
    useEffect(() => {
        setIsClicked(false);
    }, [result]);

    if (isClicked) {
        return null;
    }
    return (
        <Link to={`/details/${id}`} className="search-result"onClick={handleClick}>
        {result}
        {/* {result.nama} */}
        {/* <h1>{result}</h1> */}
    </Link>
    )
}

