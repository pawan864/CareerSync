import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change text-xs to text-sm on all inputs
# The pattern we used previously: className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-colors text-xs placeholder-gray-400...

content = content.replace('transition-colors text-xs placeholder-gray-400', 'transition-colors text-sm placeholder-gray-400')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
