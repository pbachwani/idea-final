// "use client";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useEffect, useRef } from "react";

// import { cn } from "@/lib/utils";

// gsap.registerPlugin(ScrollTrigger);

// const CardsStack = ({
//   cards,
//   className,
//   containerClassName,
//   imageClassName,
// }) => {
//   const wrapperRef = useRef(null);
//   const stickyRef = useRef(null);
//   const cardElsRef = useRef([]);

//   useEffect(() => {
//     const cardElements = cardElsRef.current;
//     const totalCards = cardElements.length;

//     if (!cardElements[0]) return;

//     const ctx = gsap.context(() => {
//       gsap.set(cardElements[0], { y: "0%", scale: 1 });

//       for (let i = 1; i < totalCards; i++) {
//         if (!cardElements[i]) continue;
//         gsap.set(cardElements[i], { y: "100%", scale: 1 });
//       }

//       const scrollTimeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: stickyRef.current,
//           start: "top top",
//           end: `+=${window.innerHeight * (totalCards - 1)}`,
//           pin: true,
//           scrub: 0.5,
//           pinSpacing: true,
//         },
//       });

//       for (let i = 0; i < totalCards - 1; i++) {
//         const currentCard = cardElements[i];
//         const nextCard = cardElements[i + 1];
//         const position = i;
//         if (!currentCard || !nextCard) continue;

//         scrollTimeline.to(
//           currentCard,
//           { scale: 0.7, duration: 1, ease: "none", opacity: 0 },
//           position,
//         );

//         scrollTimeline.to(
//           nextCard,
//           { y: "0%", duration: 1, ease: "none" },
//           position,
//         );
//       }
//     }, wrapperRef);

//     const resizeObserver = new ResizeObserver(() => {
//       ScrollTrigger.refresh();
//     });
//     resizeObserver.observe(wrapperRef.current);

//     return () => {
//       resizeObserver.disconnect();
//       ctx.revert();
//     };
//   }, [cards]);

//   return (
//     <div className={cn("relative h-screen w-full", className)} ref={wrapperRef}>
//       <div
//         ref={stickyRef}
//         className="relative flex h-screen w-full items-center justify-center overflow-hidden p-3 lg:p-8"
//       >
//         <div
//           className={cn(
//             "relative md:h-[90%] h-[75%] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg lg:max-w-5xl",
//             containerClassName,
//           )}
//         >
//           {cards.map((card, i) => (
//             <div
//               key={card.id}
//               className="absolute h-full w-full bg-black rounded-4xl"
//               ref={(el) => {
//                 cardElsRef.current[i] = el;
//               }}
//             >
//               <img
//                 src={card.image}
//                 alt={card.alt || ""}
//                 className={cn(
//                   "rounded-4xl absolute h-full w-full object-cover opacity-40 brightness-75",
//                   imageClassName,
//                 )}
//               />
//               <div className="absolute right-0 top-0 m-6 lg:m-10 px-4 py-1.5 bg-black/30 rounded-2xl">
//                 Step {card.id}
//               </div>
//               <div className="absolute left-0 top-0 z-10 p-6 lg:p-10 text-justify">
//                 {card.alt && (
//                   <h3 className="text-2xl font-semibold text-white lg:text-4xl pb-4">
//                     {card.alt}
//                   </h3>
//                 )}
//                 {card.text && (
//                   <p className="mt-3 whitespace-pre-line text-base text-white brightness-125 lg:text-xl">
//                     {card.text}
//                   </p>
//                 )}
//               </div>

//               <div className="absolute bottom-0 h-[50%] w-full bg-blue-400/20">
//                 lottie animation here
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="absolute bottom-[15%] right-10">
//           <h1 className="text-4xl">Process</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { CardsStack };

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const CardsStack = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}) => {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const cardElsRef = useRef([]);

  useEffect(() => {
    const cardElements = cardElsRef.current;
    const totalCards = cardElements.length;

    if (!cardElements[0]) return;

    const ctx = gsap.context(() => {
      gsap.set(cardElements[0], { y: "0%", scale: 1 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: "100%", scale: 1 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          { scale: 0.7, duration: 1, ease: "none", opacity: 0 },
          position,
        );

        scrollTimeline.to(
          nextCard,
          { y: "0%", duration: 1, ease: "none" },
          position,
        );
      }
    }, wrapperRef);

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(wrapperRef.current);

    return () => {
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, [cards]);

  return (
    <div className={cn("relative h-screen w-full", className)} ref={wrapperRef}>
      <div
        ref={stickyRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden p-3 lg:p-8"
      >
        <div
          className={cn(
            "relative h-[75%] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg md:h-[90%] lg:max-w-7xl",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="absolute h-full w-full rounded-4xl bg-black"
              ref={(el) => {
                cardElsRef.current[i] = el;
              }}
            >
              <img
                src={card.image}
                alt={card.alt || ""}
                className={cn(
                  "rounded-4xl absolute h-full w-full object-cover opacity-40 brightness-75",
                  imageClassName,
                )}
              />
              <div className="absolute right-0 top-0 m-6 rounded-2xl bg-black/30 px-4 py-1.5 lg:m-10">
                Step {card.id}
              </div>
              <div className="absolute left-0 top-0 z-10 p-6 text-justify lg:p-10">
                {card.alt && (
                  <h3 className="pb-4 text-2xl font-semibold text-white lg:text-4xl">
                    {card.alt}
                  </h3>
                )}
                {card.text && (
                  <p className="mt-3 whitespace-pre-line text-base text-white brightness-125 lg:text-xl max-w-xl">
                    {card.text}
                  </p>
                )}
              </div>

              {card.lottie && (
                <div className="absolute bottom-[5%] md:right-[-10%] h-[50%] w-auto">
                  <DotLottieReact
                    src={card.lottie}
                    loop
                    autoplay
                    className="h-full w-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute top-[8%] left-10">
          <h1 className="text-4xl">Process</h1>
        </div>
      </div>
    </div>
  );
};

export { CardsStack };
