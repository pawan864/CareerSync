import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <AnimatePresence> with <AnimatePresence mode="wait">
content = content.replace("<AnimatePresence>", "<AnimatePresence mode=\"wait\">")

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
