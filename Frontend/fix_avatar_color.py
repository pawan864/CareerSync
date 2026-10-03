import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change the avatar circle background to dark blue
content = content.replace('bg-blue-600 flex items-center justify-center', 'bg-blue-900 flex items-center justify-center')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
