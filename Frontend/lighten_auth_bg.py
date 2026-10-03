import re

# Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the dark orange gradient
content = content.replace('bg: "from-white via-orange-200 to-orange-500"', 'bg: "from-white via-orange-50 to-orange-100"')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)


# Update Register.jsx
reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('bg: "from-white via-orange-200 to-orange-500"', 'bg: "from-white via-orange-50 to-orange-100"')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)

