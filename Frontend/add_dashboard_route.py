import re

app_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import StudentDashboard from './pages/student/StudentDashboard';\n"
if "StudentDashboard" not in content:
    content = content.replace("import EmployerDashboard from './pages/EmployerDashboard';", "import EmployerDashboard from './pages/EmployerDashboard';\n" + import_stmt)

route_stmt = "          <Route path=\"/student-dashboard\" element={<StudentDashboard />} />\n"
if "/student-dashboard" not in content:
    content = content.replace("          <Route path=\"/employer\" element={<EmployerDashboard />} />", "          <Route path=\"/employer\" element={<EmployerDashboard />} />\n" + route_stmt)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)

# UPDATE LOGIN ROUTING
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    login_content = f.read()

# Update navigate
login_content = login_content.replace(
    "navigate(portal === 'Recruiter' ? '/employer' : '/');",
    "navigate(portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : '/');"
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login_content)

