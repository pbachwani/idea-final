"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Spotlight = ({ images = [] }) => {
  const spotlightRef = useRef(null);
  const imagesRef = useRef([]);
  const dissolveGridRef = useRef(null);
  const lenisRef = useRef(null);
  const dissolveCellElementsRef = useRef([]);
  const dissolveCellsRef = useRef([]);

  useEffect(() => {
    if (!spotlightRef.current || images.length === 0) return;

    // Configuration
    const dissolveCellSize = 16;
    const dissolveColumns = Math.ceil(window.innerWidth / dissolveCellSize);
    const dissolveRows = Math.ceil(window.innerHeight / dissolveCellSize);
    const dissolveSpreadAbove = 0.25;
    const dissolveSpreadBelow = 0.25;
    const dissolveScatterIntensity = 0.15;
    const dissolveSolidCoreRadius = 0.025;
    const dissolveMinScatterAtCenter = 0.3;
    const dissolveVisibilityThreshold = 0.65;
    const dissolveColor = "#e7ddcf";
    const dissolveCharacters = "";

    const dissolveFontSize = Math.round(dissolveCellSize * 0.7);
    const totalImages = images.length;
    const totalTransitions = totalImages - 1;

    // Initialize Lenis
    lenisRef.current = new Lenis();
    lenisRef.current.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenisRef.current.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Setup grid colors
    if (dissolveGridRef.current) {
      dissolveGridRef.current.style.setProperty(
        "--dissolve-color",
        dissolveColor,
      );
    }

    // Set z-index for images
    imagesRef.current.forEach((img, i) => {
      if (img) img.style.zIndex = totalImages - i;
    });

    // Generate dissolve cells
    function getRandomCharacter() {
      return dissolveCharacters[
        Math.floor(Math.random() * dissolveCharacters.length)
      ];
    }

    function hashFromPosition(row, col, seed) {
      const raw = Math.sin(row * seed + col * (seed * 2.45)) * 43758.5453;
      return raw - Math.floor(raw);
    }

    dissolveCellsRef.current = [];
    dissolveCellElementsRef.current = [];

    if (dissolveGridRef.current) {
      dissolveGridRef.current.innerHTML = "";

      for (let row = 0; row < dissolveRows; row++) {
        for (let col = 0; col < dissolveColumns; col++) {
          const cell = document.createElement("div");
          cell.className =
            "absolute bg-[#ffffff] invisible font-mono font-medium leading-none text-black flex items-center justify-center overflow-hidden";
          cell.style.left = `${col * dissolveCellSize}px`;
          cell.style.top = `${row * dissolveCellSize}px`;
          cell.style.width = `${dissolveCellSize}px`;
          cell.style.height = `${dissolveCellSize}px`;
          cell.style.fontSize = `${dissolveFontSize}px`;
          cell.textContent = getRandomCharacter();
          dissolveGridRef.current.appendChild(cell);

          dissolveCellElementsRef.current.push(cell);
          dissolveCellsRef.current.push({
            row,
            col,
            normalizedY: (row + 0.5) / dissolveRows,
          });
        }
      }
    }

    const cellVisibilityRandom = dissolveCellsRef.current.map((cell) =>
      hashFromPosition(cell.row, cell.col, 127.1),
    );

    const cellScatterOffset = dissolveCellsRef.current.map(
      (cell) =>
        (hashFromPosition(cell.row, cell.col, 269.3) - 0.5) *
        dissolveScatterIntensity,
    );

    function updateImageClipPaths(scrollProgress, travelRange) {
      for (let i = 0; i < totalTransitions; i++) {
        const segmentStart = i / totalTransitions;
        const segmentEnd = (i + 1) / totalTransitions;

        let segmentProgress =
          (scrollProgress - segmentStart) / (segmentEnd - segmentStart);
        segmentProgress = gsap.utils.clamp(0, 1, segmentProgress);

        const remappedPosition =
          -dissolveSpreadAbove + segmentProgress * travelRange;
        const clipPercent = gsap.utils.clamp(0, 100, remappedPosition * 100);

        if (imagesRef.current[i]) {
          imagesRef.current[i].style.clipPath =
            `polygon(0% ${clipPercent}%, 100% ${clipPercent}%, 100% 100%, 0% 100%)`;
        }
      }
    }

    function updateDissolveBand(bandCenterY) {
      for (let i = 0; i < dissolveCellsRef.current.length; i++) {
        const cell = dissolveCellsRef.current[i];

        const rawDistance = Math.abs(cell.normalizedY - bandCenterY);

        const scatterStrength = gsap.utils.clamp(
          dissolveMinScatterAtCenter,
          1,
          rawDistance / dissolveSolidCoreRadius,
        );

        const scatteredDistance =
          cell.normalizedY -
          bandCenterY +
          cellScatterOffset[i] * scatterStrength;

        const normalizedDistance =
          scatteredDistance >= 0
            ? scatteredDistance / dissolveSpreadBelow
            : Math.abs(scatteredDistance) / dissolveSpreadAbove;

        if (normalizedDistance >= 1) {
          dissolveCellElementsRef.current[i].style.visibility = "hidden";
          continue;
        }

        const density = (1 - normalizedDistance) * (1 - normalizedDistance);

        const isVisible =
          density > cellVisibilityRandom[i] * dissolveVisibilityThreshold;
        dissolveCellElementsRef.current[i].style.visibility = isVisible
          ? "visible"
          : "hidden";
      }
    }

    function hideAllDissolveCells() {
      for (let i = 0; i < dissolveCellElementsRef.current.length; i++) {
        dissolveCellElementsRef.current[i].style.visibility = "hidden";
      }
    }

    const totalTravelRange = 1 + dissolveSpreadAbove + dissolveSpreadBelow;

    ScrollTrigger.create({
      trigger: spotlightRef.current,
      start: "top top",
      end: `+=${totalTransitions * window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const scrollProgress = self.progress;

        const rawPosition = scrollProgress * totalTransitions;
        const currentTransition = Math.min(
          Math.floor(rawPosition),
          totalTransitions - 1,
        );
        const transitionProgress = gsap.utils.clamp(
          0,
          1,
          rawPosition - currentTransition,
        );

        const bandCenterY =
          -dissolveSpreadAbove + transitionProgress * totalTravelRange;

        if (transitionProgress <= 0 || transitionProgress >= 1) {
          hideAllDissolveCells();
          updateImageClipPaths(scrollProgress, totalTravelRange);
          return;
        }

        updateImageClipPaths(scrollProgress, totalTravelRange);
        updateDissolveBand(bandCenterY);
      },
    });

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [images]);

  return (
    <section
      ref={spotlightRef}
      className="spotlight relative w-full h-svh overflow-hidden bg-background"
    >
      {/* Images */}
      {images.map((image, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) imagesRef.current[idx] = el;
          }}
          className="spotlight-img absolute top-0 left-0 w-full h-full p-20"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            willChange: "clip-path",
          }}
        >
          <video
            autoPlay
            loop
            muted
            src={image}
            alt={`Project ${idx + 1}`}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      ))}

      {/* Dissolve Grid */}
      <div
        ref={dissolveGridRef}
        className="dissolve-grid absolute top-0 left-0 w-full h-full z-50 pointer-events-none"
        style={{ "--dissolve-color": "#ffffff" }}
      />
    </section>
  );
};

export default Spotlight;
