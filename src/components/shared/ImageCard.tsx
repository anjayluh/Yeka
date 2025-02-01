/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ImageCardProps {
   title : string;
   link : string
  }

const images = [
'https://images.pexels.com/photos/14551773/pexels-photo-14551773.jpeg?auto=compress&cs=tinysrgb&w=800',
'https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg?auto=compress&cs=tinysrgb&w=800',
'https://images.pexels.com/photos/14591396/pexels-photo-14591396.jpeg?auto=compress&cs=tinysrgb&w=800',
'https://images.pexels.com/photos/15897036/pexels-photo-15897036/free-photo-of-smiling-woman-with-basket-working-on-plantation.jpeg?auto=compress&cs=tinysrgb&w=800',
'https://images.pexels.com/photos/5727781/pexels-photo-5727781.jpeg?auto=compress&cs=tinysrgb&w=800',
'https://images.pexels.com/photos/15758701/pexels-photo-15758701/free-photo-of-close-up-of-black-soldier-fly-with-another-one-behind-it-meet-the-fly-that-could-help-save-the-planet.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

export default function ImageCard({  title, link }:ImageCardProps) {
    const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={randomImage} alt={title} />
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
