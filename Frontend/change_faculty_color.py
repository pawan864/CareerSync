import re

faculty_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx'
with open(faculty_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace emerald with blue globally
content = content.replace("emerald", "blue")

# Replace specific hex codes
content = content.replace("#047857", "#1e40af") # Dark Blue
content = content.replace("#064e3b", "#1e3a8a") # Darker Blue

with open(faculty_path, 'w', encoding='utf-8') as f:
    f.write(content)
