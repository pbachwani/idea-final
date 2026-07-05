"use client";
import React, { useState, useEffect } from "react";
import ProjectList from "./ui/ProjectList";
import ProjectPreview from "./ui/ProjectPreview";
import { projects } from "@/data/projects";
import { motion } from "motion/react";
import Spotlight from "./ui/Spotlight";

const ProjectsNew = () => {
  const [activeProject, setActiveProject] = useState(null);
  const selectedProject = projects.find((p) => p.id === activeProject);
  //   const projectImages = ["/img1.png", "/img1.png", "/img1.png", "/img1.png"];
  const projectImages = [
    "/media/gg3.mov",
    "/media/sob1.mov",
    "/media/vv5.mov",
    "/media/vv3.mov",
    "/media/gg2.mov",
  ];

  useEffect(() => {
    console.log("projects", projects);
  }, []);

  return (
    <section className="h-svh flex flex-col lg:flex-row bg-background">
      <Spotlight images={projectImages} />
    </section>
  );
};

export default ProjectsNew;
