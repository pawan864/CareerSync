import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('h-full`', 'h-full`}')
content = content.replace('font-medium`', 'font-medium`}')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
