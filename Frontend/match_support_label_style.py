import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace current label classes with the exact ones from Technical Support
old_label = "className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}"
new_label = "className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}"

content = content.replace(old_label, new_label)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
