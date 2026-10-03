import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
if "import OtpVerification from './pages/OtpVerification';" not in content:
    content = content.replace("import AdminLogin from './pages/AdminLogin';", "import AdminLogin from './pages/AdminLogin';\nimport OtpVerification from './pages/OtpVerification';")

# Add Route
old_routes = "          <Route path=\"/admin-login\" element={<AdminLogin />} />"
new_routes = "          <Route path=\"/admin-login\" element={<AdminLogin />} />\n          <Route path=\"/otp-verify\" element={<OtpVerification />} />"
if "<Route path=\"/otp-verify\"" not in content:
    content = content.replace(old_routes, new_routes)

# Add to isAuthPage
old_check = "|| location.pathname === '/admin-login';"
new_check = "|| location.pathname === '/admin-login' || location.pathname === '/otp-verify';"
if "'/otp-verify'" not in content:
    content = content.replace(old_check, new_check)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
