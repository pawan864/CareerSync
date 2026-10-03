import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the red border highly visible: border-2 border-red-600 instead of border border-red-500/40
content = content.replace(
    "'bg-[#050505] border border-red-500/40 shadow-[0_0_40px_rgba(220,38,38,0.15)]'",
    "'bg-[#050505] border border-red-500 shadow-[0_0_40px_rgba(220,38,38,0.2)]'"
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
