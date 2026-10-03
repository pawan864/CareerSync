import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert button to original (no p-1, no border glow)
old_button = """<button 
                        onClick={() => setIsPaused(!isPaused)}
                        className="text-gray-700 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all p-1 rounded-full hover:border hover:border-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                    >"""

new_button = """<button 
                        onClick={() => setIsPaused(!isPaused)}
                        className="text-gray-700 hover:text-gray-900 hover:scale-110 active:scale-95 transition-all"
                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                    >"""

content = content.replace(old_button, new_button)

# Add border glow to the outer pill container on hover
old_container = """<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm transition-all duration-300 cursor-pointer group">"""

new_container = """<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:border-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.7)] shadow-sm transition-all duration-300 cursor-pointer group">"""

content = content.replace(old_container, new_container)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
