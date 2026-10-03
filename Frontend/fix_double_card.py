import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Shrink the main outer wrapper dynamically
old_wrapper = """            {/* Absolute positioning container wrapper so layout doesn't break during transition */}
            <div className="w-full max-w-5xl rounded-3xl min-h-[600px] shadow-2xl relative z-10 perspective-1000">"""
new_wrapper = """            {/* Absolute positioning container wrapper so layout doesn't break during transition */}
            <div className={`w-full rounded-3xl min-h-[600px] shadow-2xl relative z-10 perspective-1000 transition-all duration-700 ease-in-out ${showSupport ? 'max-w-xl' : 'max-w-5xl'}`}>"""
content = content.replace(old_wrapper, new_wrapper)

# 2. Remove the inner nested card background classes, let it just fill the motion.div
old_inner_card = """                        {showSupport ? (
                            <div className="w-full h-full flex items-center justify-center p-8 bg-blue-50/30">
                                <div className="w-full max-w-xl bg-white/60 backdrop-blur-2xl border border-gray-100 rounded-3xl p-10 shadow-lg">
                                    <div className="flex flex-col items-center text-center mb-6">"""
new_inner_card = """                        {showSupport ? (
                            <div className="w-full h-full flex flex-col justify-center p-8 sm:p-12">
                                <div className="flex flex-col items-center text-center mb-6">"""
content = content.replace(old_inner_card, new_inner_card)

# 3. Remove the extra closing divs that I added previously for the nested card
old_inner_close = """                                    </div>
                                </div>
                                </div>
                            </div>
                        ) : portal === 'Student' ? ("""
new_inner_close = """                                    </div>
                                </div>
                            </div>
                        ) : portal === 'Student' ? ("""
content = content.replace(old_inner_close, new_inner_close)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
