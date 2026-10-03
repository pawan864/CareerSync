import re

auth_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js'
with open(auth_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Faculty bypass
admin_bypass = """        // --- HARDCODED ADMIN BYPASS FOR CAPSTONE TESTING ---
        if (portal === 'Admin' && email === 'admin@careersync.com' && password === 'admin123') {
            return res.status(200).json({ success: true });
        }"""

faculty_bypass = """        // --- HARDCODED BYPASSES FOR CAPSTONE TESTING ---
        if (portal === 'Admin' && email === 'admin@careersync.com' && password === 'admin123') {
            return res.status(200).json({ success: true });
        }
        if (portal === 'Faculty' && email === 'faculty@careersync.com' && password === 'faculty123') {
            return res.status(200).json({ success: true });
        }"""

content = content.replace(admin_bypass, faculty_bypass)

with open(auth_path, 'w', encoding='utf-8') as f:
    f.write(content)
