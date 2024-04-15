"use client";
import React from "react";
import Image from "next/image";
import { wonders } from "@/data";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

function Page({ params }) {
  const { tag } = params;
  const data = wonders.find((wonder) => wonder.link === `/wonders/${tag}`);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
  return (
    <div className="flex w-screen max-h-screen overflow-y-hidden">
      <div className="flex-1 h-screen bg-gray-200 ">
        <Image
          src={data.src}
          width={820}
          height={1080}
          alt="Le Grand Canyon"
          className="object-cover w-full h-full"
        />
      </div>
      <div ref={container} className="relative flex-1 p-4 py-8 overflow-auto ">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold text-gray-800">{data.name}</h1>
            <span className="flex items-center gap-2 mt-2">
              <p className="text-sm text-gray-600">{data.location}</p>
              <p>-</p>
              <p className="text-sm text-gray-600">{data.date_of_creation}</p>
            </span>
          </div>
        </div>
        <p className="mt-8 text-sm leading-7 text-gray-800">
          {data.descriptionFull}
        </p>
        <div class="sketchfab-embed-wrapper">
          <iframe
            title="El Castillo at Chichén Itzá"
            frameborder="0"
            allowfullscreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            className="w-full mt-8 h-96"
            web-share
            src={data.embed}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Page;
