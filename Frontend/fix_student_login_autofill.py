import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove autofill-light from Student login inputs
content = content.replace('placeholder-gray-500 autofill-light', 'placeholder-gray-500')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
