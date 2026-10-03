import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the icon div from the nav rendering
content = re.sub(r'<div className=\{`p-2 rounded-lg mr-3 \$\{isActive \? \'bg-blue-100\' : \'bg-gray-100\'\}`\}>\s*<Icon className="w-4 h-4" />\s*</div>', '', content, flags=re.DOTALL)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)

