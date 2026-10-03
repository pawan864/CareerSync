import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all text-teal-600 with text-blue-600 in Register.jsx
content = content.replace('text-teal-600', 'text-blue-600')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)

