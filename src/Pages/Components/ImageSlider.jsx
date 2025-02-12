import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/hd1.jpg",
  "/images/hd2.jpg",
  "/images/hd3.jpg",
];

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[800px] overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Community Event"
          className="w-full h-full object-cover rounded-lg"
          initial={{ clipPath: "circle(0% at 50% 50%)" }} // Starts as a small dot
          animate={{ clipPath: "circle(100% at 50% 50%)" }} // Expands outward
          exit={{ clipPath: "circle(0% at 50% 50%)" }} // Shrinks back in
          transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth effect
        />
      </AnimatePresence>

      {/* Dots Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition ${
              currentImage === index ? "bg-orange-600 scale-125" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
