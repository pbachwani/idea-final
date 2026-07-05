"use client";
import { projects } from "@/data/projects";
import React, { useState } from "react";

const ProjectList = ({ activeProject, setActiveProject }) => {
  const handleClick = (projectId) => {
    setActiveProject(projectId);
    // console.log(projectId);
  };
  console.log(activeProject);

  return (
    <div className="w-full h-fit max-h-120 max-lg:mt-20">
      <div className="flex justify-between items-baseline">
        <h1 className="text-xl sm:text-3xl opacity-60 tracking-wider">
          What i&apos;ve built so far
        </h1>
        {activeProject && (
          <h1 className="text-xl sm:text-xl opacity-60 max-lg:hidden">
            Visit Website
          </h1>
        )}
      </div>
      <div className="sm:grid sm:grid-cols-2 w-full gap-2 mt-1 flex flex-col">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleClick(project.id)}
            className="w-full sm:h-16 h-10 border-amber-200/20 border flex md:justify-center justify-start max-md:px-4 items-center shadow-xs shadow-amber-200/30"
          >
            {project.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
