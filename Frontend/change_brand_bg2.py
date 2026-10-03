import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<div className="h-20 flex items-center px-6 border-b border-gray-800/60 relative z-10">',
    '<div className="h-20 flex items-center px-6 border-b border-gray-800/60 relative z-10 bg-black/40 shadow-inner">'
)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
