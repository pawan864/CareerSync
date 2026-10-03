import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert font-bold to font-semibold and bg-blue-50 to bg-blue-100
content = content.replace('bg-blue-50 text-blue-900 font-bold text-sm mb-6 border border-blue-200', 'bg-blue-100 text-blue-900 font-semibold text-sm mb-6 border border-blue-200')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
