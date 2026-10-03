import re

# Update FacultyDashboard
faculty_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx'
with open(faculty_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
imports_to_add = "ClipboardList, FolderOpen, Calendar, Mail, Settings, HelpCircle"
content = content.replace("CheckCircle, BarChart2\n}", f"CheckCircle, BarChart2, {imports_to_add}\n}}")

# Update sidebarItems
old_items = """    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'Student Management', icon: Users },
        { name: 'Curriculum & Mapping', icon: BookOpen },
        { name: 'Mentorship', icon: MessageSquare },
        { name: 'Performance Analytics', icon: BarChart2 },
        { name: 'Industry Trends', icon: TrendingUp },
    ];"""

new_items = """    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'Student Management', icon: Users },
        { name: 'Curriculum & Mapping', icon: BookOpen },
        { name: 'Assignments & Grading', icon: ClipboardList },
        { name: 'Course Materials', icon: FolderOpen },
        { name: 'Schedule', icon: Calendar },
        { name: 'Mentorship', icon: MessageSquare },
        { name: 'Performance Analytics', icon: BarChart2 },
        { name: 'Industry Trends', icon: TrendingUp },
        { name: 'Messages', icon: Mail },
        { name: 'Settings', icon: Settings },
        { name: 'Help & Support', icon: HelpCircle },
    ];"""

content = content.replace(old_items, new_items)

with open(faculty_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update AdminDashboard
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
admin_imports_to_add = "Key, Link2, CreditCard"
content = content.replace("CheckCircle, XCircle, Eye\n}", f"CheckCircle, XCircle, Eye, {admin_imports_to_add}\n}}")

# Update sidebarItems
old_admin_items = """    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'User Verification', icon: UserCheck },
        { name: 'Content Moderation', icon: ShieldAlert },
        { name: 'Analytics & Reports', icon: BarChart2 },
        { name: 'AI Engine', icon: Brain },
        { name: 'Feedback & Growth', icon: MessageSquare },
        { name: 'System Logs', icon: Activity },
        { name: 'Settings', icon: Settings },
    ];"""

new_admin_items = """    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'User Verification', icon: UserCheck },
        { name: 'Content Moderation', icon: ShieldAlert },
        { name: 'Database Management', icon: Database },
        { name: 'Analytics & Reports', icon: BarChart2 },
        { name: 'AI Engine', icon: Brain },
        { name: 'Access Control', icon: Key },
        { name: 'API Integrations', icon: Link2 },
        { name: 'Billing', icon: CreditCard },
        { name: 'Feedback & Growth', icon: MessageSquare },
        { name: 'Security Audit', icon: ShieldCheck },
        { name: 'System Logs', icon: Activity },
        { name: 'Settings', icon: Settings },
    ];"""

content = content.replace(old_admin_items, new_admin_items)

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(content)
