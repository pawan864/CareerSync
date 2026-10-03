import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Revert input text size to text-xs to perfectly match Login.jsx
content = content.replace('transition-colors text-sm placeholder-gray-400', 'transition-colors text-xs placeholder-gray-400')

# 2. Increase the Terms and Privacy agreement text size from text-[11px] to text-xs
content = content.replace('className={`ml-2 text-[11px] font-medium leading-tight', 'className={`ml-2 text-xs font-medium leading-tight')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
