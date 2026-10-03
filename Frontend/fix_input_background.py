import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace bg-[#f0f4f8] with bg-white border border-gray-300
old_light_mode = "'bg-[#f0f4f8] text-gray-900 border-transparent focus:bg-white'"
new_light_mode = "'bg-white text-gray-900 border border-gray-300 focus:border-transparent focus:bg-white'"
content = content.replace(old_light_mode, new_light_mode)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
