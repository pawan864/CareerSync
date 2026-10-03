import re

app_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make isAuthPage check more comprehensive by hiding navbar/footer on dashboard routes
content = content.replace(
    "const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/support' || location.pathname === '/admin-login' || location.pathname === '/otp-verify';",
    "const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/support' || location.pathname === '/admin-login' || location.pathname === '/otp-verify' || location.pathname === '/student-dashboard';"
)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)
