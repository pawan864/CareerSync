import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change all inputs to text-sm and font-medium so they don't look thin
content = content.replace('transition-colors text-xs placeholder-gray-400 placeholder:font-normal placeholder:tracking-wide', 'transition-colors text-sm font-medium placeholder-gray-400 placeholder:font-medium placeholder:tracking-normal')

# Just in case they are already text-sm (from my first failed change?)
# Let's do a more robust regex to replace whatever text sizing it has.
content = re.sub(r'text-xs placeholder-gray-400([^`]*?)', r'text-sm font-medium placeholder-gray-400\1', content)
content = re.sub(r'text-sm placeholder-gray-400([^`]*?)', r'text-sm font-medium placeholder-gray-400\1', content)

# Remove the thin placeholder styling I added earlier
content = content.replace(' placeholder:font-normal placeholder:tracking-wide', '')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
