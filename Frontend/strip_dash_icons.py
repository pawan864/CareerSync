import os
import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'

with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

icons = ['User', 'LogOut', 'GraduationCap']

for icon in icons:
    pattern = r'<\s*' + icon + r'\b[^>]*\/>'
    content = re.sub(pattern, '', content)
    
# Remove gradients
content = content.replace('bg-gradient-to-tr from-blue-500 to-blue-700', 'bg-blue-600')
content = content.replace('bg-gradient-to-br from-blue-600 to-purple-600', 'bg-blue-600')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)

