import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace permanent underline with hover:underline
content = content.replace('className="text-blue-500 underline cursor-pointer">Terms and Conditions</button>', 'className="text-blue-500 hover:underline cursor-pointer">Terms and Conditions</button>')
content = content.replace('className="text-blue-500 underline cursor-pointer">Privacy Policy</button>', 'className="text-blue-500 hover:underline cursor-pointer">Privacy Policy</button>')

old_support = 'className="text-blue-500 underline font-semibold transition-all"'
new_support = 'className="text-blue-500 hover:underline font-semibold transition-all"'
content = content.replace(old_support, new_support)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
