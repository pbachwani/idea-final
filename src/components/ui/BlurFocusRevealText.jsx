"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

// const TEXT_SEGMENTS = [
//   { text: "For creatives ", color: "#da7900" },
//   {
//     text: "and brands whose reputation has outgrown their digital presence.",
//     color: null,
//   },
// ];

const TEXT_SEGMENTS = [
  { text: "For brands", color: "#da7900" },
  { text: " and ", color: null },
  { text: "creatives ", color: "#da7900" },
  {
    text: "ready to build a digital presence that reflects who they truly are.",
    color: null,
  },
];

// For brands and creatives ready to build a digital presence that reflects who they truly are.

// Group text into words (keeping color per segment), each word gets a flat index
function groupIntoWords(segments) {
  const groups = [];
  let flatIndex = 0;

  segments.forEach((seg) => {
    const parts = seg.text.trim().split(" ");
    parts.forEach((word) => {
      if (word.length > 0) {
        groups.push({ word, color: seg.color, index: flatIndex++ });
      }
    });
  });

  return groups;
}

export default function BlurFocusRevealText({ textColor }) {
  const wrapperRef = useRef(null);
  const wordRefs = useRef([]);

  const wordGroups = groupIntoWords(TEXT_SEGMENTS);
  const totalWords = wordGroups.length;

  useEffect(() => {
    const windowSize = 1.5; // how many "word slots" the focus transition spans

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top 80%",
      end: "top center",
      scrub: 0.3,
      onUpdate: (self) => {
        const wordProgress = self.progress * totalWords;

        wordRefs.current.forEach((el, i) => {
          if (!el) return;

          const distFromEdge = i - wordProgress;
          // t: 0 = fully in focus, 1 = fully blurred/unfocused
          const t = Math.max(0, Math.min(1, distFromEdge / windowSize + 0.5));

          const blur = t * 10; // 0px -> 10px
          const scale = 1 + t * 0.08; // 1 -> 1.08
          const opacity = 1 - t * 0.75; // 1 -> 0.25

          el.style.filter = `blur(${blur}px)`;
          el.style.transform = `scale(${scale})`;
          el.style.opacity = opacity;
        });
      },
    });

    return () => st.kill();
  }, [totalWords]);

  return (
    <div ref={wrapperRef} className="absolute bottom-0 w-full h-[40svh] pb-40">
      <div className="w-full h-full flex justify-center items-center max-w-2xl px-6 xl:px-10 mx-auto">
        <p className="md:text-4xl text-xl leading-[1.1] tracking-tight flex flex-wrap justify-start md:justify-center gap-x-[0.3em] text-left">
          {wordGroups.map(({ word, color, index }) => (
            <span
              key={index}
              ref={(el) => {
                if (el) wordRefs.current[index] = el;
              }}
              style={{
                display: "inline-block",
                color: color || textColor,
                willChange: "filter, transform, opacity",
              }}
              className="blur-lg"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
