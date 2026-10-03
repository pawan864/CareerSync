import re

# UPDATE LOGIN.JSX
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("px-4 py-3 rounded text-sm text-center", "px-3 py-1.5 rounded-md text-[11px] text-center font-medium")
content = content.replace("px-3 py-2 rounded text-xs text-center", "px-3 py-1.5 rounded-md text-[11px] text-center font-medium")

# Also shrink the dev otp toast just in case they meant that
content = content.replace("p-4 min-w-[200px]", "p-3 min-w-[160px]")
content = content.replace("text-3xl", "text-xl")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)


# UPDATE ADMINLOGIN.JSX
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

admin_content = admin_content.replace("px-4 py-3 rounded-lg text-sm text-center", "px-3 py-1.5 rounded-md text-[11px] text-center font-medium")
admin_content = admin_content.replace("p-4 min-w-[200px]", "p-3 min-w-[160px]")
admin_content = admin_content.replace("text-3xl", "text-xl")

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
