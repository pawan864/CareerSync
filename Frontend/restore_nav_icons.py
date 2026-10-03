import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the syntax error in navItems array
content = content.replace("icon: BrainCircuit, MessageSquare, Calendar, desc:", "icon: BrainCircuit, desc:")

# Re-inject the rendering of the icon inside the button
old_button_inner = """
                                <div className="text-left flex-1">
                                    <div className="text-sm font-semibold">{item.label}</div>
                                </div>
"""

new_button_inner = """
                                <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                <div className="text-left flex-1">
                                    <div className="text-sm font-medium">{item.label}</div>
                                </div>
"""
content = content.replace(old_button_inner.strip(), new_button_inner.strip())

# Make sure all icons are imported
imports_check = "import { \n    GraduationCap, LogOut, User, BookOpen, Briefcase, FileText, BrainCircuit, MessageSquare, Calendar, Home, ChevronRight"
content = re.sub(r'import \{.*?\} from \'lucide-react\';', imports_check + "\n} from 'lucide-react';", content, flags=re.DOTALL)

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
