import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("Moon } , X }", "Moon, X }")

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
