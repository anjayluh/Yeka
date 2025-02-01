import React from "react";
import { PiPlantFill, PiTreeFill, PiFlowerTulipFill, PiLeafFill } from "react-icons/pi";

const icons = [PiPlantFill, PiTreeFill, PiFlowerTulipFill, PiLeafFill];

interface RandomIconProps {
    size: number;
  }

export default function RandomIcon({size}:RandomIconProps) {
  const RandomIconComponent = icons[Math.floor(Math.random() * icons.length)];

  return <RandomIconComponent size={30} className="my-3" />;
}
