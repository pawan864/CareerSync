import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add mode="wait" to AnimatePresence
content = content.replace("<AnimatePresence>", "<AnimatePresence mode=\"wait\">")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

