import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Decrease setInterval duration from 4000 to 3000
content = content.replace("}, 4000);", "}, 3000);")

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
