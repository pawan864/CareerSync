import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'placeholder="e.g. STU-2023-001"': 'placeholder="Enter Student ID or Roll No."',
    'placeholder="e.g. MIT"': 'placeholder="Name of your college/university"',
    'placeholder="Enter course"': 'placeholder="B.Tech, MCA, MBA, etc."',
    'placeholder="Enter branch"': 'placeholder="Computer Science, Mechanical, etc."',
    'placeholder="Enter semester"': 'placeholder="1st, 2nd, 3rd, etc."',
    'placeholder="Enter 10-digit number"': 'placeholder="10-digit mobile number"',
    
    'placeholder="e.g. FAC-2023"': 'placeholder="Enter Faculty ID"',
    'placeholder="e.g. Computer Science"': 'placeholder="Department name"',
    'placeholder="e.g. Professor"': 'placeholder="Assistant Professor, HOD, etc."',
    'placeholder="e.g. AI, Machine Learning"': 'placeholder="Your core subjects or research areas"',
    
    'placeholder="e.g. Google"': 'placeholder="Registered company name"',
    'placeholder="e.g. hr@company.com"': 'placeholder="work@company.com"',
    'placeholder="https://www.company.com"': 'placeholder="www.company.com"',
    'placeholder="e.g. Technology"': 'placeholder="IT, Finance, Healthcare, etc."',
    'placeholder="e.g. 50-200"': 'placeholder="Number of employees (e.g., 50-200)"',
    'placeholder="e.g. New York, USA"': 'placeholder="Headquarters or branch location"',
    'placeholder="Enter registration details"': 'placeholder="CIN or Company Registration Number"',
    
    'placeholder="e.g. TPO-1234"': 'placeholder="Enter your TPO ID"',
    'placeholder="e.g. INST-5678"': 'placeholder="Enter assigned Institution Code"',
    
    'placeholder="Enter full name"': 'placeholder="John Doe"',
    'placeholder="Enter email address"': 'placeholder="john@example.com"',
}

for old_ph, new_ph in replacements.items():
    content = content.replace(old_ph, new_ph)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
