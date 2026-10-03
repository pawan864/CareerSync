import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the text-shadow with drop-shadow to fix any box-shadow bleeding
content = content.replace('hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)]', 'hover:drop-shadow-[0_0_4px_rgba(37,99,235,0.8)]')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)]', 'hover:drop-shadow-[0_0_4px_rgba(37,99,235,0.8)]')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
