import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert in Login.jsx
content = content.replace('hover:text-blue-400', 'hover:drop-shadow-[0_0_4px_rgba(37,99,235,0.8)] hover:text-[#2563eb]')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert in Register.jsx
# Note: we used to have hover:text-blue-600 for some and just hover:drop-shadow for Terms/Privacy. 
# Since we replaced all of them with hover:text-blue-400, we can replace them back with hover:drop-shadow-[0_0_4px_rgba(37,99,235,0.8)] hover:text-blue-600
content = content.replace('hover:text-blue-400', 'hover:drop-shadow-[0_0_4px_rgba(37,99,235,0.8)] hover:text-blue-600')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
