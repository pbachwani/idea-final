"use client";

import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { BlurIn } from "./ui/BlurIn";
import { useLoading } from "@/app/contexts/LoadingContext";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import ScrambleRevealText from "./ui/ScrambleRevealText";
import BlurFocusRevealText from "./ui/BlurFocusRevealText";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { isLoading } = useLoading();
  const [shouldShowText, setShouldShowText] = useState(false);
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);

  // useEffect(() => {
  //   if (!backgroundRef.current) return;
  //   console.log("changing");
  //   gsap.to(backgroundRef.current, {
  //     scrollTrigger: {
  //       trigger: backgroundRef.current,
  //       start: "10% top",
  //       end: "center 20%",
  //       scrub: true,
  //       // markers: true,
  //     },
  //     // y: "-100%",
  //     backgroundColor: "#ebebeb",
  //     ease: "circ.in",
  //   });
  // }, []);

  // Delay showing text until 200ms after loading completes
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShouldShowText(true), 100);
      return () => clearTimeout(timer);
    }
    console.log(isLoading);
  }, [isLoading]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const behindY = useTransform(scrollYProgress, [0, 0.5], ["110%", "0%"]);
  const blackY = useTransform(scrollYProgress, [0.4, 1], ["0px", "-900px"]);

  const behindColor = useTransform(
    scrollYProgress,
    [0.12, 0.32],
    ["#fff", "#fff"],
  );

  const textColorMobile = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    ["#1a1a1a", "#ffffff"],
  );
  const textColor = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    ["#1a1a1a", "#ffffff"],
  );

  return (
    <section ref={sectionRef} className="relative h-[150vh] bg-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* HERO PANEL */}
        <motion.div
          ref={backgroundRef}
          style={{ y: blackY }}
          className={`absolute top-[30%] left-0 w-full h-[200vh] z-10 bg-background will-change-auto`}
          // ${!isLoading ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]"}
        >
          {/* <div className="w-full h-full bg-background flex justify-end items-center text-white">
            Some text
          </div> */}
        </motion.div>

        {/* TEXT */}
        {shouldShowText && (
          <div className="relative w-full px-6 xl:px-10 max-lg:top-[23%] lg:pt-32 z-20 h-full max-h-svh">
            {/*  max-xl:top-[23%] */}
            {/* ── MOBILE + TABLET (< xl) ── */}
            <div className="lg:hidden flex flex-col h-full justify-start gap-40">
              {/* Heading */}
              <div className="flex items-baseline gap-2">
                <BlurIn delay={0}>
                  <motion.h1
                    style={{ color: textColor }}
                    className="text-5xl sm:text-7xl leading-none tracking-tight"
                  >
                    Idea
                  </motion.h1>
                </BlurIn>
                <BlurIn delay={0.15}>
                  <motion.h1
                    style={{ y: behindY, color: behindColor }}
                    className="text-5xl sm:text-7xl leading-none tracking-tight"
                  >
                    Behind
                  </motion.h1>
                </BlurIn>
              </div>

              {/* Description text stacked below */}
              <div className="flex flex-col md:flex-row gap-10 text-justify">
                <BlurIn delay={0.4}>
                  {/* <motion.p
                    style={{ color: textColorMobile }}
                    className="text-xl leading-normal tracking-tight "
                  >
                    We blend{" "}
                    <span className="text-accent">
                      strategy, design, and development
                    </span>{" "}
                    to create fast, interactive, and visually refined websites
                    that leave a lasting impression.
                  </motion.p> */}
                  <motion.p
                    style={{ color: textColorMobile }}
                    className="text-xl leading-normal tracking-tight "
                  >
                    We combine{" "}
                    <span className="text-accent">strategy and design</span> to{" "}
                    <span className="text-accent">develop</span> highly
                    interactive websites that resonate long after the click.
                  </motion.p>
                </BlurIn>

                {/* <BlurIn delay={0.5}>
                  <motion.p
                    style={{ color: textColorMobile }}
                    className="text-xl leading-normal tracking-tight md:hidden"
                  >
                    <span className="text-amber-500">For creatives </span> and
                    brands whose presence hasn&apos;t caught up to what
                    they&apos;ve built.
                  </motion.p>
                </BlurIn> */}
              </div>
            </div>

            {/* ── DESKTOP (xl+) ── */}
            <div className="hidden lg:grid grid-cols-12 items-baseline">
              <div className="col-span-6">
                {/* Name */}
                <div className="flex items-baseline gap-4 overflow-visible translate-y-8">
                  <BlurIn delay={0}>
                    <motion.h1
                      style={{ color: textColor }}
                      className="text-9xl leading-none tracking-tight"
                    >
                      Idea
                    </motion.h1>
                  </BlurIn>
                  <BlurIn delay={0.15}>
                    <motion.h1
                      style={{ y: behindY, color: behindColor }}
                      className="text-9xl leading-none tracking-tight"
                    >
                      Behind
                    </motion.h1>
                  </BlurIn>
                </div>
              </div>

              <div className="col-span-2" />
              {/* additional text */}
              <BlurIn delay={0.3} className="col-span-4 -translate-y-4">
                {/* <motion.p
                  style={{ color: textColor }}
                  className="max-w-sm text-lg leading-[1.1] tracking-tight"
                >
                  We blend{" "}
                  <span className="text-accent">
                    strategy, design, and development
                  </span>{" "}
                  to create fast, interactive, and visually refined websites
                  that leave a lasting impression.
                </motion.p> */}
                <motion.p
                  style={{ color: textColor }}
                  className="max-w-sm text-xl leading-[1.1] tracking-tight text-justify"
                >
                  We combine{" "}
                  <span className="text-accent">strategy and design</span> to{" "}
                  <span className="text-accent">develop</span> highly
                  interactive websites that resonate long after the click.
                </motion.p>
              </BlurIn>

              {/* <BlurIn
                delay={0.9}
                className="col-span-2 flex justify-end -translate-y-4"
              >
                <motion.p
                  style={{ color: textColor }}
                  className="max-w-45 text-lg leading-[1.1] tracking-tight"
                >
                  <span className="text-amber-500">For creatives </span> and
                  brands whose presence hasn&apos;t caught up to what
                  they&apos;ve built.
                </motion.p>
              </BlurIn> */}
            </div>
          </div>
        )}
      </div>

      {/* <ScrambleRevealText /> */}
      <BlurFocusRevealText />

      {/* <div className="max-lg:hidden absolute bottom-0 w-full bg-blue-400/0 h-[40svh]">
        <div className="w-full h-full flex justify-center items-center">
          <motion.p
            style={{ color: textColor }}
            className="text-3xl leading-[1.1] tracking-tight"
          >
            For brands and creatives ready to build a digital presence that
            reflects who they truly are.
          </motion.p>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
