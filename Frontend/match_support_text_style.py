import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the bulky font-medium and custom placeholder rules with standard text-sm
content = content.replace('text-sm font-medium placeholder-gray-400 placeholder:font-medium placeholder:tracking-normal', 'text-sm placeholder-gray-400')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
