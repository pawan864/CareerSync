import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Lighten Hero gradient
content = content.replace('gradient: "from-white via-orange-100 to-orange-300"', 'gradient: "from-white via-orange-50 to-orange-100"')

# Lighten CTA gradient
content = content.replace('ctaGradient: "from-white via-orange-200 to-orange-400"', 'ctaGradient: "from-white via-orange-50 to-orange-100"')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
