import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the timeline line
content = content.replace('z-0"></div>', 'z-0`}></div>')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
