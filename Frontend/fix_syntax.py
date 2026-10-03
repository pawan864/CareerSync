import re

pb_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ProfileBuilder.jsx'
with open(pb_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix syntax error
content = content.replace('{isActive && !isCurrent ?  : }', '')
content = content.replace('{isActive && !isCurrent ?  : <Icon className="w-4 h-4" />}', '')

with open(pb_path, 'w', encoding='utf-8') as f:
    f.write(content)

