import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace placeholder-gray-400 with placeholder-gray-400 placeholder:font-normal
content = content.replace('placeholder-gray-400', 'placeholder-gray-400 placeholder:font-normal placeholder:tracking-wide')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
