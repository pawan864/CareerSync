import re

app_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
if 'import AdminDashboard' not in content:
    content = content.replace("import AdminLogin from './pages/AdminLogin';", "import AdminLogin from './pages/AdminLogin';\nimport AdminDashboard from './pages/admin/AdminDashboard';")

# 2. Add to isAuthPage so it hides the navbar/footer
# 'location.pathname === '/admin-dashboard' ||'
if "'/admin-dashboard'" not in content:
    content = content.replace("location.pathname === '/student-dashboard';", "location.pathname === '/student-dashboard' || location.pathname === '/admin-dashboard';")

# 3. Add to Routes
if '<Route path="/admin-dashboard" element={<AdminDashboard />} />' not in content:
    content = content.replace('<Route path="/admin-login" element={<AdminLogin />} />', '<Route path="/admin-login" element={<AdminLogin />} />\n          <Route path="/admin-dashboard" element={<AdminDashboard />} />')

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)
