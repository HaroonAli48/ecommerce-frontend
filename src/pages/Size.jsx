import React, { useState } from "react";
import { assets } from "../assets/assets";

export default function SizeChart() {
  const [zoomImage, setZoomImage] = useState(null);

  const images = [{ src: assets.size, alt: "Size Chart 1" }];

  return (
    <div className="min-h-screen bg-gray-50 ">
      <h1 className="text-3xl font-bold text-center mb-2">Size Chart</h1>
      <p className="text-center text-gray-600 mb-4">
        Find your perfect fit with our detailed size charts.
      </p>

      <div className="flex justify-center items-center gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className="max-w-full h-auto rounded-lg shadow-lg cursor-zoom-in hover:scale-105 transition-transform"
            onClick={() => setZoomImage(img.src)}
          />
        ))}
      </div>

      {zoomImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setZoomImage(null)}
        >
          <img
            src={zoomImage}
            alt="Zoomed Size Chart"
            className="max-h-full max-w-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
