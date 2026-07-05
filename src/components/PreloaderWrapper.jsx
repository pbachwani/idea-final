"use client";
import { useState, useEffect } from "react";

import { LoadingProvider } from "@/app/contexts/LoadingContext";
import Preloader from "./Preloader";
import { motion } from "motion/react";

export default function PreloaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const showPreloader = !isLoading;

  useEffect(() => {
    if (isLoading) {
      // Disable scroll
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      // Enable scroll
      document.body.style.overflow = "unset";
    }

    return () => {
      // Cleanup
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <LoadingProvider isLoading={isLoading}>
      <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />
      {children}
    </LoadingProvider>
  );
}
