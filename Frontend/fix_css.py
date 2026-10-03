import re

css_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\index.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the faulty background-clip rule
content = content.replace('    -webkit-background-clip: text;\n', '')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)
