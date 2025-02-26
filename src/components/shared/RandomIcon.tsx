import React, { useState, useEffect } from "react";
import { PiPlantFill, PiTreeFill, PiFlowerTulipFill, PiLeafFill } from "react-icons/pi";

const icons = [PiPlantFill, PiTreeFill, PiFlowerTulipFill, PiLeafFill];

interface RandomIconProps {
  size: number;
}

export default function RandomIcon({ size }: RandomIconProps) {
  const [RandomIconComponent, setRandomIconComponent] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    // Select a random icon component
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    setRandomIconComponent(React.createElement(randomIcon, { size, className: "my-3" }));
  }, []); // Runs only on the client

  // If the RandomIconComponent is null, render nothing
  if (!RandomIconComponent) {
    return null;
  }

  // Render the dynamically selected icon component
  return <>{RandomIconComponent}</>;
}
