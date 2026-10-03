import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hover:text-[#1d4ed8] with the text-shadow glow effect, and remove the color change
# The color is text-[#2563eb].
content = content.replace('hover:text-[#1d4ed8]', 'hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)] hover:text-[#2563eb]')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
