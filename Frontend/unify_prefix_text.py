import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make TPO and Recruiter exactly "Don't have an account?"
content = content.replace("Don't have an recruiter account?", "Don't have an account?")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
