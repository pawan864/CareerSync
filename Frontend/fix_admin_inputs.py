import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Admin Email Input
content = content.replace('placeholder="admin@careersync.com"', 'placeholder="admin@careersync.com"') # Wait, let's look for "Enter master"

old_admin_email = 'placeholder="Enter master email"\n                                                            className="w-full bg-transparent text-white focus:outline-none text-xs placeholder-gray-700"'
new_admin_email = 'placeholder="Enter master email"\n                                                            className="w-full bg-transparent text-white focus:outline-none text-xs placeholder-gray-700 autofill-admin"'
content = content.replace(old_admin_email, new_admin_email)

old_admin_pass = 'placeholder="Enter master password"\n                                                            className="w-full bg-transparent text-white focus:outline-none text-xs placeholder-gray-700"'
new_admin_pass = 'placeholder="Enter master password"\n                                                            className="w-full bg-transparent text-white focus:outline-none text-xs placeholder-gray-700 autofill-admin"'
content = content.replace(old_admin_pass, new_admin_pass)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
