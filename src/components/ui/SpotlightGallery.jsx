"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Off Topic Media Lab",
    image: "/img1.png",
    video: "/media/offtopic/offtopic.mp4",
    storage: "https://idea-behind.b-cdn.net/project-videos/offtopic.mp4",
    link: "https://offtopicmedialab.com/",
  },
  {
    name: "Ground Glass",
    image: "/img1.png",
    video: "/media/ground-glass/groundglass.mp4",
    storage: "https://idea-behind.b-cdn.net/project-videos/groundglass.mp4",
    link: "https://ground.glass/",
  },
  {
    name: "Khasak Films",
    image: "/img1.png",
    video: "/media/khasak-films/khasak-main-video.mp4",
    storage:
      "https://idea-behind.b-cdn.net/project-videos/khasak-main-video.mp4",
    link: "https://khasakfilms.com/",
  },
  {
    name: "Vishal Vittal",
    image: "/img1.png",
    video: "/media/vishal-vittal/vv1.mov",
    storage: "https://idea-behind.b-cdn.net/project-videos/vv-home.mp4",
    link: "https://vishalvittal.com/",
  },
  {
    name: "Story of being",
    image: "/media/sob/sob-homepage.png",
    video: "/media/sob/sob-homepage.mp4",
    storage: "https://idea-behind.b-cdn.net/project-videos/sob-homepage.mp4",
    link: "https://storyofbeing.in/",
  },
  {
    name: "Cinta Kids",
    image: "/media/cinta-kids/homepage.png",
    video: "/media/cinta-kids/cintakids.mp4",
    storage: "https://idea-behind.b-cdn.net/project-videos/cintakids.mp4",
    link: "https://cintakids.com/",
  },
  // { name: "Wedding Invite", image: "/img1.png" },
  // { name: "Tatvam Jaipur", image: "/img1.png" },
];

export default function SpotlightGallery() {
  const spotlightRef = useRef(null);
  const projectIndexRef = useRef(null);
  const projectImgsRef = useRef([]);
  const imgElsRef = useRef([]);
  const videoElsRef = useRef([]);
  const projectImagesContainerRef = useRef(null);
  const projectNamesRef = useRef([]);
  const projectNamesContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState("01");
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  // video pauses if not visible on page
  useEffect(() => {
    const videos = videoElsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay may be blocked by the browser
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    videos.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videos.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);
  // video pause logic end

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
      // pinSpacing: true,
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
          opacity: progress >= 0.9 ? 0 : 1,
          ease: "power1.out",
        });

        // console.log(progress);

        gsap.set(projectImagesContainer, {
          y: progress * moveDistanceImages,
        });

        projectImgs.forEach((container) => {
          const imgRect = container.getBoundingClientRect();
          const imgTop = imgRect.top;
          const imgBottom = imgRect.bottom;

          const imgEl = container.querySelector("img");
          const videoEl = container.querySelector("video");

          if (!imgEl && !videoEl) return;

          // --- Video handling ---
          if (videoEl) {
            if (
              imgTop <= imgActivationThresholdTop &&
              imgBottom >= imgActivationThresholdBottom
            ) {
              gsap.set(container, {
                scale: isDesktop ? 1.5 : 1.1,
                zIndex: 10,
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.set(videoEl, {
                filter: "grayscale(0) brightness(1)",
                duration: 0.3,
                ease: "power2.out",
              });
            } else {
              gsap.set(container, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.set(videoEl, {
                filter: "grayscale(0.7) brightness(0.6)",
                duration: 0.3,
                ease: "power2.out",
              });
            }
            return; // container has a video, we're done with it
          }

          // --- Image handling ---
          if (
            imgTop <= imgActivationThresholdTop &&
            imgBottom >= imgActivationThresholdBottom
          ) {
            gsap.set(container, {
              scale: isDesktop ? 1.5 : 1.1,
              zIndex: 10,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.set(imgEl, {
              filter: "grayscale(0) brightness(1)",
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            gsap.set(container, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.set(imgEl, {
              filter: "grayscale(0.7) brightness(0.6)",
              duration: 0.3,
              ease: "power2.out",
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

          // if (projectProgress > 0 && projectProgress < 1) {
          //   gsap.set(p, {
          //     color: "#DA7900",
          //     // color: "#1b140c",
          //     //   color: "#fff",
          //     // fontSize: "28px",
          //     scale: isDesktop ? 1.3 : 1.3,
          //     zIndex: 10,
          //     // ease: "power2.out",
          //     // duration: 0.3,
          //     fontWeight: 500,
          //   });
          // } else {
          //   gsap.set(p, {
          //     color: "#fff",
          //     //   fontSize: "18px",
          //     scale: 1,
          //     // ease: "circ.out",
          //     // duration: 0.5,
          //     fontWeight: 300,
          //   });
          // }

          if (projectProgress > 0 && projectProgress < 1) {
            gsap.to(p, {
              color: "#DA7900",
              scale: isDesktop ? 1.3 : 1.3,
              zIndex: 10,
              // ease: "back.out",
              duration: 0.3,
              delay: 0.05,
            });
          } else {
            gsap.to(p, {
              color: "#fff",
              scale: 1,
              // ase: "back.out",
              duration: 0.3,
              delay: 0.05,
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
  }, [isDesktop]);

  return (
    <section
      ref={spotlightRef}
      className="spotlight relative w-full min-h-screen h-full px-8 overflow-visible bg-background"
    >
      <div className="project-index">
        <h1
          ref={projectIndexRef}
          className="text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white -z-10"
        >
          {currentIndex}
        </h1>
      </div>

      <div
        ref={projectImagesContainerRef}
        className="project-images absolute top-0 left-1/2 -translate-x-1/2 w-[35%] py-[50dvh] flex flex-col gap-2 z-0 bg-red-300/0 space-y-20"
      >
        {PROJECTS.map((project, idx) => (
          <Link
            href={project.link}
            target="_"
            key={idx}
            ref={(el) => {
              if (el) projectImgsRef.current[idx] = el;
            }}
            className="project-img w-full aspect-video transition-all duration-300 ease-out overflow-hidden shadow-xl shadow-black/30 will-change-transform"
          >
            {project.storage ? (
              <video
                ref={(el) => {
                  if (el) videoElsRef.current[idx] = el;
                }}
                src={project.storage}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-300 ease-out will-change-transform"
              />
            ) : (
              <img
                ref={(el) => {
                  if (el) imgElsRef.current[idx] = el;
                }}
                src={project.image}
                alt=""
                className="w-full h-full object-cover transition-all duration-300 ease-out"
              />
            )}
          </Link>
        ))}
      </div>

      <div
        ref={projectNamesContainerRef}
        className="project-names absolute right-10 bottom-4 flex flex-col items-end z-10"
      >
        {PROJECTS.map((project, idx) => (
          <p
            key={idx}
            ref={(el) => {
              if (el) projectNamesRef.current[idx] = el;
            }}
            className="text-2xl font-light leading-tight text-[#ffffff] will-change-transform "
          >
            {project.name}
          </p>
        ))}
      </div>

      {/* <div className="absolute h-px w-full bg-white top-1/2 -translate-y-1/2 -z-10" /> */}
    </section>
  );
}
