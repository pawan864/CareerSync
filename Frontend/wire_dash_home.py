import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
import_stmt = "import DashboardHome from './DashboardHome';\n"
content = content.replace("import ProfileBuilder from './ProfileBuilder';", import_stmt + "import ProfileBuilder from './ProfileBuilder';")

# Change initial state
content = content.replace("const [activeTab, setActiveTab] = useState('profile');", "const [activeTab, setActiveTab] = useState('home');")

# Fix onClick for home
content = content.replace("item.id === 'home' ? navigate('/') : setActiveTab(item.id)", "setActiveTab(item.id)")

# Add route
routes_block = """
                            {activeTab === 'home' && <DashboardHome />}
                            {activeTab === 'profile' && <ProfileBuilder />}
"""
content = content.replace("{activeTab === 'profile' && <ProfileBuilder />}", routes_block)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
