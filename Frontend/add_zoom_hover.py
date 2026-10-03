import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add hover:scale-[1.02] active:scale-[0.98] to the Google and Email buttons
# The classes string currently contains: "className={`flex-1 flex items-center justify-center border py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"

content = content.replace('transition-colors shadow-sm cursor-pointer', 'transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
