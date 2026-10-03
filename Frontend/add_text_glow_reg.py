import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# For Sign in and Contact Admin
content = content.replace('hover:text-blue-800', 'hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)] hover:text-blue-600')

# For Terms and Privacy
content = content.replace('className="text-blue-600 hover:underline"', 'className="text-blue-600 hover:underline hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)] transition-all"')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
