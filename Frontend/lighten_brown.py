import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change bgDark for the orange theme from orange-800 to orange-500 (lighter)
old_orange = 'orange: { bgDark: "bg-orange-800"'
new_orange = 'orange: { bgDark: "bg-orange-400"'
content = content.replace(old_orange, new_orange)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
