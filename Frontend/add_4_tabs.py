import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add BookOpen to imports
if 'import { GraduationCap, ArrowLeft, Mail, User, Building, Briefcase }' in content:
    content = content.replace("import { GraduationCap, ArrowLeft, Mail, User, Building, Briefcase } from 'lucide-react';", "import { GraduationCap, ArrowLeft, Mail, User, Building, Briefcase, BookOpen } from 'lucide-react';")

# Replace tabs array
old_tabs = "{[{id: 'student', label: 'Student', icon: User}, {id: 'tpo', label: 'Institution', icon: Building}, {id: 'industry', label: 'Employer', icon: Briefcase}].map((p) => ("
new_tabs = "{[{id: 'student', label: 'Student', icon: User}, {id: 'faculty', label: 'Faculty', icon: BookOpen}, {id: 'tpo', label: 'TPO', icon: Building}, {id: 'recruiter', label: 'Recruiter', icon: Briefcase}].map((p) => ("

content = content.replace(old_tabs, new_tabs)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
