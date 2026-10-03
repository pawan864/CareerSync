import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

if 'import { GraduationCap, ArrowLeft, Mail' in content:
    content = content.replace("import { GraduationCap, ArrowLeft, Mail } from 'lucide-react';", "import { GraduationCap, ArrowLeft, Mail, User, Building, Briefcase } from 'lucide-react';")

old_tabs = "{[{id: 'student', label: 'Student'}, {id: 'tpo', label: 'Institution'}, {id: 'industry', label: 'Employer'}].map((p) => ("
new_tabs = "{[{id: 'student', label: 'Student', icon: User}, {id: 'tpo', label: 'Institution', icon: Building}, {id: 'industry', label: 'Employer', icon: Briefcase}].map((p) => ("

content = content.replace(old_tabs, new_tabs)

old_button_content = "{p.label}\n                                  </button>"
new_button_content = "<div className=\"flex items-center space-x-1.5\">\n                                          <p.icon className=\"w-3.5 h-3.5\" />\n                                          <span>{p.label}</span>\n                                      </div>\n                                  </button>"

content = content.replace(old_button_content, new_button_content)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
