import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace italic with font-[cursive]
content = content.replace('className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed italic"', 'className="text-2xl text-gray-500 mb-8 max-w-xl leading-relaxed font-[cursive]"')
# Note: I increased text size to text-2xl because cursive fonts run very small compared to sans-serif fonts

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
