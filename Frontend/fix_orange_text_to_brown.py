import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make all orange-themed text variables a proper brown (amber-900)
content = content.replace('logoText: "text-orange-800"', 'logoText: "text-amber-900"')
content = content.replace('accentText: "text-orange-900"', 'accentText: "text-amber-900"')
content = content.replace('linkText: "text-orange-800"', 'linkText: "text-amber-900"')
content = content.replace('labelColor: "text-orange-900"', 'labelColor: "text-amber-900"')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)


reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('logoText: "text-orange-800"', 'logoText: "text-amber-900"')
content = content.replace('accentText: "text-orange-900"', 'accentText: "text-amber-900"')
content = content.replace('linkText: "text-orange-800"', 'linkText: "text-amber-900"')
content = content.replace('labelColor: "text-orange-900"', 'labelColor: "text-amber-900"')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)

