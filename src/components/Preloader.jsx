"use client";

import { AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";

const PANEL_TOP_PERCENT = 30;
const MAX_HEIGHT = `${100 - PANEL_TOP_PERCENT}vh`;

const Preloader = ({ isLoading, setIsLoading }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const rawProgress = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      setDisplayProgress((prev) => {
        const diff = rawProgress.current - prev;
        const next = prev + diff * 0.04;
        return diff < 0.1 ? rawProgress.current : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (displayProgress >= 99.9 && rawProgress.current >= 100) {
      setTimeout(() => setIsLoading(false), 400);
    }
    // console.log(isLoading);
  }, [displayProgress, setIsLoading]);

  useEffect(() => {
    if (document.readyState === "complete") {
      rawProgress.current = 100;
      return;
    }

    const resources = performance.getEntriesByType("resource");
    const total = Math.max(resources.length, 1);
    let loaded = 0;

    const observer = new PerformanceObserver((list) => {
      loaded += list.getEntries().length;
      rawProgress.current = Math.min(Math.round((loaded / total) * 100), 99);
    });

    observer.observe({ entryTypes: ["resource"] });

    const onLoad = () => {
      observer.disconnect();
      rawProgress.current = 100;
    };

    window.addEventListener("load", onLoad);
    return () => {
      observer.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  const panelHeight = `calc(${displayProgress / 100} * ${MAX_HEIGHT})`;

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 h-screen overflow-hidden z-50 bg-[#ebebeb]">
          <div
            className="absolute bottom-0 left-0 w-full bg-[#1a1a1a]"
            style={{ height: panelHeight, transition: "none" }}
          >
            <div className="absolute -top-8 left-6 xl:left-10 font-mono text-sm tracking-widest text-black select-none">
              {String(Math.floor(displayProgress)).padStart(3, "0")}%
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
