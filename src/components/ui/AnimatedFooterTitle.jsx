"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function AnimatedFooterTitle({
  text = "Idea Behind",
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(containerRef.current, {
        type: "chars",
        charsClass: "char",
      });

      gsap.fromTo(
        split.chars,
        { yPercent: 130, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "restart reverse restart reverse",
          },
        },
      );

      return () => split.revert();
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`w-fit text-nowrap cursor-none ${className}`}
    >
      {text}
    </div>
  );
}
