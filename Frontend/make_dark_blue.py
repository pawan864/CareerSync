import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the sidebar and icons Dark Blue (blue-900)
content = content.replace("#1e40af", "#1e3a8a") # Change blue-800 to blue-900
content = content.replace("to-[#1e3a8a]", "to-[#172554]") # Change gradient end to blue-950

# Also make sure the buttons inside the modules are blue-900 instead of blue-600
content = content.replace("bg-blue-600", "bg-blue-900")
content = content.replace("hover:bg-blue-700", "hover:bg-blue-800")
content = content.replace("text-blue-600", "text-blue-900")
content = content.replace("border-blue-700", "border-blue-900")

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
