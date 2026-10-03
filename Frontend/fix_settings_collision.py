import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix naming collision
content = content.replace("import Settings from './Settings';", "import DashboardSettings from './Settings';")
content = content.replace("{activeTab === 'settings' && <Settings />}", "{activeTab === 'settings' && <DashboardSettings />}")

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
