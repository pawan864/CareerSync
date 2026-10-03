import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_class = 'className="w-full bg-white/50 backdrop-blur-xl border border-white/60 p-8 flex flex-col justify-center h-full"'
new_class = 'className="w-full bg-white/50 hover:bg-white/60 backdrop-blur-xl border border-white/60 hover:border-white/80 hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] p-8 flex flex-col justify-center h-full transition-all duration-500"'

content = content.replace(old_class, new_class)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
