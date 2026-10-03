import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert to standard hover state without glow
content = content.replace('hover:drop-shadow-[0_0_4px_rgba(37,99,235,0.8)] hover:text-[#2563eb]', 'hover:text-[#1d4ed8]')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert in Register.jsx
content = content.replace('hover:drop-shadow-[0_0_4px_rgba(37,99,235,0.8)] hover:text-blue-600', 'hover:text-blue-800')
content = content.replace(' hover:drop-shadow-[0_0_4px_rgba(37,99,235,0.8)]', '')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
