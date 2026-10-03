import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the navigate chain
old_chain = "portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : portal === 'Admin' ? '/admin-dashboard' : '/'"
new_chain = "portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : portal === 'Admin' ? '/admin-dashboard' : portal === 'Faculty' ? '/faculty-dashboard' : '/'"

content = content.replace(old_chain, new_chain)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
