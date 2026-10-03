import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the red border and intense glow appear ONLY on hover
old_class = "'bg-[#050505] ring-2 ring-inset ring-red-500 shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_80px_rgba(220,38,38,0.6)] hover:-translate-y-1 transition-all duration-500'"
new_class = "'bg-[#050505] shadow-2xl hover:ring-2 hover:ring-inset hover:ring-red-500 hover:shadow-[0_0_60px_rgba(220,38,38,0.3)] transition-all duration-500'"

content = content.replace(old_class, new_class)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
