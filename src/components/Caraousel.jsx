import React from "react";
import 'react-multi-carousel/lib/styles.css';
import CardCaraousel from "./CardCarousel";
import Carousel from "react-multi-carousel";
import LeftArrow from '../assets/icons/left-arrow-rounded.svg'
import RightArrow from '../assets/icons/right-arrow-rounded.svg'
// import styles from '../components/BackgrundCarousel.module.css'
import Container from "./Container";
import { wisataData } from "../assets/namaTempatWisata";
import { useMediaQuery } from "@uidotdev/usehooks";
const SlideCaraousel = () => {
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const topTempatWisata = wisataData.slice(0,8)
    // console.log((topTempatWisata))
    return (
        <section className={`bg-primary-blue ${isSmallDevice ? "py-5" : ""}`}>
            <Container>

                <h1 className={`font-sans font-bold text-white ${isSmallDevice ? "text-heading-4" : "text-heading-2"}`}>
                    Kategori Liburan
                </h1>
                {/* <CardCaraousel /> */}
                
                <Carousel 
                    className="py-5"
                    containerClass="carousel-container"
                    arrows
                    centerMode={false}
                    draggable
                    swipeable
                    customRightArrow={
                        <button className="absolute z-50 right-0 opacity-0 hover:opacity-100" type="button" aria-label="Go To next slide">
                            <img
                                src={RightArrow}
                                alt="Right Arrow"
                                className={isSmallDevice ? "h-[40px] w-[40px]" : "h-[75px] w-[75px]"}
                            />
                        </button>
                    }
                    customLeftArrow={
                        <button className="absolute left-0 z-50 opacity-50 hover:opacity-100" type="button" aria-label="Go To Previous slide">
                            <img
                                src={LeftArrow}
                                alt="Left Arrow"
                                className={isSmallDevice ? "h-[40px] w-[40px]" : "h-[75px] w-[75px]"}
                            />
                        </button>
                    }
                    partialVisbile
                    responsive={
                        {
                            desktop: {
                                breakpoint: {
                                    max:3000,
                                    min: 720,
                                },
                                items: 2,
                                partialVisibilityGutter: 100,
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 720,
                                },
                                items: 2,
                                partialVisibilityGutter: 50,
                            },
                            mobile: {
                                breakpoint: {
                                    max: 720,
                                    min: 0,
                                },
                                items: 1,
                                partialVisibilityGutter: 30,
                            },
                        }
                    }
                    >
                        {topTempatWisata.map((item,index)=>(
                            item && item.nama && item.foto && item.foto.length > 0 ? (

                                <CardCaraousel 
                                key={index}
                                prop={item}
                            
                               />
                            ) : null

                        ))}
                    
                        

                </Carousel>
            </Container>
        </section>
    )
}


export default SlideCaraousel