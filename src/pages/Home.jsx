import Caraousel from "../components/Caraousel";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer"
import Caraousel2 from "../components/Carousel2";
// import BreadCrumbs from "../components/BreadCrumbs";


const Home = () => {
    return (
        <>
        <Header/>
        <Hero/>
        {/* <BreadCrumbs/> */}
        <Caraousel/>
        <Caraousel2/>
        <Footer />
        {/* <h1>Ini adalah H1</h1> */}
        
        
        </>
    )
}


export default Home