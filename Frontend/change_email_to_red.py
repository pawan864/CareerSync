import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change the blue/purple gradient stops to red
content = content.replace('<stop stopColor="#3b82f6" />', '<stop stopColor="#ef4444" />')
content = content.replace('<stop offset="1" stopColor="#8b5cf6" />', '<stop offset="1" stopColor="#dc2626" />')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
