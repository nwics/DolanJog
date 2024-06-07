import React from "react";
import 'react-multi-carousel/lib/styles.css';
import CardCaraousel from "./CardCarousel";
import Carousel from "react-multi-carousel";
import LeftArrow from '../assets/icons/left-arrow-rounded.svg'
import RightArrow from '../assets/icons/right-arrow-rounded.svg'
// import styles from '../components/BackgrundCarousel.module.css'
import Container from "./Container";
import { wisataData } from "../assets/namaTempatWisata";

const SlideCaraousel = () => {

    const topTempatWisata = wisataData.slice(0,8)
    // console.log((topTempatWisata))
    return (
        <section className=" bg-primary-blue">
            <Container>

                <h1 className="text-heading-2 text-white font-sans font-bold ">
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
                                className="h-[75px] w-[75px]"
                            />
                        </button>
                    }
                    customLeftArrow={
                        <button className="absolute left-0 z-50 opacity-50 hover:opacity-100" type="button" aria-label="Go To Previous slide">
                            <img
                                src={LeftArrow}
                                alt="Left Arrow"
                                className="h-[75px] w-[75px]"
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