import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make it beautifully light navy blue (solid, to hide bleed-through)!
old_motion = """                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500 ${showSupport ? 'bg-white/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]' : 'bg-white shadow-2xl'}`}"""
new_motion = """                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500 ${showSupport ? 'bg-blue-50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]' : 'bg-white shadow-2xl'}`}"""
content = content.replace(old_motion, new_motion)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
