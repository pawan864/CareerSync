import re

# Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()
# Replace cream with a noticeable light brown
content = content.replace('cardBg: "bg-[#fdfbf5]"', 'cardBg: "bg-[#f4e8dc]"')
with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update Register.jsx
reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('cardBg: "bg-[#fdfbf5]"', 'cardBg: "bg-[#f4e8dc]"')
with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)

