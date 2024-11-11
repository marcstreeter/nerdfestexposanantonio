import React, { useEffect, useState } from "react";

export default function ImageSlideshow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [images]);
  return (
    <img
      src={images[currentIndex].src}
      alt={`Slideshow Image ${currentIndex + 1}`}
      style={{ width: "auto", height: "auto" }}
    />
  );
}
