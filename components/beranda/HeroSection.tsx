"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

const slides = [
  {
    id: 0,
    image: "/images/bg-1.png",
  },
  {
    id: 1,
    image: "/images/bg-2.jpg",
  },

  {
    id: 2,
    image: "/images/bg-3.jpg",
  }
];


export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFirstLoad] = useState(true);

  const [prevSlide, setPrevSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        setDirection(1);
        setPrevSlide(prev);
        return (prev + 1) % slides.length;
      });
    }, 5500);

    slides.forEach((s) => {
      const img = new window.Image();
      img.src = s.image;
    });

    return () => clearInterval(timer);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSlideChange = (newIndex: number) => {
    setPrevSlide(current);
    setDirection(newIndex > current ? 1 : -1);
    setCurrent(newIndex);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Previous */}
        <motion.div
          key={`prev-${current}`}
          initial={{ x: 0 }}
          animate={{ x: direction > 0 ? "-100%" : "100%" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="absolute inset-0"
        >
          <Image
            src={slides[prevSlide].image}
            alt="prev"
            fill
            className="object-cover"
          />
        </motion.div>
        {/* Current */}
        <motion.div
          key={`current-${current}`}
          initial={{ x: direction > 0 ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt="current"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Gradient Overlay  */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center lg:items-end pb-12 md:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Headline Kecil */}
            <motion.div
              initial={isFirstLoad ? { opacity: 0, x: -30 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
              className="text-white text-xs sm:text-sm md:text-base font-regular tracking-wider mb-3 md:mb-4"
            >
              Bersama Nagira Farm
            </motion.div>

            {/* Headline Besar */}
            <motion.h1
              initial={isFirstLoad ? { opacity: 0, x: -40 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight tracking-tight mb-3 md:mb-4"
            >
              Tingkatkan Kemandirian dan{" "}
              <span className="relative z-10">Ketahanan Pangan</span>
            </motion.h1>

            {/* Deskripsi */}
            <motion.p
              initial={isFirstLoad ? { opacity: 0, x: -50 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
              className="text-green-50/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Nagira Farm menghadirkan solusi peternakan di Majalengka dengan standar kualitas terbaik
              untuk kebutuhan pangan Anda.
            </motion.p>

            {/* CTA Button*/}
            <motion.div
              initial={isFirstLoad ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
              className="flex justify-center lg:justify-start"
            >
              <button
                onClick={scrollToNextSection}
                className="group inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg hover:shadow-green-700/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="text-sm sm:text-base">Explore More</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleSlideChange(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${i === current
              ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-white"
              : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}