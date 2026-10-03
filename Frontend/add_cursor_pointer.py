import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('className="text-blue-600">Terms and Conditions</button>', 'className="text-blue-600 cursor-pointer">Terms and Conditions</button>')
content = content.replace('className="text-blue-600">Privacy Policy</button>', 'className="text-blue-600 cursor-pointer">Privacy Policy</button>')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
