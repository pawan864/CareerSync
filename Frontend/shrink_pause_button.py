import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_dots = """                {/* Slideshow Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-20 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 shadow-sm">
                    {/* Play/Pause Toggle */}
                    <button 
                        onClick={() => setIsPaused(!isPaused)}
                        className="text-gray-800 hover:text-blue-600 transition-colors"
                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                    >
                        {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                    </button>
                    
                    {/* Dots */}
                    <div className="flex space-x-2 border-l border-gray-400/50 pl-3">
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentSlide(idx);
                                    setIsPaused(true); // Auto-pause if user manually clicks a dot
                                }}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-gray-800 w-8' : 'bg-gray-500 hover:bg-gray-700'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>"""

new_dots = """                {/* Slideshow Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm transition-all duration-300 cursor-pointer group">
                    {/* Play/Pause Toggle */}
                    <button 
                        onClick={() => setIsPaused(!isPaused)}
                        className="text-gray-700 hover:text-gray-900 hover:scale-110 active:scale-95 transition-all"
                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                    >
                        {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
                    </button>
                    
                    {/* Dots */}
                    <div className="flex space-x-1.5 border-l border-gray-400/30 pl-2">
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentSlide(idx);
                                    setIsPaused(true);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-gray-800 w-5' : 'bg-gray-500/80 hover:bg-gray-700 w-1.5'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>"""

content = content.replace(old_dots, new_dots)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
