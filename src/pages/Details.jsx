// import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
// import { useEffect, useState } from "react"
// import {wisataData} from "../assets/namaTempatWisata"
import Header from "../components/Header"
import Footer from "../components/Footer"
// import Breadcrumb from './Breadcrumb';
// import borobudur from "../assets/home/borobudur.png"
// import bromo from "../assets/home/bromo.png"
import Container from "../components/Container"
// import cliff from "../assets/home/cliff.png"

// import bank from "../assets/icons/Bank.png"
// import masjid from "../assets/icons/Mosque.png"
// import parkir from "../assets/icons/Parking.png"
// import wc from "../assets/icons/Portable Toilet.png"
// import restoran from "../assets/icons/Restaurant.png"
// import wifi from "../assets/icons/Wi-Fi Logo.png"
import price from "../assets/icons/ticket.png"
import open from "../assets/icons/open.png"
import map from "../assets/icons/map.png"
import pengalaman from "../assets/icons/wine.png"
import aktivitas from "../assets/icons/physical.png"
import liburan from "../assets/icons/beach-chair.png"
import arah from "../assets/icons/directions.png"
import web from "../assets/icons/search-engine.png"

import {wisataData as data} from "../assets/namaTempatWisata"
import BreadCrumbs from "../components/BreadCrumbs"

// async function fetchData(id) {
//     const response = await fetch(`http://localhost:3000/details/${id}`)
//     const data = await response.json()
//     return data
// }

const DetailsPage = () => {
    // // ngambil data id
    // const [detailData, setDetailData] = useState(null)

    // useEffect(() => {
    //     // mencari data berdasarkan id
    //     const cariId = data.find(item => item.id ==id)
    //     setDetailData(cariId);
    // },[id]) 
    const {id} = useParams()
    // const {nama, deskripsi, kategori, harga, location, fasilitas} = detailData;
    
    // const recommendation = require("./Rekomendasi.jsx")
    const idYangDicari = parseInt(id) // ganti dengan id yang Anda cari
    const tempatWisata = data.find(item => item.id === idYangDicari);

    if (tempatWisata) {
        console.log(tempatWisata);
    } else {
        console.log('Tidak ada tempat wisata dengan id tersebut');
        console.log(typeof idYangDicari);
        console.log(typeof id);
        console.log("coba:",tempatWisata);
    }
    // const breadcrumbPaths = ['Homepage', 'Wisata', 'Detail', tempatWisata ? tempatWisata.nama : ''];

    // const {PlaceID} = useParams();
    // const [data, setData] = useState(null)

    // useEffect(() => {
    //     fetchData(PlaceID).then(data => setData(data))
    // }, [PlaceID])
    // if (!data) {
    //     return <div>Loading...</div>;
    //   }
    // ngambil nama tempat wisata dari id
    // const namaWisata = wisataData.find((wisata) => {
    //     return wisata.id === parseInt(PlaceID);
    // });
    // console.log("Cekk ombak :", PlaceID)

    // console.log(this.props)
    

    return (
        <>
            <Header />
            
            <section className="">
             
                {/* ini bagian foto */}
                
                <Container size="lg">
                    <div className=" pt-20">
                        <div className="pt-20 justify-center ">
                            <img className=" mx-auto w-[100px] h-[100px] rounded-xl" 
                            src={tempatWisata.foto[0]} alt="cliff"
                            />

                            <div className="pt-20 mb-10 flex justify-center gap-10">
                                <img className="detail-jpg rounded-xl"
                                src={tempatWisata.foto[1]} alt="cliff"
                                />    
                                {/* <img src="https://lh3.googleusercontent.com/p/AF1QipNJo27IsqEwndb6_EKKKailRjzrm37fTcLVsCZ3=s1360-w1360-h1020" alt=""/> */}
                                <img className="detail-jpg rounded-xl"
                                src={tempatWisata.foto[2]} alt="cliff"
                                />    
                                <img className="detail-jpg rounded-xl"
                                src={tempatWisata.foto[3]} alt="cliff"
                                />    
                                <img className="detail-jpg rounded-xl"
                                src={tempatWisata.foto[4]} alt="cliff"
                                />    
                            </div>
                        </div>
                    </div>

                </Container>
                {/* <div>
                    <h1>{nama}</h1>
                    <h1>{deskripsi}</h1>
                    <h1>
                        <ul>
                            {fasilitas.map((fasilitas, index)=><li key={index}>{fasilitas}</li>)}
                        </ul>
                    </h1>
                </div> */}
                <BreadCrumbs />

                {/* ini bagian deskripsi */}
                <div className=" padding shadow-lg rounded-xl overflow-hidden paddingl paddingr" style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}>
                {/* <Breadcrumb paths={breadcrumbPaths} />  */}
                    <div className="ml-10">
                        <p className="font-bold font-sans text-4xl">{tempatWisata.nama}</p>
                        <p className="flex mt-10">
                            <img src={open} alt="open" width="40px" height="20px"/>
                            everyday : {tempatWisata.jam}
                        </p>
                        <p className="flex">
                            <img src={price} alt="" width="40px" height="20px"/>
                            Harga : {tempatWisata.harga}</p>
                        <div className="font-sans text-xl">
                            <p className="">
                                {tempatWisata.deskripsi}
                            </p>
                        </div>
                    </div>
                </div>

                {/* bagian pengalaman */}
                <div className="mt-10 padding shadow-lg rounded-xl overflow-hidden paddingl paddingr" style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}>
                    <h1 className="text-4xl font-sans font-bold ml-10 ">Nikmati Pengalaman Tak Terlupakan</h1> 
                    <ul className=" flex justify-center gap-10 mt-10">
            
                        <li className="font-sans p-10 flex  gap-10">
                            <img src={liburan} alt="" width="100px" height="30px"/>
                            <div className="flex-col">
                                <h1 className="text-3xl font-semibold">Daya Tarik Utama</h1>
                                <p className="text-3xl">{tempatWisata.aktivitas[0].nama}</p>
                            </div>
                        </li>
                       
                        <li className="font-sans ml-10 flex  gap-10">
                            <img src={pengalaman} alt="" width="100px" height="30px"/>
                            <div className="flex-col">
                                <h1 className="font-bold text-3xl">Pengalaman</h1>
                                <p className=" text-3xl">{tempatWisata.aktivitas[1].nama}</p>
                            </div>
                            
                        </li>
                        <li className="font-sans ml-10 flex  gap-10">
                            <img src={aktivitas} alt="" width="100px" height="30px"/>
                            <div className="flex-col">
                                <h1 className="font-bold text-3xl"> Aktivitas yang Bisa dilakukan</h1>
                                <p className="text-3xl">{tempatWisata.aktivitas[2].nama}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* bagian fasilitas */}
                <div className="padding mt-10 shadow-lg rounded-xl overflow-hidden paddingl paddingr" style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}>
                    <h1 className="text-4xl font-sans font-bold ml-10 ">Fasilitas Utama</h1> 
                    <ul className=" flex justify-center gap-10">
            
                        <li className="font-sans text-2xl font-bold p-10 flex  gap-3">
                            <img src={tempatWisata.fasilitas[0].icon} alt="" width="80px" height="40px"/>
                            <p className="mt5">{tempatWisata.fasilitas[0].nama}</p>
                        </li>
                        <li className="font-sans text-2xl font-bold ml-10 flex  gap-3">
                            <img src={tempatWisata.fasilitas[1].icon} alt="" width="80px" height="40px"/>
                            <p className="mt5">{tempatWisata.fasilitas[1].nama}</p>
                        </li>
                        <li className="font-sans text-2xl font-bold ml-10 flex  gap-3">
                            <img src={arah} alt="" width="80px" height="40px"/>
                            <p className="mt5">Penunjuk Arah</p>
                        </li>
                        <li className="font-sans text-2xl font-bold ml-10 flex  gap-3">
                            <img src={tempatWisata.fasilitas[2].icon} alt="" width="80px" height="40px"/>
                            <p className="mt5">{tempatWisata.fasilitas[2].nama}</p>
                            
                        </li>
                        <li className="font-sans text-2xl font-bold ml-10 flex  gap-3">
                            <img src={tempatWisata.fasilitas[3].icon} alt="" width="80px" height="40px"/>
                            <p className="mt5">{tempatWisata.fasilitas[3].nama}</p>
                        </li>
                        <li className="font-sans text-2xl font-bold ml-10 flex  gap-3">
                            <img src={tempatWisata.fasilitas[4].icon} alt="" width="80px" height="40px"/>
                            
                            <p className="mt5">{tempatWisata.fasilitas[4].nama}</p>
                        </li>
                        
                    </ul>
                </div>

                {/* ini bagian detail lokasi */}
                <div className="mt-10 mb-10 padding shadow-lg rounded-xl overflow-hidden paddingl paddingr" style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}>
                    <h1 className="font-sans font-bold text-4xl">Detail Lokasi</h1>
                    <p className="flex justify-center font-sans font-medium text-heading-3 text-gray-70">   
                        <img src={web} alt="" width="40px" height="20px" />
                        <a href={tempatWisata.web.link}>{tempatWisata.web.title}</a>
                        
                    </p>
                    <p className=" flex justify-center font-sans">
                        <img src={map} alt="" width="40px" height="20px"/>
                            {tempatWisata["detail lokasi"]}
                    </p>
                    <div className="ml-10 flex gap-10 justify-center">
                        <iframe src={tempatWisata.lokasi} 
                        title="myFrame"
                        width="1200" 
                        height="450"
                        style={{
                            border: '2px solid black', 
                            borderRadius: '10px'
                        }}
                        
                        ></iframe>
                        
                        {/* <ul className="justify-center flex gap-10">
                            <h1>Tempat Terdekat</h1>
                            
                            <li className=" font-sans flex-col">
                                <h1>{tempatWisata["detail lokasi"]}</h1>
                                <h1 className=" text-4xl">Tempat Terdekat</h1>
                        
                                <p className="border flex gap-10 marginn">bu dapurs
                                    <p>coba</p>
                                </p>
                                <p className="marginn">bu dapurs</p>
                                <p className="marginn">bu dapurs</p>
                                <p className="marginn">bu dapurs</p>
                            </li>
                            <li className=" font-sans flex-col">
                                <br />
                                <p className="border marginn mt-10 gap-10 flex">Toko supersmart
                                    <p>coba</p>
                                </p>
                                <p className="marginn">Toko supersmart</p>
                                <p className="marginn">Toko supersmart</p>
                                <p className="marginn">Toko supersmart</p>
                            </li>
                            <li className=" font-sans flex-col">
                                <br />
                                <p className="marginn mt-10 flex gap-10 border">Penakturu Hotels
                                    <p>coba</p>
                                </p>
                                <p className="marginn">Penakturu Hotels</p>
                                <p className="marginn">Penakturu Hotels</p>
                                <p className="marginn">Penakturu Hotels</p>
                            </li>
                        </ul> */}
                    </div>
                
            </div>
            </section>
            <Footer />
        </>
    )
}

export default DetailsPage
