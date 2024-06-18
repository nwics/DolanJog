// import Login from "./Login"
// import Container from "../components/Container"
// import Container from "../components/Container"
import {Link} from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
// import { useNavigate } from "react-router-dom"
// import mount from "../assets/icons/mountain 1.png"
import React,{ useState} from "react"
// import clif from "../assets/home/cliff.png"
// import BreadCrumbs from "../components/BreadCrumbs"
import { wisataData } from "../assets/namaTempatWisata"
import { useMediaQuery } from "@uidotdev/usehooks"
// import Container from "../components/Container"
// import Item from "antd/es/list/Item"
// import { TimePicker } from "antd"
// import styles from "./ButtonStyle.css"


const Rekomendasi = () => {
    // const navigate = useNavigate()
    // const TempatWisata = wisataData
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    // const [ptag, setPtag] = useState({ptag1:"", ptag2:""})
    const [loading, setLoading] = useState(false);
    // const [rekomendasi, setRekomendasi] = useState([])
    const [recommendations, setRecommendations] = useState([]);
    // const [tempatWisata, setTempatWisata] = useState([])
    const [inputs, setInputs] = useState({
        harga: "",
        fasilitas: [],
        waktu: "",
        kategori: "",
        deskripsi: "",
    });   
    // const format = "HH.mm"
    const HandleClick = (e) => {
        e.preventDefault()
        var WaktuInput = document.getElementById("waktuInput")
        if (!WaktuInput.value) {
            alert("Tolong isi bagian Waktu")
        }
        // const {name, value} = e.target;
        // setInputs({...FormData, [name]:value});
        // setPtag({
        //     ptag1: `Hasil untuk "`+inputs+`"...`,
        //     ptag2: "Rekomendasinya adalah ....."
        
        // })
        setLoading(true);
        console.log("Meminta request pada Backend .....")
        fetch("/hasil", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({inputs})
            
        })
        .then((response) =>{
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data) =>{
            console.log("succes:", data)
            setLoading(false);
            setRecommendations(data)
        });
        
        console.log("data yang diterima dari server")
        // console.log("jenis data:", typeof(inputs.waktu))
    };
    const HandleChange =(e) =>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const handleFasilitasChange = (event) => {
        if (event.target.checked) {
            // Jika checkbox dicentang, tambahkan nilai ke array fasilitas
            setInputs(oldInputs => ({...oldInputs, fasilitas: [...oldInputs.fasilitas, event.target.value]}));
        } else {
            // Jika checkbox tidak dicentang, hapus nilai dari array fasilitas
            setInputs(oldInputs => ({...oldInputs, fasilitas: oldInputs.fasilitas.filter(fas => fas !== event.target.value)}));
        }
    };
    const handleKategoriChange = (event) => {
        if (event.target.checked) {
            // Jika checkbox dicentang, tambahkan nilai ke array kategori
            setInputs(oldInputs => ({...oldInputs, kategori: [...oldInputs.kategori, event.target.value]}));
        } else {
            // Jika checkbox tidak dicentang, hapus nilai dari array kategori
            setInputs(oldInputs => ({...oldInputs, kategori: oldInputs.kategori.filter(kat => kat !== event.target.value)}));
        }
    };
    

    
    const RekomendasiCard = ({recommendation}) => {
        // console.log(recommendation);
        const tempatWisata = wisataData.find(item => item.nama===recommendation)
        // const id = tempatWisata ? tempatWisata.id : recommendation
        if (!tempatWisata) {
            return (
                <div className="bg-white shadow-lg rounded-xl m-5 overflow-hidden w-[330px] h-[232px]">
                    <div className="px-6 py-4">
                        <h1 className="items-center">Data not found for {recommendation}</h1>
                    </div>
                </div>
            );
        }
        return (
            // <Link to={`/produk-details/${product.id}`}></Link>
            <div className="bg-white shadow-lg rounded-xl m-5 overflow-hidden w-[330px] h-[232px]">
                <div className="px-6 py-4">
                    <img src={tempatWisata.foto[0]} alt="" style={{height:`150px`}}/>
                    <h1 className=" items-center">{recommendation}</h1>
                    {/* <h2>{recommendation}</h2> */}
                    {/* console.log({recommendation.Place_ID}) */}
                </div>
           </div>
        )
    }

    return (
        <>
        {/* <input type="text" /> */}
        {/* <h1 >Selamat datang</h1> */}
        <Header />
        <div className={`flex p-5 ${isSmallDevice ? "flex-col" : ""}`}>
                {/* <BreadCrumbs />   */}
                
                <div className="pt-10 ml-10 text-xl w-full ">
                    <h1 className="font-bold text-4xl text-black">Tempat Rekomendasi</h1>
                    <p>Lakukann pemilihan sesuai dengan apa yang diinginkan</p>
                    <form onSubmit={HandleClick} className="flex-col justify-center mt-10 ">
                        <div className="flex flex-col rounded-xl overflow-hidden">
                            <label className="font-bold text-black">Waktu :</label>
                            <p>klik bagian jam untuk auto</p>
                            <input className="text-input width bg-blue-100" type="time" id="waktuInput" name="waktu" value={inputs.waktu} onChange={HandleChange} placeholder="masukkan waktu ....." required/> <br/>
                        
                        </div>
                        <div className="flex flex-col white-shadow rounded-xl overflow-hidden mt-10 width">
                            <label className="flex justify-betwen">
                                <h1 className="font-bold text-black">Harga</h1>
                                <h1 className="text-gray-30">Rp {inputs.harga}</h1>
                            </label>
                            
                            <input className="slider mt-10 appearance-none h-2 rounded-full bg-gray-400 outline-none transition-opacity duration-200 hover:opacity-100" 
                                type="range" min="1" max="50000" 
                                name="harga" value={inputs.harga} 
                                onChange={HandleChange}
                                style={{background: `#d3d3d3`}}
                                /> <br/>

                        </div>
                        <div className="flex flex-col white-shadow rounded-xl overflow-hidden mt-10">
                            <label className="font-bold text-black">Deskripsi:</label>
                            <p>contoh: saya ingin ke tempat yang cocok untuk keluarga dan banyak permainan anak</p>
                            <input className=" text-input width bg-blue-100" type="text" name="deskripsi" value={inputs.deskripsi} onChange={HandleChange} placeholder="masukkan deskripsi ....."/> <br/>
                        </div>
                        <div className="flex flex-col rounded-xl overflow-hidden mt-10 white-shadow">
                            <h1 className="font-bold text-black">Kategori :</h1>
                            <div className={`flex ${isSmallDevice ? "flex-col justify-center" : "gap-10 justify-center"} padding`}>
                                <div >
                                </div>
                                <label for="pantai">
                                {/* <img src={} alt=""/> */}
                                </label>
                                <input className="card-checkbox pantai" data-label="Pantai" type="checkbox" id="Pantai" name="kategori" value="Pantai" onChange={handleKategoriChange} /> <br/>
                                <label for="Budaya"></label>
                                <input className="card-checkbox budaya" type="checkbox"  id="Budaya" data-label="Budaya"name="kategori" value="Budaya" onChange={handleKategoriChange} /> <br/>
                                <label for="Taman Hiburan"></label>
                                <input className="card-checkbox taman" type="checkbox"  id="Taman Hiburan" data-label="Taman Hiburan"name="kategori" value="Taman Hiburan" onChange={handleKategoriChange} /> <br/>
                                <label for="Wisata Alam"  className="" style={{ display: 'flex', alignItems: 'center'}}> 
                                    
                                    {/* <img src= {mount} alt="" style={{marginRight:'10px'}}/> */}
                                    <input type="checkbox" className="card-checkbox" id="WisataAlam" data-icon="url('../assets/icons/mountain 1.png')"data-label="Wisata Alam" name="kategori" value="Wisata Alam" onChange={handleKategoriChange}
                                    />
                                    
                                
                                </label>
                            </div>

                        </div>
                        <div className= {`flex flex-col rounded-xl overflow-hidden mt-10 white-shadow `}>
                            <h1 className="font-bold text-black ">Fasilitas :</h1>
                            <div className={`${isSmallDevice ? "flex flex-col-2 gap-10" : ""}`}>
                                <div className={`flex ${isSmallDevice ? "flex-col justify-center marginl" : "gap-10 justify-center"} `}>
                                    <label for="Kamar Mandi"></label>
                                    <input className={` toilet ${isSmallDevice ? "card-checkbox-hp" : "card-checkbox"} `} type="checkbox" id="Kamar Mandi" data-label="Kamar Mandi"name="fasilitas" value="Kamar Mandi" onChange={handleFasilitasChange} /> <br/>
                                    <label for="Restoran"></label>
                                    <input className={` restoran ${isSmallDevice ? "card-checkbox-hp" : "card-checkbox"} `}  type="checkbox" id="Restoran" data-label="Restoran" name="fasilitas" value="Restoran" onChange={handleFasilitasChange} /> <br/>
                                    <label for="WIFI"> </label>
                                    <input className={` wifi ${isSmallDevice ? "card-checkbox-hp" : "card-checkbox"} `}  type="checkbox" id="WIFI" data-label="WIFI" name="fasilitas" value="WIFI" onChange={handleFasilitasChange} /> <br/>
                                    <label for="Hotel"></label>
                                    <input className={` hotel ${isSmallDevice ? "card-checkbox-hp" : "card-checkbox"} `}  type="checkbox" id="Hotel" data-label="Hotel" name="fasilitas" value="Hotel" onChange={handleFasilitasChange} /> <br/>
                                </div>
                            
                                <div className={`flex ${isSmallDevice ? "flex-col justify-center marginl ml-10" : "gap-10 justify-center mt-10"} `}>
                                    <label for="Masjid"></label>
                                    <input className={` masjid ${isSmallDevice ? "card-checkbox-hp" : "card-checkbox"} `}  type="checkbox" id="Masjid" data-label="Masjid" name="fasilitas" value="Masjid" onChange={handleFasilitasChange} /> <br/>
                                    <label for="ATM"></label>
                                    <input className={` atm ${isSmallDevice ? "card-checkbox-hp" : "card-checkbox"} `}  type="checkbox" id="ATM" data-label="ATM" name="fasilitas" value="ATM" onChange={handleFasilitasChange} /> <br/>
                                    <label for="Pemandu"> </label>
                                    <input className={` tour ${isSmallDevice ? "card-checkbox-hp" : "card-checkbox"} `}  type="checkbox" id="Pemandu" data-label="Pemandu" name="fasilitas" value="Pemandu" onChange={handleFasilitasChange} /> <br/>
                                    <label for="Fotografer"></label>
                                    <input className={` foto ${isSmallDevice ? "card-checkbox-hp" : "card-checkbox"} `}  type="checkbox" id="Fotografer" data-label="Fotografer" name="fasilitas" value="Fotografer" onChange={handleFasilitasChange} /> <br/>
                                </div>
                            </div>
                        </div>
                        {/* parkir, kamar mandi, restoran, wifi, hotel, tempat ibadah, layanan fotografi, pemandu */}
                        {/* <label >Fasilitas :</label>
                        <input className="border" type="text" name="kategori" value={inputs.kategori} onChange={HandleChange} placeholder="masukkan kategori ....."/> <br/> */}
                        {/* <label>Fasilitas :</label>
                        <input className="border" type="text" name="rating" value={inputs.rating} onChange={HandleChange} placeholder="masukkan rating ....."/> <br/> */}
                        <div className={`flex ${isSmallDevice ? "justify-start": "justify-center ml-10"} mt-10`}>
                            <button className="button white-shadow width text-black bg-blue-100">Dapatkan rekomendasi</button>
                        </div>
                    </form>
                    
                    {loading ? (
                        <div className="flex justify-center items-center mt-10">
                            <div className="loader"></div>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* <p>{ptag.ptag1}</p>
                    <h2>{ptag.ptag2}</h2> */}
                    {/* <h3>{setRecommendations(dataAkhir)}</h3> */}
                    {/* <h3>{tempatWisata}</h3> */}
                    
                </div>
                
                <div className={`container pt-10 m-5 w-full white-shadow rounded-xl ${isSmallDevice ? "px-4" : ""}`}>
                    <h1 className="text-black text-4xl font-sans font-bold">Hasil Rekomendasi :</h1>
                    <div className={`flex flex-wrap ${isSmallDevice ? "justify-center" : ""}`}>
                        <div className={`columns-2 ${isSmallDevice ? "ml-0 gap-20" : "ml-0"}`}>  
                            {recommendations && recommendations.map((recommendation, index) => (
                                <Link to={`/details/${recommendation.Place_ID}`}> 
                                    <RekomendasiCard key={index} recommendation={recommendation.Place_Name} Place_ID={recommendation.Place_ID} />
                                            {/* <RekomendasiCard key={index} recommendation={recommendation.Place_ID} /> */}
                                </Link>
                            ))}
                        </div>
                                
                    </div>
                        
                </div>
        </div>
       
        <Footer/>

        </>
    )
}

export default Rekomendasi