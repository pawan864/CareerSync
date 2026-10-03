import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the extra }; before const AdminDashboard
content = content.replace(");\n\n};\n\nconst AdminDashboard", ");\n\nconst AdminDashboard")

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
