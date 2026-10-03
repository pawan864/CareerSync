import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add dynamic glow and dot colors to Slide 1
old_s1 = 'btn2Color: "border-blue-900 text-blue-900 hover:bg-blue-50"\n    },'
new_s1 = 'btn2Color: "border-blue-900 text-blue-900 hover:bg-blue-50",\n        pillGlow: "hover:border-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.7)]",\n        activeDot: "bg-blue-800 w-5",\n        iconHover: "hover:text-blue-600"\n    },'
content = content.replace(old_s1, new_s1)

# Slide 2
old_s2 = 'btn2Color: "border-indigo-900 text-indigo-900 hover:bg-indigo-50"\n    },'
new_s2 = 'btn2Color: "border-indigo-900 text-indigo-900 hover:bg-indigo-50",\n        pillGlow: "hover:border-indigo-400 hover:shadow-[0_0_12px_rgba(99,102,241,0.7)]",\n        activeDot: "bg-indigo-800 w-5",\n        iconHover: "hover:text-indigo-600"\n    },'
content = content.replace(old_s2, new_s2)

# Slide 3 (note: it might end without a comma, so we check carefully)
old_s3 = 'btn2Color: "border-orange-800 text-orange-900 hover:bg-orange-50"\n    }'
new_s3 = 'btn2Color: "border-orange-800 text-orange-900 hover:bg-orange-50",\n        pillGlow: "hover:border-orange-400 hover:shadow-[0_0_12px_rgba(249,115,22,0.7)]",\n        activeDot: "bg-orange-800 w-5",\n        iconHover: "hover:text-orange-600"\n    }'
content = content.replace(old_s3, new_s3)

# Update the pill container to use the dynamic `pillGlow` class
old_container = '<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:border-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.7)] shadow-sm transition-all duration-300 cursor-pointer group">'
new_container = '<div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm transition-all duration-500 cursor-pointer group ${heroSlides[currentSlide].pillGlow}`}>'
content = content.replace(old_container, new_container)

# Update the play/pause button hover color
old_button = '<button \n                        onClick={() => setIsPaused(!isPaused)}\n                        className="text-gray-700 hover:text-gray-900 hover:scale-110 active:scale-95 transition-all"\n                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}\n                    >'
new_button = '<button \n                        onClick={() => setIsPaused(!isPaused)}\n                        className={`text-gray-700 hover:scale-110 active:scale-95 transition-all ${heroSlides[currentSlide].iconHover}`}\n                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}\n                    >'
content = content.replace(old_button, new_button)

# Update the dots logic
old_dots = "${currentSlide === idx ? 'bg-gray-800 w-5' : 'bg-gray-500/80 hover:bg-gray-700 w-1.5'}"
new_dots = "${currentSlide === idx ? heroSlides[currentSlide].activeDot : 'bg-gray-500/80 hover:bg-gray-700 w-1.5'}"
content = content.replace(old_dots, new_dots)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
