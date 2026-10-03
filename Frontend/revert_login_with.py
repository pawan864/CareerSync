import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert >Login with< back to >OR<
content = content.replace('>Login with<', '>OR<')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
