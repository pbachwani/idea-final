// "use client";

// import { motion, useScroll, useTransform } from "motion/react";
// import React, { useRef, useState, useEffect } from "react";
// import { BlurIn } from "./ui/BlurIn";

// const PANEL_TOP_PERCENT = 30;
// const MAX_HEIGHT = `${100 - PANEL_TOP_PERCENT}vh`;

// const Hero = () => {
//   const sectionRef = useRef(null);
//   const [displayProgress, setDisplayProgress] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const rawProgress = useRef(0);
//   const rafRef = useRef(null);

//   useEffect(() => {
//     const tick = () => {
//       setDisplayProgress((prev) => {
//         const diff = rawProgress.current - prev;
//         const next = prev + diff * 0.04;
//         return diff < 0.1 ? rawProgress.current : next;
//       });
//       rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, []);

//   useEffect(() => {
//     if (displayProgress >= 99.9 && rawProgress.current >= 100) {
//       setTimeout(() => setIsLoaded(true), 400);
//     }
//   }, [displayProgress]);

//   useEffect(() => {
//     if (document.readyState === "complete") {
//       rawProgress.current = 100;
//       return;
//     }

//     const resources = performance.getEntriesByType("resource");
//     const total = Math.max(resources.length, 1);
//     let loaded = 0;

//     const observer = new PerformanceObserver((list) => {
//       loaded += list.getEntries().length;
//       rawProgress.current = Math.min(Math.round((loaded / total) * 100), 99);
//     });

//     observer.observe({ entryTypes: ["resource"] });

//     const onLoad = () => {
//       observer.disconnect();
//       rawProgress.current = 100;
//     };

//     window.addEventListener("load", onLoad);
//     return () => {
//       observer.disconnect();
//       window.removeEventListener("load", onLoad);
//     };
//   }, []);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   const behindY = useTransform(scrollYProgress, [0, 0.5], ["110%", "0%"]);
//   const blackY = useTransform(scrollYProgress, [0.4, 1], ["0px", "-900px"]);
//   const textColor = useTransform(
//     scrollYProgress,
//     [0.2, 0.5],
//     ["#000000", "#ffffff"],
//   );

//   const panelHeight = `calc(${displayProgress / 100} * ${MAX_HEIGHT})`;

//   return (
//     <section ref={sectionRef} className="relative h-[150vh]">
//       <div className="sticky top-0 h-screen overflow-hidden">
//         {/* LOADER PANEL */}
//         {!isLoaded && (
//           <div
//             className="absolute bottom-0 left-0 w-full bg-[#1a1a1a] z-10"
//             style={{ height: panelHeight, transition: "none" }}
//           >
//             <div className="absolute -top-8 left-6 lg:left-10 font-mono text-sm tracking-widest text-black select-none">
//               {String(Math.floor(displayProgress)).padStart(3, "0")}%
//             </div>
//           </div>
//         )}

//         {/* HERO PANEL */}
//         {isLoaded && (
//           <motion.div
//             style={{ y: blackY }}
//             className="absolute top-[30%] left-0 w-full h-[200vh] bg-[#1a1a1a] z-10"
//           />
//         )}

//         {/* TEXT */}
//         {isLoaded && (
//           <div className="relative w-full px-6 lg:px-10 pt-24 lg:pt-28 z-20">
//             {/* ── MOBILE + TABLET (< lg) ── */}
//             <div className="flex flex-col gap-8 lg:hidden">
//               <div className="flex items-baseline gap-3 overflow-visible">
//                 <BlurIn delay={0}>
//                   <motion.h1
//                     style={{ color: textColor }}
//                     className="leading-none tracking-tight"
//                     // clamp fits "Idea Behind" on one line from 320px → 1023px
//                     sx={{ fontSize: "clamp(2.4rem, 9vw, 5rem)" }}
//                   >
//                     Idea
//                   </motion.h1>
//                 </BlurIn>
//                 <BlurIn delay={0.15}>
//                   <motion.h1
//                     style={{
//                       y: behindY,
//                       color: textColor,
//                       fontSize: "clamp(2.4rem, 9vw, 5rem)",
//                     }}
//                     className="leading-none tracking-tight"
//                   >
//                     Behind
//                   </motion.h1>
//                 </BlurIn>
//               </div>

//               <BlurIn delay={0.7}>
//                 <motion.p
//                   style={{ color: textColor }}
//                   className="text-sm leading-[1.3] tracking-tight max-w-sm"
//                 >
//                   We blend strategy, design, and development to create fast,
//                   interactive, and visually refined websites that leave a
//                   lasting impression.
//                 </motion.p>
//               </BlurIn>

//               <BlurIn delay={0.9}>
//                 <motion.p
//                   style={{ color: textColor }}
//                   className="text-sm leading-[1.3] tracking-tight max-w-sm"
//                 >
//                   For brands whose presence hasn&apos;t caught up to what
//                   they&apos;ve built.
//                 </motion.p>
//               </BlurIn>
//             </div>

//             {/* ── DESKTOP (lg+) ── */}
//             <div className="hidden lg:grid grid-cols-12 items-baseline">
//               <div className="col-span-6">
//                 <div className="flex items-baseline gap-6 overflow-visible translate-y-8">
//                   <BlurIn delay={0}>
//                     <motion.h1
//                       style={{ color: textColor }}
//                       className="text-9xl leading-none tracking-tight"
//                     >
//                       Idea
//                     </motion.h1>
//                   </BlurIn>
//                   <BlurIn delay={0.15}>
//                     <motion.h1
//                       style={{ y: behindY, color: textColor }}
//                       className="text-9xl leading-none tracking-tight"
//                     >
//                       Behind
//                     </motion.h1>
//                   </BlurIn>
//                 </div>
//               </div>

//               <BlurIn delay={0.7} className="col-span-4">
//                 <motion.p
//                   style={{ color: textColor }}
//                   className="max-w-sm text-lg leading-[1.1] tracking-tight"
//                 >
//                   We blend strategy, design, and development to create fast,
//                   interactive, and visually refined websites that leave a
//                   lasting impression.
//                 </motion.p>
//               </BlurIn>

//               <BlurIn delay={0.9} className="col-span-2 flex justify-end">
//                 <motion.p
//                   style={{ color: textColor }}
//                   className="max-w-45 text-lg leading-[1.1] tracking-tight"
//                 >
//                   For brands whose presence hasn&apos;t caught up to what
//                   they&apos;ve built.
//                 </motion.p>
//               </BlurIn>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Hero;
