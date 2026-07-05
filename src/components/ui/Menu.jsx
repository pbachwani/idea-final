"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Menu = ({ isOpen, setIsOpen }) => {
  const navBgsRef = useRef([]);
  const navItemsRef = useRef(null);
  const tlRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const splitsRef = useRef(null);

  // Initialize timeline and splits once
  useEffect(() => {
    if (!navItemsRef.current) return;

    // Create splits
    if (!splitsRef.current) {
      splitsRef.current = SplitText.create(".nav-items a", {
        type: "lines",
        linesClass: "line",
      });
    }

    // Create timeline
    if (!tlRef.current) {
      tlRef.current = gsap.timeline({
        paused: true,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
        onReverseComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      // Add background animation
      tlRef.current.to(navBgsRef.current, {
        scaleY: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.inOut",
      });

      // Add clip-path animation
      tlRef.current.to(
        navItemsRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.75,
          ease: "power3.inOut",
        },
        "-=0.6",
      );
    }

    return () => {
      // Don't kill timeline on unmount
    };
  }, []);

  // Handle isOpen state changes
  useEffect(() => {
    if (!tlRef.current) return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    if (isOpen) {
      // Animate links in
      const linkBlocks = [
        ".nav-socials .line, .nav-legal .line",
        ".nav-primary-links .line",
        ".nav-secondary-links .line",
      ];

      linkBlocks.forEach((selector) => {
        gsap.fromTo(
          selector,
          { y: "100%" },
          {
            y: "0%",
            duration: 0.75,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.85,
          },
        );
      });

      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [isOpen]);

  return (
    <div className="fixed top-0 left-0 w-full min-h-svh pointer-events-none z-99999">
      {/* Background Layers */}
      {["bg-cyan-500", "bg-emerald-900", "bg-teal-800", "bg-emerald-500"].map(
        (bgColor, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) navBgsRef.current[idx] = el;
            }}
            className={`absolute top-0 left-0 w-full h-full ${bgColor} scale-y-0 origin-top will-change-transform pointer-events-none`}
            style={{ transform: "scaleY(0)" }}
          />
        ),
      )}

      {/* Menu Items */}
      <div
        ref={navItemsRef}
        className="nav-items absolute top-0 left-0 w-full h-screen flex gap-8 p-20 bg-teal-900 will-change-clip pointer-events-auto"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        }}
      >
        {/* Left Column */}
        <div className="grow flex flex-col justify-between gap-8">
          {/* Social Links */}
          <div className="nav-socials">
            {[
              "Bluesky",
              "Pinterest",
              "YouTube",
              "Instagram",
              "LinkedIn",
              "X",
            ].map((link, idx) => (
              <a
                key={idx}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
                className="text-xl text-white no-underline block leading-tight mb-2 tracking-tight overflow-hidden"
              >
                <div className="line" style={{ transform: "translateY(100%)" }}>
                  {link}
                </div>
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="nav-legal">
            {[
              "Cookie Policy",
              "Accessibility",
              "Data Rights",
              "Disclosures",
            ].map((link, idx) => (
              <a
                key={idx}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
                className="text-sm text-teal-400 no-underline block leading-tight mb-2 tracking-tight overflow-hidden"
              >
                <div className="line" style={{ transform: "translateY(100%)" }}>
                  {link}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="grow flex gap-8 justify-between">
          {/* Primary Links */}
          <div className="nav-primary-links flex-1">
            {[
              "Home",
              "Experiments",
              "Latest Updates",
              "Documentation",
              "Community",
            ].map((link, idx) => (
              <a
                key={idx}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
                className="text-4xl text-white no-underline block leading-tight mb-2 tracking-tight overflow-hidden"
              >
                <div className="line" style={{ transform: "translateY(100%)" }}>
                  {link}
                </div>
              </a>
            ))}
          </div>

          {/* Secondary Links */}
          <div className="nav-secondary-links flex-1">
            {["Playground", "Build Something", "Activity Feed", "Profile"].map(
              (link, idx) => (
                <a
                  key={idx}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                  className="text-xl text-white no-underline block leading-tight mb-2 tracking-tight overflow-hidden"
                >
                  <div
                    className="line"
                    style={{ transform: "translateY(100%)" }}
                  >
                    {link}
                  </div>
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
