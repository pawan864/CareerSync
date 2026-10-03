import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the missing brace for the main AdminDashboard component
content = content.replace("export default AdminDashboard;", "};\n\nexport default AdminDashboard;")

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
