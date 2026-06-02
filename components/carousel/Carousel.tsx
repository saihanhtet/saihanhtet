'use client'

import React, { useState, useEffect, useCallback } from "react";
import "./Carousel.css";

interface CarouselProps {
  slides: React.ReactElement[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToPreviousSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [goToNextSlide]);

  return (
    <div className="carousel">
      <div
        className="carousel-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            {slide}
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={goToPreviousSlide}>
        <i className="fa-solid fa-caret-left"></i>
      </button>
      <button className="next-button" onClick={goToNextSlide}>
        <i className="fa-solid fa-caret-right"></i>
      </button>
    </div>
  );
};

export default Carousel;
