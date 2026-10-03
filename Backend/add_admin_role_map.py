import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_role_map = """        const roleMap = {
            'Student': 'student',
            'Faculty': 'faculty',
            'TPO': 'tpo',
            'Recruiter': 'industry'
        };"""
new_role_map = """        const roleMap = {
            'Student': 'student',
            'Faculty': 'faculty',
            'TPO': 'tpo',
            'Recruiter': 'industry',
            'Admin': 'admin'
        };"""
content = content.replace(old_role_map, new_role_map)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js', 'w', encoding='utf-8') as f:
    f.write(content)
