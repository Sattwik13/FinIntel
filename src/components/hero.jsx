"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

const HeroSection = () => {
 
    const imageRef = useRef(null);

    useEffect(() => {
      const imageElement = imageRef.current;

      const handleScroll = () =>{
        const scrollPosition = window.scrollY;
        const scrollThreshold = 100;  

        if(scrollPosition>scrollThreshold) {
            imageElement.classList.add("scrolled");
        } else {
            imageElement.classList.remove("scrolled");
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className="pb-20 px-4">
     <div className="container mx-auto text-center">
        {/* <h1 className="text-5xl md:text-7xl lg:text-[105px] pb-6 gradient-title">
            
            Manage Your Finances <br /> With AI
        </h1> */}
        <motion.h1
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-5xl md:text-7xl lg:text-[105px] pb-6 gradient-title"
    >
      Manage Your Finances <br /> With AI
    </motion.h1>
        <p className="text-xl py-3 text-gray-600 font-mono mb-8 max-w-2xl mx-auto">
          <Typewriter
              options={{
                strings: ["An AI-powered Finantial management platform that helps you track, analyze, and optimize your with real-time insights. ",
                          "Smart. Secure. Effortless.",
                          "AI-Powered Financial Intelligence",
                          "Welcome to Your Intelligent Finance Companion",
                        ],
                autoStart: true,
                loop: true,
              }}
            />
            
        </p>
        <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
             <Button size="lg" className="px-8 bg-gradient-to-br from-emerald-600 via-teal-800 to-blue-00 animate-gradient">
               Get Started
             </Button>
            </Link>
            <Link href="https://www.youtube.com">
             <Button size="lg" className="px-8 bg-gradient-to-br from-emerald-600 via-teal-800 to-blue-00 animate-gradient">
               Watch Demo
             </Button>
            </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
            <div ref={imageRef} className="hero-image">
                <Image src='/banner.jpg'
                width={1100}
                height={720}
                alt="Dashboard Preview"
                className="rounded-lg shadow-2xl border mx-auto"
                priority
                />
            </div>
        </div>
     </div>
    </div>
  )
};

export default HeroSection;
