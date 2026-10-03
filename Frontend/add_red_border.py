import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the static className with a dynamic one that adds the red border when on Admin portal
old_class = 'className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row bg-white shadow-2xl"'
new_class = 'className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-all duration-300 ${portal === \'Admin\' && !showSupport ? \'bg-[#050505] border border-red-500/40 shadow-[0_0_40px_rgba(220,38,38,0.15)]\' : \'bg-white\'}`}'

content = content.replace(old_class, new_class)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
