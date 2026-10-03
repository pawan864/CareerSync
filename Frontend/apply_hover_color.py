import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make the outer card use the exact background and blur that was used during hover!
old_motion = """                        className={`absolute inset-0 w-full h-full bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500 ${showSupport ? 'shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]' : 'shadow-2xl'}`}"""
new_motion = """                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500 ${showSupport ? 'bg-white/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]' : 'bg-white shadow-2xl'}`}"""
content = content.replace(old_motion, new_motion)

# Remove the inner tint so it's just pure
old_inner = 'className="w-full bg-blue-50/40 border border-blue-100 p-8 flex flex-col justify-center h-full"'
new_inner = 'className="w-full p-8 flex flex-col justify-center h-full"'
content = content.replace(old_inner, new_inner)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
