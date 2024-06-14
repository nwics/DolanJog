import Caraousel from "../components/Caraousel";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer"
import Caraousel2 from "../components/Carousel2";
import FAQ from "../components/faq/faqQuestion"
import CuacaWidget from "../components/CuacaWidget";
// import BreadCrumbs from "../components/BreadCrumbs";
// import styles from "./Home.module.css"
// import { useState, useEffect } from "react";


const Home = () => {    

    return (
        <>
        <Header/>
        <Hero/>
        {/* <BreadCrumbs/> */}
        <Caraousel/>
        <Caraousel2/>
        <CuacaWidget />
        <FAQ/>
        <Footer />
        {/* <h1>Ini adalah H1</h1> */}
        
        
        </>
    )
}


export default Home