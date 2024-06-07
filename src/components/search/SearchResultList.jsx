
// import { SearchBar } from "./SearchBar"
import {SearchResult} from "./SearchResult"

export const SearchResultList =({prop})=> {

    // if (!prop) return null;
    // if (!prop || prop.length === 0) return null;
    // if (!prop || !Array.isArray(prop)) {
    //     console.log('prop is either undefined or not an array:', prop);
    //     return null;
    // }
    console.log("cek prop",prop)
    // const prop =
    return (
        <div className="results-list ">
            <h1>a</h1>    
            <h1>a</h1>    
            <h1>a</h1>    
            <h1>a</h1>    
            <h1>a</h1>    
            <h1>a</h1> 
            <SearchResult result={prop} />
            {/* {prop.map((result, id) => {
            return <SearchResult result={result.nama} key={id} />;
            })} */}


            {/* <h1>{prop}</h1> */}
        </div>       
    )
}
