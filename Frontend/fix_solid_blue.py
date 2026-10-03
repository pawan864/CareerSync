import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Restore the animation delay so slide works flawlessly
old_variants = """    const pageVariants = {
        initial: { x: '100%', opacity: 1, zIndex: 10 },
        in: { x: 0, opacity: 1, zIndex: 10 },
        out: { 
            opacity: 0,
            zIndex: 0,
            transition: { duration: 0.2 } // Fade out instantly so it doesn't bleed through the incoming glass card!
        }
    };"""
new_variants = """    const pageVariants = {
        initial: { x: '100%', opacity: 1, zIndex: 10 },
        in: { x: 0, opacity: 1, zIndex: 10 },
        out: { 
            zIndex: 0,
            transition: { delay: 0.6 } // Keep it mounted underneath while the new one wipes over it
        }
    };"""
content = content.replace(old_variants, new_variants)

# 2. Fix the motion.div to ALWAYS be solid white to prevent bleed-through, but give it the permanent blue glow when showSupport is true!
old_motion = """                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-all duration-500 ${showSupport ? 'bg-transparent hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.6)]' : 'bg-white'}`}"""
new_motion = """                        className={`absolute inset-0 w-full h-full bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500 ${showSupport ? 'shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]' : 'shadow-2xl'}`}"""
content = content.replace(old_motion, new_motion)

# 3. Fix the inner container to just have the nice light navy/blue background permanently, without any hover effects.
old_inner = 'className="w-full bg-white/60 hover:bg-white/90 backdrop-blur-2xl border border-white/60 hover:border-white p-8 flex flex-col justify-center h-full transition-all duration-500"'
new_inner = 'className="w-full bg-blue-50/40 border border-blue-100 p-8 flex flex-col justify-center h-full"'
content = content.replace(old_inner, new_inner)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
