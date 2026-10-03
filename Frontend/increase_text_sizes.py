import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace label text size
# e.g., text-xs mb-1 -> text-sm mb-1.5
content = re.sub(r'<label\s+className={`block([^`]+)text-xs', r'<label className={`block\1text-sm', content)
content = content.replace('text-xs mb-1', 'text-sm mb-1.5')
content = content.replace('text-[11px]', 'text-xs') # for any small labels

# Replace input text size
# e.g., text-sm -> text-base
content = re.sub(r'<input([^>]+)text-sm', r'<input\1text-base', content)
content = re.sub(r'<select([^>]+)text-sm', r'<select\1text-base', content)

# Check for custom placeholders or inputs that don't match the regex nicely
content = content.replace('py-2', 'py-2.5') # increase padding slightly since text is bigger
content = content.replace('py-1.5', 'py-2') # increase padding slightly since text is bigger

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
