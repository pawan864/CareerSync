import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix imports
content = content.replace("import React from 'react';", "import React, { useState, useEffect } from 'react';")
content = content.replace("import { motion } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';")

# Extract the old Hero section text to replace
old_hero = """<div className="bg-gradient-to-r from-white via-blue-200 to-blue-500 w-full min-h-[calc(100vh-4rem)] flex items-center border-b border-gray-200 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* Left Content */}
                        <div className="md:w-1/2 text-left mb-12 md:mb-0 pr-0 md:pr-10">
                            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-900 font-semibold text-sm mb-6 border border-blue-200">
                                The Future of Campus Placements
                            </div>
                            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl xl:text-5xl mb-6">
                                <span className="block md:whitespace-nowrap">Connecting Top Campus Talent</span>
                                <span className="block text-gray-900 mt-2 md:whitespace-nowrap">With Industry Leaders</span>
                            </h1>
                            <p className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed italic">
                                Empowering students with AI-driven skill mapping, connecting industries with top-tier verified talent, and providing TPOs with real-time placement analytics.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                                <Link to="/register" className="flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-md text-white bg-blue-900 hover:bg-blue-800 shadow-lg transition-transform hover:-translate-y-1">
                                    Join as Student
                                </Link>
                                <Link to="/jobs" className="flex items-center justify-center px-6 py-2.5 border-2 border-blue-900 text-sm font-bold rounded-md text-blue-900 bg-white hover:bg-blue-50 shadow transition-transform hover:-translate-y-1">
                                    Explore Opportunities
                                </Link>
                            </div>


                        </div>

                        {/* Right Content Spacer (so text doesn't span full width on large screens) */}
                        <div className="md:w-1/2 hidden md:block"></div>
                    </div>
                </div>

                {/* Absolute Bottom-Anchored Image */}
                <img 
                    src="/hero-student-transparent.jpg?v=13" 
                    alt="Isolated Indian college student boy" 
                    className="hidden md:block absolute bottom-0 right-0 lg:right-[5%] xl:right-[10%] w-auto h-[90%] max-h-[850px] object-contain object-bottom mix-blend-multiply pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(to top, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                />
            </div>"""

slides_logic = """
const heroSlides = [
    {
        id: 1,
        tagline: "The Future of Campus Placements",
        title1: "Connecting Top Campus Talent",
        title2: "With Industry Leaders",
        description: "Empowering students with AI-driven skill mapping, connecting industries with top-tier verified talent, and providing TPOs with real-time placement analytics.",
        button1: "Join as Student",
        button1Link: "/register",
        button2: "Explore Opportunities",
        button2Link: "/jobs",
        imageSrc: "/hero-student-transparent.jpg?v=13",
        imageAlt: "Isolated Indian college student boy",
        gradient: "from-white via-blue-200 to-blue-500",
        taglineBg: "bg-blue-100 text-blue-900 border-blue-200",
        btn1Color: "bg-blue-900 hover:bg-blue-800",
        btn2Color: "border-blue-900 text-blue-900 hover:bg-blue-50"
    },
    {
        id: 2,
        tagline: "Empowering Your Career Journey",
        title1: "Discover Your True Potential",
        title2: "With AI-Powered Insights",
        description: "Build a dynamic profile, instantly match with top employers, and jumpstart your career through CareerSync's intelligent placement engine.",
        button1: "Get Started Now",
        button1Link: "/register",
        button2: "Learn More",
        button2Link: "/about",
        imageSrc: "/hero-girl-transparent.jpg",
        imageAlt: "Isolated female student",
        gradient: "from-white via-indigo-200 to-indigo-500",
        taglineBg: "bg-indigo-100 text-indigo-900 border-indigo-200",
        btn1Color: "bg-indigo-900 hover:bg-indigo-800",
        btn2Color: "border-indigo-900 text-indigo-900 hover:bg-indigo-50"
    }
];
"""

new_hero = """            {/* Hero Section Slideshow */}
            <div className="relative w-full min-h-[calc(100vh-4rem)] flex items-center border-b border-gray-200 overflow-hidden bg-white">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentSlide}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient} flex items-center`}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10 h-full flex items-center">
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                {/* Left Content */}
                                <div className="md:w-1/2 text-left mb-12 md:mb-0 pr-0 md:pr-10">
                                    <div className={`inline-block px-4 py-1 rounded-full font-semibold text-sm mb-6 border ${heroSlides[currentSlide].taglineBg}`}>
                                        {heroSlides[currentSlide].tagline}
                                    </div>
                                    <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl xl:text-5xl mb-6">
                                        <span className="block md:whitespace-nowrap">{heroSlides[currentSlide].title1}</span>
                                        <span className="block text-gray-900 mt-2 md:whitespace-nowrap">{heroSlides[currentSlide].title2}</span>
                                    </h1>
                                    <p className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed italic">
                                        {heroSlides[currentSlide].description}
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                                        <Link to={heroSlides[currentSlide].button1Link} className={`flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-md text-white shadow-lg transition-transform hover:-translate-y-1 ${heroSlides[currentSlide].btn1Color}`}>
                                            {heroSlides[currentSlide].button1}
                                        </Link>
                                        <Link to={heroSlides[currentSlide].button2Link} className={`flex items-center justify-center px-6 py-2.5 border-2 text-sm font-bold rounded-md bg-white shadow transition-transform hover:-translate-y-1 ${heroSlides[currentSlide].btn2Color}`}>
                                            {heroSlides[currentSlide].button2}
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Right Content Spacer */}
                                <div className="md:w-1/2 hidden md:block"></div>
                            </div>
                        </div>

                        {/* Absolute Bottom-Anchored Image */}
                        <img 
                            src={heroSlides[currentSlide].imageSrc} 
                            alt={heroSlides[currentSlide].imageAlt} 
                            className="hidden md:block absolute bottom-0 right-0 lg:right-[5%] xl:right-[10%] w-auto h-[90%] max-h-[850px] object-contain object-bottom mix-blend-multiply pointer-events-none"
                            style={{
                                maskImage: 'linear-gradient(to top, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Slideshow Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {heroSlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-gray-800 w-8' : 'bg-gray-400 hover:bg-gray-600'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>"""

content = content.replace("const Home = () => {", slides_logic + "\nconst Home = () => {\n    const [currentSlide, setCurrentSlide] = useState(0);\n\n    useEffect(() => {\n        const timer = setInterval(() => {\n            setCurrentSlide((prev) => (prev === 1 ? 0 : 1));\n        }, 6000);\n        return () => clearInterval(timer);\n    }, []);")
content = content.replace(old_hero, new_hero)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
