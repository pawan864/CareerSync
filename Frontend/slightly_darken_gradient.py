import re

# Update Home.jsx
home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('gradient: "from-white via-orange-50 to-orange-100"', 'gradient: "from-white via-orange-100 to-orange-200"')
content = content.replace('ctaGradient: "from-white via-orange-50 to-orange-100"', 'ctaGradient: "from-white via-orange-100 to-orange-200"')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('bg: "from-white via-orange-50 to-orange-100"', 'bg: "from-white via-orange-100 to-orange-200"')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update Register.jsx
reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('bg: "from-white via-orange-50 to-orange-100"', 'bg: "from-white via-orange-100 to-orange-200"')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)

