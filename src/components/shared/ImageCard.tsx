/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ImageCardProps {
   title : string;
   link : string;
   image : string;
  }


export default function ImageCard({  title, link, image }:ImageCardProps) {

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <a
          target="_blank"
          href={link}
          className="text-green-500 mt-4 inline-block hover:underline cursor-pointer"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
