import re

# Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()
# Change orange theme primaryBtn to a nice brown
content = content.replace('primaryBtn: "bg-orange-600 hover:bg-orange-700"', 'primaryBtn: "bg-amber-800 hover:bg-amber-900"')
with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update Register.jsx
reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('primaryBtn: "bg-orange-600 hover:bg-orange-700"', 'primaryBtn: "bg-amber-800 hover:bg-amber-900"')
with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)

