import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Restore the transparent glassmorphism for showSupport
old_motion = """                        className="absolute inset-0 w-full h-full bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] transition-shadow duration-500\""""
new_motion = """                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-all duration-500 ${showSupport ? 'bg-transparent hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.6)]' : 'bg-white'}`}"""
content = content.replace(old_motion, new_motion)

old_inner = 'className="w-full bg-transparent p-8 flex flex-col justify-center h-full transition-all duration-500"'
new_inner = 'className="w-full bg-white/60 hover:bg-white/90 backdrop-blur-2xl border border-white/60 hover:border-white p-8 flex flex-col justify-center h-full transition-all duration-500"'
content = content.replace(old_inner, new_inner)

# 2. Fix the bleed-through by making the old component vanish immediately when exiting!
old_variants = """    const pageVariants = {
        initial: { x: '100%', opacity: 1, zIndex: 10 },
        in: { x: 0, opacity: 1, zIndex: 10 },
        out: { 
            zIndex: 0,
            transition: { delay: 0.6 } // Keep it mounted underneath while the new one wipes over it
        }
    };"""
new_variants = """    const pageVariants = {
        initial: { x: '100%', opacity: 1, zIndex: 10 },
        in: { x: 0, opacity: 1, zIndex: 10 },
        out: { 
            opacity: 0,
            zIndex: 0,
            transition: { duration: 0.2 } // Fade out instantly so it doesn't bleed through the incoming glass card!
        }
    };"""
content = content.replace(old_variants, new_variants)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
