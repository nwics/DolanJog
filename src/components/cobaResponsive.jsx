import * as React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
// import { phone, tablet, laptop, desktop } from "./icons";
import bromo from "../assets/home/bromo.png"
import borobudur from "../assets/home/borobudur.png"
import cliff from "../assets/home/cliff.png"
import Header from "./Header";

export default function  CobaResponsive() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );
//   const isExtraLargeDevice = useMediaQuery(
//     "only screen and (min-width : 1201px)"
//   );

  return (
      
      <section>
        <Header  />
        <h1>useMediaQuery</h1>
        Resize your browser windows to see changes.
        <article>
            <figure className={isSmallDevice ? "active" : ""}>
            <img
            src={bromo}
            alt="" />
            <figcaption>Small</figcaption>
            </figure>
            <figure className={isMediumDevice ? "active" : ""}>
            <img
            src={borobudur}
            alt="" />
            <figcaption>Medium</figcaption>
            </figure>
            <figure className={isLargeDevice ? "active" : ""}>
            <img
            src={cliff}
            alt="" />
            <figcaption>Large</figcaption>
            </figure>
        </article>
    </section>
  );
}