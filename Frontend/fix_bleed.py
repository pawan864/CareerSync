import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix outer motion.div back to solid white so the old form doesn't bleed through!
old_motion = """                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-all duration-300 ${showSupport ? 'bg-transparent hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]' : 'bg-white'}`}"""
new_motion = """                        className="absolute inset-0 w-full h-full bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] transition-shadow duration-500\""""
content = content.replace(old_motion, new_motion)

# Remove the inner card's glassmorphism so it's just plain content on the solid white card!
old_inner = 'className="w-full bg-white/70 hover:bg-white/90 backdrop-blur-2xl border border-white/60 hover:border-white p-8 flex flex-col justify-center h-full transition-all duration-500"'
new_inner = 'className="w-full bg-transparent p-8 flex flex-col justify-center h-full transition-all duration-500"'
content = content.replace(old_inner, new_inner)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
