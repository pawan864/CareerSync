import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the desc from sidebar
content = content.replace('<div className="text-xs text-gray-500">{item.desc}</div>', '')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
