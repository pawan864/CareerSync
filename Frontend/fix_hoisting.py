import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Separate imports from the rest
imports_end = content.find("const AdminDashboard = () => {")

imports = content[:imports_end]
rest = content[imports_end:]

# Find where AdminDashboard ends
# It ends with `  );\n};\n\n/* ====`
admin_end = rest.find("/* =========================================")

admin_dashboard_code = rest[:admin_end]
modules_and_export = rest[admin_end:]

# Modules and export contains:
# /* === ... === */
# const OverviewModule ...
# export default AdminDashboard;

# We want to put admin_dashboard_code RIGHT BEFORE export default AdminDashboard;
export_index = modules_and_export.rfind("export default AdminDashboard;")

modules_only = modules_and_export[:export_index]
export_only = modules_and_export[export_index:]

new_content = imports + modules_only + admin_dashboard_code + "\n" + export_only

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
