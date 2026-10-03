import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hardcoded dark background on the "OR" span
old_or = '<span className="relative bg-[#020617] px-4 font-medium">OR</span>'
new_or = '<span className={`relative px-4 font-medium ${isDarkMode ? \'bg-[#020617]\' : \'bg-white\'}`}>OR</span>'
content = content.replace(old_or, new_or)

# Also let's check the border color. It says "border-gray-800"
# Let's make the line dynamic too: border-gray-800 in dark mode, border-gray-200 in light mode
old_border = '<div className="w-full border-t border-gray-800"></div>'
new_border = '<div className={`w-full border-t ${isDarkMode ? \'border-gray-800\' : \'border-gray-200\'}`}></div>'
content = content.replace(old_border, new_border)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
