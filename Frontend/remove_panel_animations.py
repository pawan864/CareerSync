import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('animate-fade-in-left', '')
content = content.replace('animate-fade-in-right', '')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
