// "use client";
// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";

// gsap.registerPlugin(ScrollTrigger);

// const PROJECTS = [
//   { name: "Human Form Study", image: "/img1.png" },
//   { name: "Interior Light", image: "/img1.png" },
//   { name: "Project 21", image: "/img1.png" },
//   { name: "Shadow Portraits", image: "/img1.png" },
//   { name: "Everyday Objects", image: "/img1.png" },
//   { name: "Unit 07 Care", image: "/img1.png" },
//   { name: "Motion Practice", image: "/img1.png" },
//   { name: "Noonlight Series", image: "/img1.png" },
//   { name: "Material Stillness", image: "/img1.png" },
//   { name: "Quiet Walk", image: "/img1.png" },
// ];

// export default function SpotlightGallery() {
//   const spotlightRef = useRef(null);
//   const projectIndexRef = useRef(null);
//   const projectImgsRef = useRef([]);
//   const projectImagesContainerRef = useRef(null);
//   const projectNamesRef = useRef([]);
//   const projectNamesContainerRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState("01");

//   useEffect(() => {
//     const lenis = new Lenis();
//     lenis.on("scroll", ScrollTrigger.update);
//     gsap.ticker.add((time) => {
//       lenis.raf(time * 1000);
//     });
//     gsap.ticker.lagSmoothing(0);

//     const spotlightSection = spotlightRef.current;
//     const projectIndex = projectIndexRef.current;
//     const projectImgs = projectImgsRef.current;
//     const projectImagesContainer = projectImagesContainerRef.current;
//     const projectNames = projectNamesRef.current;
//     const projectNamesContainer = projectNamesContainerRef.current;
//     const totalProjectCount = PROJECTS.length;

//     const spotlightSectionHeight = spotlightSection.offsetHeight;
//     const spotlightSectionPadding = parseFloat(
//       getComputedStyle(spotlightSection).padding,
//     );
//     const projectIndexHeight = projectIndex.offsetHeight;
//     const containerHeight = projectNamesContainer.offsetHeight;
//     const imagesHeight = projectImagesContainer.offsetHeight;

//     const moveDistanceIndex =
//       spotlightSectionHeight - spotlightSectionPadding * 2 - projectIndexHeight;

//     // text move distance
//     const moveDistanceNames =
//       spotlightSectionHeight -
//       spotlightSectionPadding * 2 -
//       containerHeight -
//       40;

//     const moveDistanceImages = window.innerHeight - imagesHeight;

//     const imgActivationThreshold = window.innerHeight / 2;

//     const scrollTrigger = ScrollTrigger.create({
//       trigger: ".spotlight",
//       start: "top top",
//       end: `+=${window.innerHeight * 5}px`,
//       pin: true,
//       pinSpacing: true,
//       scrub: 1,
//       onUpdate: (self) => {
//         const progress = self.progress;
//         const newIndex = Math.min(
//           Math.floor(progress * totalProjectCount) + 1,
//           totalProjectCount,
//         );

//         setCurrentIndex(
//           `${String(newIndex).padStart(2, "0")}/${String(totalProjectCount).padStart(2, "0")}`,
//         );

//         gsap.set(projectIndex, {
//           y: progress * moveDistanceIndex,
//         });

//         gsap.set(projectImagesContainer, {
//           y: progress * moveDistanceImages,
//         });

//         projectImgs.forEach((img) => {
//           const imgRect = img.getBoundingClientRect();
//           const imgTop = imgRect.top;
//           const imgBottom = imgRect.bottom;

//           if (
//             imgTop <= imgActivationThreshold &&
//             imgBottom >= imgActivationThreshold
//           ) {
//             gsap.set(img, {
//               opacity: 1,
//             });
//           } else {
//             gsap.set(img, {
//               opacity: 0.5,
//             });
//           }
//         });

//         projectNames.forEach((p, index) => {
//           const startProgress = index / totalProjectCount;
//           const endProgress = (index + 1) / totalProjectCount;
//           const projectProgress = Math.max(
//             0,
//             Math.min(
//               1,
//               (progress - startProgress) / (endProgress - startProgress),
//             ),
//           );

//           gsap.set(p, {
//             y: -projectProgress * moveDistanceNames,
//           });

//           if (projectProgress > 0 && projectProgress < 1) {
//             gsap.set(p, {
//               color: "#DA7900",
//               //   color: "#fff",
//               //   fontSize: "28px",
//             });
//           } else {
//             gsap.set(p, {
//               color: "#000",
//               //   fontSize: "18px",
//             });
//           }
//         });
//       },
//     });

//     return () => {
//       scrollTrigger.kill();
//       gsap.ticker.remove((time) => {
//         lenis.raf(time * 1000);
//       });
//       lenis.destroy();
//     };
//   }, []);

//   return (
//     <section
//       ref={spotlightRef}
//       className="spotlight relative w-full h-screen p-8 overflow-hidden"
//       //   bg-[#ebebeb]
//     >
//       {/* <div className="absolute h-px w-full bg-white top-1/2 -translate-y-1/2 -z-10" /> */}
//       <div className="project-index">
//         <h1
//           ref={projectIndexRef}
//           className="text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight text-black -z-10"
//         >
//           {currentIndex}
//         </h1>
//       </div>

//       <div
//         ref={projectImagesContainerRef}
//         className="project-images absolute top-0 left-1/2 -translate-x-1/2 w-[35%] py-[50svh] flex flex-col gap-2 z-0"
//       >
//         {PROJECTS.map((project, idx) => (
//           <div
//             key={idx}
//             ref={(el) => {
//               if (el) projectImgsRef.current[idx] = el;
//             }}
//             className="project-img w-full aspect-video opacity-50 transition-all duration-300 overflow-hidden"
//           >
//             <img
//               src={project.image}
//               alt=""
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       <div
//         ref={projectNamesContainerRef}
//         className="project-names absolute right-8 bottom-4 flex flex-col items-end z-10"
//       >
//         {PROJECTS.map((project, idx) => (
//           <p
//             key={idx}
//             ref={(el) => {
//               if (el) projectNamesRef.current[idx] = el;
//             }}
//             className="text-2xl font-medium leading-tight text-[#ffffff] transition-colors duration-300"
//           >
//             {project.name}
//           </p>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { name: "Human Form Study", image: "/img1.png" },
  { name: "Interior Light", image: "/img1.png" },
  { name: "Project 21", image: "/img1.png" },
  { name: "Shadow Portraits", image: "/img1.png" },
  { name: "Everyday Objects", image: "/img1.png" },
  { name: "Unit 07 Care", image: "/img1.png" },
  { name: "Motion Practice", image: "/img1.png" },
  { name: "Noonlight Series", image: "/img1.png" },
  { name: "Material Stillness", image: "/img1.png" },
  { name: "Quiet Walk", image: "/img1.png" },
];

export default function SpotlightGallery() {
  const spotlightRef = useRef(null);
  const projectIndexRef = useRef(null);
  const projectImgsRef = useRef([]);
  const projectImagesContainerRef = useRef(null);
  const projectNamesRef = useRef([]);
  const projectNamesContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState("01");

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const spotlightSection = spotlightRef.current;
    const projectIndex = projectIndexRef.current;
    const projectImgs = projectImgsRef.current;
    const projectImagesContainer = projectImagesContainerRef.current;
    const projectNames = projectNamesRef.current;
    const projectNamesContainer = projectNamesContainerRef.current;
    const totalProjectCount = PROJECTS.length;

    const spotlightSectionHeight = spotlightSection.offsetHeight;
    const spotlightSectionPadding = parseFloat(
      getComputedStyle(spotlightSection).padding,
    );
    const projectIndexHeight = projectIndex.offsetHeight;
    const containerHeight = projectNamesContainer.offsetHeight;
    const imagesHeight = projectImagesContainer.offsetHeight;

    const moveDistanceIndex =
      spotlightSectionHeight - spotlightSectionPadding * 2 - projectIndexHeight;

    // text move distance
    const moveDistanceNames =
      spotlightSectionHeight -
      spotlightSectionPadding * 2 -
      containerHeight -
      80;

    const moveDistanceImages = window.innerHeight - imagesHeight;

    const imgActivationThresholdTop = window.innerHeight * 0.5;
    const imgActivationThresholdBottom = window.innerHeight * 0.5;

    const scrollTrigger = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const newIndex = Math.min(
          Math.floor(progress * totalProjectCount) + 1,
          totalProjectCount,
        );

        setCurrentIndex(
          `${String(newIndex).padStart(2, "0")}/${String(totalProjectCount).padStart(2, "0")}`,
        );

        gsap.set(projectIndex, {
          y: progress * moveDistanceIndex,
        });

        gsap.set(projectImagesContainer, {
          y: progress * moveDistanceImages,
        });

        projectImgs.forEach((img) => {
          const imgRect = img.getBoundingClientRect();
          const imgTop = imgRect.top;
          const imgBottom = imgRect.bottom;

          if (
            imgTop <= imgActivationThresholdTop &&
            imgBottom >= imgActivationThresholdBottom
          ) {
            gsap.set(img, {
              opacity: 1,
            });
          } else {
            gsap.set(img, {
              opacity: 0.5,
            });
          }
        });

        projectNames.forEach((p, index) => {
          const startProgress = index / totalProjectCount;
          const endProgress = (index + 1) / totalProjectCount;
          const projectProgress = Math.max(
            0,
            Math.min(
              1,
              (progress - startProgress) / (endProgress - startProgress),
            ),
          );

          gsap.set(p, {
            y: -projectProgress * moveDistanceNames,
          });

          if (projectProgress > 0 && projectProgress < 1) {
            gsap.set(p, {
              color: "#DA7900",
              //   color: "#fff",
              //   fontSize: "28px",
            });
          } else {
            gsap.set(p, {
              color: "#000",
              //   fontSize: "18px",
            });
          }
        });
      },
    });

    return () => {
      scrollTrigger.kill();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={spotlightRef}
      className="spotlight relative w-full h-full px-8 overflow-visible"
    >
      {/* <div className="absolute h-px w-full bg-white top-1/2 -translate-y-1/2 -z-10" /> */}
      <div className="project-index">
        <h1
          ref={projectIndexRef}
          className="text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight text-black -z-10"
        >
          {currentIndex}
        </h1>
      </div>

      <div
        ref={projectImagesContainerRef}
        className="project-images absolute top-0 left-1/2 -translate-x-1/2 w-[35%] py-[50dvh] flex flex-col gap-2 z-0 bg-red-300/0"
      >
        {PROJECTS.map((project, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) projectImgsRef.current[idx] = el;
            }}
            className="project-img w-full aspect-video opacity-50 transition-all duration-300 overflow-hidden"
          >
            <img
              src={project.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div
        ref={projectNamesContainerRef}
        className="project-names absolute right-8 bottom-4 flex flex-col items-end z-10"
      >
        {PROJECTS.map((project, idx) => (
          <p
            key={idx}
            ref={(el) => {
              if (el) projectNamesRef.current[idx] = el;
            }}
            className="text-2xl font-medium leading-tight text-[#ffffff] transition-colors duration-300"
          >
            {project.name}
          </p>
        ))}
      </div>
    </section>
  );
}
