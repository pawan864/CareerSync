import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the unsplash URL with the new local image
content = content.replace('"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"', '"/hero-convocation-student.jpg"')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
