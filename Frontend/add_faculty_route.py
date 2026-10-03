import re

app_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Import FacultyDashboard
content = content.replace(
    "import EmployerDashboard from './pages/EmployerDashboard';",
    "import EmployerDashboard from './pages/EmployerDashboard';\nimport FacultyDashboard from './pages/FacultyDashboard';"
)

# Add Route
content = content.replace(
    "<Route path=\"/employer\" element={<EmployerDashboard />} />",
    "<Route path=\"/employer\" element={<EmployerDashboard />} />\n          <Route path=\"/faculty-dashboard\" element={<FacultyDashboard />} />"
)

# Add to isAuthPage
content = content.replace(
    "|| location.pathname === '/admin-dashboard'",
    "|| location.pathname === '/admin-dashboard' || location.pathname === '/faculty-dashboard'"
)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)
