import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('Contact Admin\n                                </Link>', 'Contact Technical Support\n                                </Link>')
# Just in case of different formatting:
content = content.replace('>Contact Admin<', '>Contact Technical Support<')
content = content.replace('Contact Admin', 'Contact Technical Support')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
