import React from "react";
const ProjectPreview = ({ activeProject }) => {
  // No active project → show fallback UI
  if (!activeProject) {
    return (
      <div className="h-full flex items-center justify-center text-white/40 text-lg">
        Select a project to preview
      </div>
    );
  }

  const images = activeProject.media;

  return (
    <div
      data-lenis-prevent
      className="h-screen overflow-y-auto gap-4 flex flex-col pt-24 pb-4 px-4"
    >
      {images.map((image, idx) => (
        <div
          key={idx}
          className="min-h-[40svh] border-2 border-white/50 flex justify-center items-center"
        >
          {image}
        </div>
      ))}

      {/* <div className="min-h-[40svh] border-2 border-white/50 mb-10">
        next project
      </div> */}
    </div>
  );
};

export default ProjectPreview;
