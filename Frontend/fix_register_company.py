import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'className="text-xs font-semibold text-[#1e3a8a] hover:text-teal-600 flex items-center"',
    'className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] underline flex items-center"'
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
