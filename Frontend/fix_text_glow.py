import re

files = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Footer.jsx'
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace drop-shadow with text-shadow
    content = content.replace('hover:drop-shadow-[0_0_8px_rgba(30,58,138,0.8)]', 'hover:[text-shadow:0_0_8px_rgba(30,58,138,0.8)]')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

