import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace border with ring-2 to make it pop inside the box
content = content.replace(
    "'bg-[#050505] border border-red-500 shadow-[0_0_40px_rgba(220,38,38,0.2)]'",
    "'bg-[#050505] ring-2 ring-inset ring-red-500 shadow-[0_0_40px_rgba(220,38,38,0.3)]'"
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
