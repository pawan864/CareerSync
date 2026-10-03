import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Register "Sign in" and "Contact Administrator" currently: className="text-blue-600 hover:text-blue-400 font-semibold transition-colors"
# Actually I replaced text-teal-600 with text-blue-600 in Register.jsx
content = content.replace('className="text-blue-600 hover:text-blue-400 font-semibold transition-colors"', 'className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-all"')
content = content.replace('className="text-blue-600 hover:text-blue-400 font-semibold transition-colors cursor-pointer"', 'className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-all cursor-pointer"')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
