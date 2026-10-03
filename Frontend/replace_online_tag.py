import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Online status with Student tag
content = content.replace('<span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> Online', 'STUDENT')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
