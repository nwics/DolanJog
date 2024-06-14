
// import { SearchBar } from "./SearchBar"
import {SearchResult} from "./SearchResult"

export const SearchResultList =({results})=> {

    
    console.log("cek prop",results)
    // const result =
    return (
        <div className="results-list ">
          
            {/* <SearchResult result={result} /> */}
            {results.map((result, id) => {
        return <SearchResult result={result.nama} key={id} />;
      })}

            {/* <h1>{result}</h1> */}
        </div>       
    )
}
