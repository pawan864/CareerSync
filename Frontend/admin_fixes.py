import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Hide "Need assistance" when portal === 'Admin'
content = content.replace(
    '{!showSupport && (',
    '{!showSupport && portal !== \'Admin\' && ('
)

# 2. Add hover effect to the Admin card
# Current class:
# 'bg-[#050505] ring-2 ring-inset ring-red-500 shadow-[0_0_40px_rgba(220,38,38,0.3)]'
# Let's add hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] hover:-translate-y-1
content = content.replace(
    "'bg-[#050505] ring-2 ring-inset ring-red-500 shadow-[0_0_40px_rgba(220,38,38,0.3)]'",
    "'bg-[#050505] ring-2 ring-inset ring-red-500 shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_80px_rgba(220,38,38,0.6)] hover:-translate-y-1 transition-all duration-500'"
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
