import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
if "import AdminLogin from './pages/AdminLogin';" not in content:
    content = content.replace("import Login from './pages/Login';", "import Login from './pages/Login';\nimport AdminLogin from './pages/AdminLogin';")

# Add to isAuthPage check
content = content.replace("location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/support';", "location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/support' || location.pathname === '/admin-login';")

# Add Route
old_routes = "          <Route path=\"/login\" element={<Login />} />"
new_routes = "          <Route path=\"/login\" element={<Login />} />\n          <Route path=\"/admin-login\" element={<AdminLogin />} />"
content = content.replace(old_routes, new_routes)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
