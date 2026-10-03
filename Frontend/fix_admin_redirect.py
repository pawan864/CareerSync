import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the portal state initialization
# const [portal, setPortal] = useState('Student');
# Let's change it to const [portal, setPortal] = useState(location.state?.portal || 'Student');

if 'location.state?.portal ||' not in content:
    content = content.replace("const [portal, setPortal] = useState('Student');", "const [portal, setPortal] = useState(location.state?.portal || 'Student');")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Now modify AdminDashboard to navigate to /login
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

admin_content = admin_content.replace("navigate('/admin-login');", "navigate('/login', { state: { portal: 'Admin' } });")

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
