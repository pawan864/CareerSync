import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_button = """<button 
                        onClick={() => setIsPaused(!isPaused)}
                        className="text-gray-700 hover:text-gray-900 hover:scale-110 active:scale-95 transition-all"
                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                    >"""

new_button = """<button 
                        onClick={() => setIsPaused(!isPaused)}
                        className="text-gray-700 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all p-1 rounded-full hover:border hover:border-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                    >"""

content = content.replace(old_button, new_button)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
