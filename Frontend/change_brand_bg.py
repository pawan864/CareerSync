import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the brand area have a distinct background so it's not the same blue as the sidebar
content = content.replace(
    '<div className="h-20 flex items-center px-6 border-b border-blue-900/50 relative z-10">',
    '<div className="h-20 flex items-center px-6 border-b border-blue-900/50 relative z-10 bg-black/30 shadow-inner">'
)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
