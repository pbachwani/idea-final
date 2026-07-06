"use client";

import Hero from "@/components/Hero";
import SpotlightGallery from "@/components/ui/SpotlightGallery";

import React, { useEffect } from "react";

import { useLoading } from "./contexts/LoadingContext";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const { isLoading } = useLoading();
  let isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <>
      {isDesktop ? (
        <div className={`bg-[#ebebeb]`}>
          {!isLoading && (
            <>
              <Hero />
              <SpotlightGallery />
            </>
          )}
        </div>
      ) : (
        <div
          className={`bg-foreground flex flex-col transition-all duration-200 ease-out `}
        >
          <Hero />
          <SpotlightGallery />
        </div>
      )}
    </>
  );
};

export default Home;
