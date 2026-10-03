import re

model_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\models\User.js'
with open(model_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace 'industry' with 'recruiter' in enum
content = content.replace("enum: ['student', 'faculty', 'industry', 'admin', 'tpo']", "enum: ['student', 'faculty', 'recruiter', 'admin', 'tpo']")

with open(model_path, 'w', encoding='utf-8') as f:
    f.write(content)
