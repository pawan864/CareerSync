import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Join as Student styles
content = content.replace('bg-indigo-600 hover:bg-indigo-700', 'bg-blue-900 hover:bg-blue-800')
# Replace Explore Opportunities styles
content = content.replace('border-indigo-600 text-indigo-700', 'border-blue-900 text-blue-900')

# Also let's check if there are other indigo-600/700 references in the hero area we should update to blue-900 to keep it consistent
# Actually, the user just specified the buttons. But changing the hero text highlights to blue-900 might be good too. Let's just do the buttons for now.

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
