import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Revert wrapper
old_wrapper = """            {/* Absolute positioning container wrapper so layout doesn't break during transition */}
            <div className={`w-full rounded-3xl min-h-[600px] shadow-2xl relative z-10 perspective-1000 transition-all duration-700 ease-in-out ${showSupport ? 'max-w-xl' : 'max-w-5xl'}`}>"""
new_wrapper = """            {/* Absolute positioning container wrapper so layout doesn't break during transition */}
            <div className="w-full max-w-5xl rounded-3xl min-h-[600px] shadow-2xl relative z-10 perspective-1000">"""
content = content.replace(old_wrapper, new_wrapper)

# Revert inner content to just be centered form inside the large white card
old_inner = """                        {showSupport ? (
                            <div className="w-full h-full flex flex-col justify-center p-8 sm:p-12">
                                <div className="flex flex-col items-center text-center mb-6">"""
new_inner = """                        {showSupport ? (
                            <div className="w-full bg-white/50 backdrop-blur-xl border border-white/60 p-8 flex flex-col justify-center h-full">
                                <div className="flex flex-col items-center text-center mb-6">"""
content = content.replace(old_inner, new_inner)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
