"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#$%&";

const TEXT_SEGMENTS = [
  { text: "For creatives ", color: "#da7900" },
  {
    text: "and brands whose reputation has outgrown their digital presence.",
    color: null,
  },
];

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Flatten segments into a single ordered char list (used for decode math)
function flattenChars(segments) {
  const chars = [];
  segments.forEach((seg) => {
    seg.text
      .split("")
      .forEach((ch) => chars.push({ char: ch, color: seg.color }));
  });
  return chars;
}

// Group the same char list into words (for rendering, so words don't break)
function groupIntoWords(segments) {
  const groups = [];
  let flatIndex = 0;

  segments.forEach((seg) => {
    const parts = seg.text.split(" ");
    parts.forEach((word, i) => {
      if (word.length > 0) {
        const wordChars = word.split("").map((ch) => ({
          char: ch,
          flatIndex: flatIndex++,
        }));
        groups.push({ type: "word", chars: wordChars, color: seg.color });
      }
      if (i < parts.length - 1) {
        groups.push({ type: "space", flatIndex: flatIndex++ });
      }
    });
  });

  return groups;
}

export default function ScrambleRevealText({ textColor }) {
  const wrapperRef = useRef(null);
  const charRefs = useRef([]);

  const chars = flattenChars(TEXT_SEGMENTS);
  const wordGroups = groupIntoWords(TEXT_SEGMENTS);

  useEffect(() => {
    let decodeCounter = 0;
    const decodeIndices = chars.map((c) => {
      if (c.char === " ") return -1;
      return decodeCounter++;
    });
    const totalChars = decodeCounter;
    const windowSize = 6;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top bottom",
      end: "bottom center",
      scrub: 0.3,
      onUpdate: (self) => {
        const charProgress = self.progress * totalChars;

        charRefs.current.forEach((el, i) => {
          if (!el) return;
          const info = chars[i];

          const decodeIdx = decodeIndices[i];
          const distFromEdge = decodeIdx - charProgress;

          if (distFromEdge < 0) {
            el.textContent = info.char;
            el.style.opacity = 1;
          } else if (distFromEdge < windowSize) {
            const seed = decodeIdx * 1000 + Math.floor(self.progress * 60);
            el.textContent =
              GLITCH_CHARS[
                Math.floor(seededRandom(seed) * GLITCH_CHARS.length)
              ];
            el.style.opacity = 1 - (distFromEdge / windowSize) * 0.7;
          } else {
            el.textContent =
              GLITCH_CHARS[
                Math.floor(seededRandom(decodeIdx) * GLITCH_CHARS.length)
              ];
            el.style.opacity = 0.15;
          }
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="max-lg:hidden absolute bottom-0 w-full bg-blue-400/0 h-[40svh]"
    >
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-3xl leading-[1.1] tracking-tight">
          {wordGroups.map((group, gi) => {
            if (group.type === "space") {
              return <span key={gi}>&nbsp;</span>;
            }
            return (
              <span
                key={gi}
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  color: group.color || textColor,
                }}
              >
                {group.chars.map(({ char, flatIndex }) => (
                  <span
                    key={flatIndex}
                    ref={(el) => {
                      if (el) charRefs.current[flatIndex] = el;
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
