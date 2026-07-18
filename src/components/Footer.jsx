"use client";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import FaqAccordion from "./ui/FaqAccordion";
import AnimatedFooterTitle from "./ui/AnimatedFooterTitle";
import { toast, Toaster } from "sonner";

function Footer() {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [emailHovered, setEmailHovered] = useState(false);

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

    setTimeout(() => {
      setForm({ name: "", contact: "", message: "" });
      setSubmitted(false);
    }, 15000);
  };

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy text.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.3, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: false }}
        id="footer"
        className="relative md:max-h-[80%] md:h-[60svh] h-svh w-full mt-20 overflow-hidden rounded-t-4xl"
      >
        <Toaster />
        <div className="absolute inset-0 h-full w-full z-20 bg-black/30 flex flex-col justify-between px-4 sm:px-10 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row max-md:gap-4 max-md:items-center justify-between w-full brightness-125">
              <p className="">Taking projects for Q3&apos; 2026</p>
              <p className="max-md:hidden">Based in Jaipur, In</p>
              <div className="relative">
                Email:{" "}
                <button
                  onClick={() => handleCopy("contact@ideabehind.in")}
                  className="hover:opacity-50 transition-opacity duration-200 ease-out"
                  onMouseEnter={() => {
                    setEmailHovered(true);
                  }}
                  onMouseLeave={() => {
                    setEmailHovered(false);
                  }}
                >
                  contact@ideabehind.in
                </button>
                {emailHovered && (
                  <AnimatePresence initial="false" mode="wait">
                    <motion.div
                      initial={{ opacity: 0, y: "40%" }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="absolute bottom-[90%] right-[24%] text-xs text-[#da7900]"
                    >
                      Click to copy
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between w-full brightness-125">
              <div className="flex flex-col w-full md:items-start items-center justify-start">
                {submitted ? (
                  <p className="brightness-125">
                    Got it — I&apos;ll be in touch.
                  </p>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 items-end text-white"
                  >
                    <p className="w-full ">Say Hi!</p>
                    <div className="flex gap-2">
                      {/* <p className="min-w-28">Name</p> */}
                      <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="border-b bg-transparent px-1 backdrop-blur-md outline-none border-white/40 w-72 fill-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      {/* <p className="min-w-28">Email / number</p> */}
                      <input
                        name="contact"
                        type="email"
                        placeholder="Email"
                        value={form.contact}
                        onChange={handleChange}
                        className="border-b bg-transparent px-1 outline-none border-white/40 w-72"
                      />
                    </div>
                    <div className="flex gap-2">
                      {/* <p className="min-w-28">Message</p> */}
                      <textarea
                        cols={40}
                        name="message"
                        type="text"
                        placeholder="Brief about our project"
                        value={form.message}
                        onChange={handleChange}
                        className="border-b bg-transparent px-1 outline-none border-white/40 w-72"
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
              <FaqAccordion />
            </div>
          </div>

          <div className="flex gap-4 md:justify-end justify-center w-full cursor-default">
            <p className=" opacity-60">more coming soon</p>
            <p className=" opacity-60 relative">
              Idea Behind{" "}
              <span className="absolute -translate-y-1">&trade;</span>
            </p>
            {/* <p className=""></p> */}
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 z-20 p-4 text-4xl lg:text-[200px] lg:leading-32 cursor-none w-fit text-nowrap">
          Idea Behind
        </div> */}
        <AnimatedFooterTitle className="absolute md:bottom-0 bottom-10 md:left-0 max-md:left-1/2 max-md:-translate-x-1/2 z-20 p-4 text-5xl lg:text-[200px] lg:leading-32" />

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
