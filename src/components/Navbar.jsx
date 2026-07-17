"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import TextType from "./ui/TextType";

const Navbar = () => {
  const [time, setTime] = useState("");
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, {
    stiffness: 120,
    damping: 20,
  });
  const rotate = useTransform(smoothScroll, (value) => value * 0.08);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed w-full my-5 bg-none flex  justify-between sm:px-10 px-4 h-7 items-center z-50"
        >
          <div className="flex gap-2 text-lg items-center">
            <div>
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  style={{
                    rotate,
                  }}
                  d="M5.75004 7.87154C3.43741 11.1861 3.75987 15.7809 6.71741 18.7384C10.0369 22.0579 15.4188 22.0579 18.7382 18.7384C22.0577 15.4189 22.0577 10.037 18.7382 6.71759C15.7807 3.76005 11.1859 3.43759 7.87136 5.75022"
                  stroke="#da7900"
                  strokeLinecap="round"
                />
                <path
                  d="M12.728 8.72754L12.728 16.7275"
                  stroke="#da7900"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M16.728 12.7275L8.72803 12.7275"
                  stroke="#da7900"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* <p className="max-sm:hidden">Menu</p> */}
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-xl font-bold">
            Idea Behind
          </div>

          <div className="flex gap-2.5 uppercase w-full justify-end">
            <div className="hidden md:block">
              <TextType
                text={[
                  "Temporary website",
                  "taking projects for q3' 2026",
                  "website launching soon",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                deletingSpeed={50}
                cursorBlinkDuration={0.5}
              />
            </div>

            <p className="text-accent">{time}</p>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
