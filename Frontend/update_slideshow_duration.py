import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Decrease setInterval duration from 6000 to 4000
content = content.replace("}, 6000);", "}, 4000);")

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
