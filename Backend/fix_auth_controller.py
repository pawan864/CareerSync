import re

auth_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js'
with open(auth_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change 'Recruiter': 'industry' to 'Recruiter': 'recruiter'
content = content.replace("'Recruiter': 'industry',", "'Recruiter': 'recruiter',")

with open(auth_path, 'w', encoding='utf-8') as f:
    f.write(content)
