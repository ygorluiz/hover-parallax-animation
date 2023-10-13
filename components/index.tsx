"use client";

import React, { useRef, useState } from "react";

import ProjectItem from "./ListItem";
import { projects } from "../utils/dummyData";
import { ProjectBox } from "./Box";

type ProjectBoxRef = {
  animateIn: () => void;
  animateOut: () => void;
};

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projectBoxRef = useRef<ProjectBoxRef | null>(null);
  const offsets = useRef<{ x: number | undefined; y: number | undefined }[]>(
    []
  );

  const handleMove = (event: { x: number; y: number; index: number }) => {
    const { x, y, index } = event;
    offsets.current[index] = { x, y };
  };

  return (
    <div className="relative py-[6.25rem]">
      <div className="px-[0.75rem] md:px-[2.5rem] mx-auto">
        <div className="pb-[1.25rem]">
          <div className="items-start">
            <h3 className="text-[1.5rem] md:text-[2.4rem] normal-case leading-none -tracking-[0.01rem]">
              Hover Parallax Animation (hover mouse on the items below)
            </h3>
          </div>
        </div>

        <div
          onMouseEnter={() => projectBoxRef.current?.animateIn()}
          onMouseLeave={() => projectBoxRef.current?.animateOut()}
        >
          {React.Children.toArray(
            projects.map((project, index) => (
              <ProjectItem
                serialNumber={project.id}
                projectName={project.projectName}
                index={index}
                onEnter={(index) => setActiveIndex(index)}
                onMove={(event) => handleMove(event)}
              />
            ))
          )}
        </div>

        <ProjectBox
          projectImages={projects}
          activeIndex={activeIndex}
          ref={projectBoxRef}
          offsets={offsets.current}
        />

        {/* Project Footer */}
        <div className="pt-[3rem]">
          <h3 className="text-[2.4rem] font-monument normal-case leading-none -tracking-[0.01rem] mb-3">
            Want to see more?
          </h3>
          <p className="normal-case font-migra text-xl">
            <span>Reach out to me at</span>
            <a
              href="mailto:contact@dindustack.com"
              className="relative py-1 ml-1"
            >
              contact@dindustack.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
