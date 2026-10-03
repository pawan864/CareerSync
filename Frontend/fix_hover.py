import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the outer motion.div so its background changes to transparent if showSupport is true
old_motion = """                        className="absolute inset-0 w-full h-full bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl\""""
new_motion = """                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-all duration-300 ${showSupport ? 'bg-transparent hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]' : 'bg-white'}`}"""
content = content.replace(old_motion, new_motion)

old_card = 'className="w-full bg-white/50 hover:bg-white/60 backdrop-blur-xl border border-white/60 hover:border-white/80 hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] p-8 flex flex-col justify-center h-full transition-all duration-500"'
new_card = 'className="w-full bg-white/70 hover:bg-white/90 backdrop-blur-2xl border border-white/60 hover:border-white p-8 flex flex-col justify-center h-full transition-all duration-500"'
content = content.replace(old_card, new_card)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
