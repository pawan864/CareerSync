import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the glowing text shadow hover
content = content.replace(' hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)]', '')

# Remove hover:underline from Terms and Privacy
content = content.replace(' hover:underline', '')

# For "Sign in" and "Contact Admin"
# Sign in: className="text-blue-500 hover:text-blue-400 font-semibold transition-all"
# Let's remove the hover color change if they meant "no hover" literally, but usually they just hate the glow.
content = content.replace(' hover:text-blue-400', '')
content = content.replace(' hover:text-blue-500', '')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
