import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('className="text-2xl text-gray-500 mb-8 max-w-xl leading-relaxed font-[cursive]"', 'className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed italic"')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
