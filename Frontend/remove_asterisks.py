import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    login_content = f.read()

login_content = login_content.replace('<span className="text-red-500 ml-0.5">*</span>', '')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login_content)

register_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(register_path, 'r', encoding='utf-8') as f:
    register_content = f.read()

register_content = register_content.replace('<span className="text-red-500 ml-0.5">*</span>', '')

with open(register_path, 'w', encoding='utf-8') as f:
    f.write(register_content)

