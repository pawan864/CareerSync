import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the C box background and text
content = content.replace(
    '<div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-md">',
    '<div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(245,158,11,0.4)]">'
)
content = content.replace(
    '<span className="text-blue-900 font-bold text-lg">C</span>',
    '<span className="text-white font-bold text-lg">C</span>'
)

# Replace the text-blue-200 in the word 'Sync' with amber
content = content.replace(
    '<span className="text-blue-200">Sync</span>',
    '<span className="text-amber-400">Sync</span>'
)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
