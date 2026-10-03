import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken spans
content = content.replace('font-bold`}>76</span>', 'font-bold">76</span>')
content = content.replace('font-bold`}>3</span>', 'font-bold">3</span>')
content = content.replace('font-bold`}>24</span>', 'font-bold">24</span>')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
