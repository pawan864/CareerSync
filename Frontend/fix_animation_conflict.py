import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove transition-all duration-500 from the motion.div to stop it from conflicting with Framer Motion
content = content.replace("lg:flex-row transition-all duration-500", "lg:flex-row")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
