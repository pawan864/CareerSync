import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove overflow-hidden from the form wrapper
old_wrapper = '<div className="overflow-hidden relative w-full pb-4">'
new_wrapper = '<div className="relative w-full pb-4">'
content = content.replace(old_wrapper, new_wrapper)

# 2. Add overflow-x-hidden to the right side container
old_right_side = "flex flex-col relative px-8 sm:px-16 py-8 overflow-y-auto slim-scrollbar"
new_right_side = "flex flex-col relative px-8 sm:px-16 py-8 overflow-y-auto overflow-x-hidden slim-scrollbar"
content = content.replace(old_right_side, new_right_side)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
