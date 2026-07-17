// "use client";
// import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
// import React, { useEffect } from "react";
// import { motion } from "motion/react";

// function Footer() {
//   useEffect(() => {
//     window.dispatchEvent(new Event("resize"));
//   }, []);
//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
//         viewport={{ once: false }}
//         className="relative md:max-h-[60%] md:h-[60svh] h-[80svh] w-full mt-20 overflow-hidden rounded-t-4xl"
//       >
//         <div className="absolute inset-0 h-full w-full z-20 bg-black/30 flex flex-col justify-between px-4 sm:px-10 py-4">
//           <div className="flex flex-col md:flex-row max-md:gap-4 justify-between w-full brightness-125">
//             <p className="">Taking projects for Q3&apos; 2026</p>
//             <p>Reach out: contact@ideabehing.in</p>
//           </div>
//           <div className="flex flex-col w-full items-end justify-start">
//             <form>
//               <div className="flex gap-4 items-baseline">
//                 <p>Name</p>
//                 <input type="text" className="border-b" />
//               </div>
//               <div className="flex gap-4 items-baseline">
//                 <p>Email</p>
//                 <input type="email" className="border-b" />
//               </div>
//               <div className="flex gap-4 items-baseline">
//                 <p>Message</p>
//                 <input type="text" className="border-b" />
//               </div>
//             </form>
//           </div>
//           <div className="flex flex-col md:flex-row max-md:gap-4 justify-end w-full brightness-125">
//             {/* <p>Reach out: contact@ideabehing.in</p> */}
//             <p className="brightness-125">Jaipur, In</p>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 z-20 p-4 text-7xl cursor-none w-fit text-nowrap max-md:hidden animate-pulse">
//           Idea Behind
//         </div>

//         <ShaderGradientCanvas
//           style={{
//             width: "100%",
//             height: "100%",
//           }}
//           lazyLoad={false}
//           fov={undefined}
//           pixelDensity={1}
//           pointerEvents="none"
//         >
//           <ShaderGradient
//             animate="on"
//             type="sphere"
//             wireframe={false}
//             shader="defaults"
//             uTime={0}
//             uSpeed={0.3}
//             uStrength={0.3}
//             uDensity={0.8}
//             uFrequency={5.5}
//             uAmplitude={3.2}
//             positionX={-0.1}
//             positionY={0}
//             positionZ={0}
//             rotationX={0}
//             rotationY={130}
//             rotationZ={70}
//             color1="#003e06"
//             color2="#da7900"
//             color3="#003e06"
//             // color1="#005fda"
//             // color2="#da7900"
//             // color3="#005fda"
//             reflection={0.4}
//             cAzimuthAngle={270}
//             cPolarAngle={180}
//             cDistance={0.5}
//             cameraZoom={24}
//             lightType="env"
//             brightness={0.8}
//             envPreset="city"
//             grain="on"
//             toggleAxis={false}
//             zoomOut={false}
//             hoverState=""
//             enableTransition={false}
//           />
//         </ShaderGradientCanvas>
//       </motion.div>
//     </>
//   );
// }

// export default Footer;

"use client";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

function Footer() {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!form.contact.trim()) {
      setError("Add an email or number");
      return;
    }
    if (!form.message.trim()) {
      setError("Message is required");
      return;
    }

    setError("");
    // TODO: wire this up to your submit endpoint
    console.log(form);
    setSubmitted(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: false }}
        className="relative md:max-h-[60%] md:h-[60svh] h-[80svh] w-full mt-20 overflow-hidden rounded-t-4xl"
      >
        <div className="absolute inset-0 h-full w-full z-20 bg-black/30 flex flex-col justify-between px-4 sm:px-10 py-4">
          <div className="flex flex-col md:flex-row max-md:gap-4 justify-between w-full brightness-125">
            <p className="">Taking projects for Q3&apos; 2026</p>
            <p>
              Reach out:{" "}
              <button className="hover:opacity-50">
                contact@ideabehing.in
              </button>
            </p>
          </div>

          <div className="flex flex-col w-full items-end justify-start">
            {submitted ? (
              <p className="brightness-125">Got it — I&apos;ll be in touch.</p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 items-end"
              >
                <div className="flex gap-4">
                  <p className="min-w-28">Name</p>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="border-b bg-transparent outline-none border-white/40"
                  />
                </div>
                <div className="flex gap-4">
                  <p className="min-w-28">Email / number</p>
                  <input
                    name="contact"
                    type="text"
                    value={form.contact}
                    onChange={handleChange}
                    className="border-b bg-transparent outline-none border-white/40"
                  />
                </div>
                <div className="flex gap-4">
                  <p className="min-w-28">Message</p>
                  <input
                    name="message"
                    type="text"
                    value={form.message}
                    onChange={handleChange}
                    className="border-b bg-transparent outline-none border-white/40"
                  />
                </div>

                {error && <p className="text-sm text-red-300">{error}</p>}

                <button
                  type="submit"
                  className="border-b w-fit cursor-pointer text-accent"
                >
                  Send
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col md:flex-row max-md:gap-4 justify-end w-full brightness-125">
            <p className="brightness-125">Jaipur, In</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-20 p-4 text-7xl cursor-none w-fit text-nowrap max-md:hidden animate-pulse">
          Idea Behind
        </div>

        <ShaderGradientCanvas
          style={{ width: "100%", height: "100%" }}
          lazyLoad={false}
          fov={undefined}
          pixelDensity={1}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            type="sphere"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.3}
            uStrength={0.3}
            uDensity={0.8}
            uFrequency={5.5}
            uAmplitude={3.2}
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            color1="#003e06"
            color2="#da7900"
            color3="#003e06"
            reflection={0.4}
            cAzimuthAngle={270}
            cPolarAngle={180}
            cDistance={0.5}
            cameraZoom={24}
            lightType="env"
            brightness={0.8}
            envPreset="city"
            grain="on"
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </motion.div>
    </>
  );
}

export default Footer;
