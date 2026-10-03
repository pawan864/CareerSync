import re

# Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()
# Revert to the exact cream color from the homepage workflow cards
content = content.replace('cardBg: "bg-[#f4e8dc]"', 'cardBg: "bg-[#fdfbf5]"')
with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update Register.jsx
reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('cardBg: "bg-[#f4e8dc]"', 'cardBg: "bg-[#fdfbf5]"')
with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)

