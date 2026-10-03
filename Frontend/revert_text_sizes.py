import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert label text size
content = re.sub(r'<label\s+className={`block([^`]+)text-sm mb-1.5', r'<label className={`block\1text-xs mb-1', content)
content = content.replace('text-xs mb-1.5', 'text-[11px] mb-1') # For any I changed from 11px to xs

# Some might just be text-sm mb-1 (if my regex missed the .5)
content = re.sub(r'<label\s+className={`block([^`]+)text-sm mb-1', r'<label className={`block\1text-xs mb-1', content)

# Revert input text size
content = re.sub(r'<input([^>]+)text-base', r'<input\1text-sm', content)
content = re.sub(r'<select([^>]+)text-base', r'<select\1text-sm', content)

# Revert padding
content = content.replace('py-2.5', 'py-2')
# (I changed py-1.5 to py-2 previously but maybe not needed, I will leave py-2 if it's there or change back to py-1.5 for specific things)
# Actually, the inputs were py-2.

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
