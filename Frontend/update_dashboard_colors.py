import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change "Student Portal" text color to dark blue
content = content.replace('text-xs text-teal-700 font-medium', 'text-xs text-blue-900 font-medium')
content = content.replace('text-[10px] text-teal-700 font-medium', 'text-xs text-blue-900 font-medium') # Fallback if text-xs wasn't saved properly before

# Change Profile Avatar circle to dark blue
content = content.replace('bg-gradient-to-tr from-blue-500 to-blue-700', 'bg-blue-900')
content = content.replace('bg-gradient-to-tr from-blue-600 to-blue-800', 'bg-blue-900') # Fallback
content = content.replace('bg-gradient-to-tr from-blue-400 to-blue-600', 'bg-blue-900') # Fallback

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
