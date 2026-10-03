import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('Create Faculty Account', 'Create new account')
content = content.replace('Create {portal} Account', 'Create new account')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
