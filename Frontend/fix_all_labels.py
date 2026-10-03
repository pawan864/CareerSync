import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hardcoded text-gray-400 labels
old_label_hardcoded = 'className="block text-gray-400 text-xs mb-1"'
new_label_dynamic = 'className={`block text-sm font-medium mb-1.5 ${isDarkMode ? \'text-gray-300\' : \'text-black\'}`}'
content = content.replace(old_label_hardcoded, new_label_dynamic)

# Also check if there are any other hardcoded labels
old_label2 = 'className="block text-gray-500 text-xs mb-1"'
content = content.replace(old_label2, new_label_dynamic)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
