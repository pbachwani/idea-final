"use client";
import React, { useState, useEffect } from "react";
import ProjectList from "./ui/ProjectList";
import ProjectPreview from "./ui/ProjectPreview";
import { projects } from "@/data/projects";
import { motion } from "motion/react";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const selectedProject = projects.find((p) => p.id === activeProject);

  useEffect(() => {
    console.log("projects", projects);
  }, []);

  return (
    <section className="min-h-svh flex flex-col lg:flex-row bg-background">
      {/* LEFT */}
      <div className="lg:w-1/2 flex flex-col justify-between p-4 pt-20">
        <motion.h1
          initial={{ opacity: 0, blur: 16 }}
          whileInView={{
            opacity: 1,
            blur: 0,
          }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          className="sm:text-5xl text-3xl mb-4"
        >
          Websites that make businesses feel established.
        </motion.h1>

        <ProjectList
          activeProject={selectedProject}
          setActiveProject={setActiveProject}
        />
      </div>

      {/* RIGHT */}
      <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 z-10">
        <ProjectPreview activeProject={selectedProject} />
      </div>
    </section>
  );
};

export default Projects;
