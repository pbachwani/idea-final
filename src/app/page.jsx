"use client";

import Hero from "@/components/Hero";
import SpotlightGallery from "@/components/ui/SpotlightGallery";

import React, { useEffect } from "react";

import { useLoading } from "./contexts/LoadingContext";
import { useMediaQuery } from "react-responsive";
import ScrambleRevealText from "@/components/ui/ScrambleRevealText";
import BlurFocusRevealText from "@/components/ui/BlurFocusRevealText";
import Process from "@/components/Process";

const Home = () => {
  const { isLoading } = useLoading();
  let isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  if (isDesktop)
    return (
      <div>
        {!isLoading && (
          <>
            <Hero />
            <SpotlightGallery />
            <Process />
          </>
        )}
      </div>
    );

  return (
    <div>
      <Hero />
      <SpotlightGallery />
      <Process />
    </div>
  );

  // return (
  //   <>
  //     {isDesktop ? (
  //       <div>
  //         {!isLoading && (
  //           <>
  //             <Hero />
  //             <SpotlightGallery />
  //           </>
  //         )}
  //       </div>
  //     ) : (
  //       <div>
  //         <Hero />
  //         <SpotlightGallery />
  //       </div>
  //     )}
  //   </>
  // );
};

export default Home;
{
  /* <section className="w-full h-full min-h-screen">
                <iframe
                  src="https://colorflow-embed.b-cdn.net/embed.html#e=8EZ1HTmW"
                  // width="1600"
                  // height="1200"
                  frameborder="0"
                  className="w-full h-screen"
                ></iframe>
              </section> */
}
