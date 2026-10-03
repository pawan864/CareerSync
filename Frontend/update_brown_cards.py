import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

# Replace the cardBg for orange theme
home_content = home_content.replace('cardBg: "bg-orange-50"', 'cardBg: "bg-[#faf6f0]"')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(home_content)
