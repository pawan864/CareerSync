import os
import re

components = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\DashboardHome.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ProfileBuilder.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\SkillCenter.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\OpportunityHub.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ApplicationTracker.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\InterviewPrep.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\EventsHub.jsx'
]

# Common lucide icons to remove
icons = [
    'User', 'BookOpen', 'Briefcase', 'FileText', 'LogOut', 'GraduationCap', 'Target', 'ChevronRight', 
    'LayoutDashboard', 'BrainCircuit', 'Code', 'Award', 'CheckCircle', 'ChevronLeft', 'Upload', 'Plus', 
    'Trash2', 'Download', 'PlayCircle', 'TrendingUp', 'AlertTriangle', 'Lightbulb', 'Search', 'Filter', 
    'MapPin', 'DollarSign', 'Clock', 'Zap', 'Building2', 'ChevronDown', 'Percent', 'XCircle', 'Building',
    'MessageSquare', 'Video', 'FileQuestion', 'Star', 'Calendar', 'Users', 'Ticket', 'ExternalLink', 'Bell',
    'Home'
]

for file_path in components:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find and remove <IconName ... />
    for icon in icons:
        # Match <IconName ... /> or <IconName />
        pattern = r'<\s*' + icon + r'\b[^>]*\/>'
        content = re.sub(pattern, '', content)

    # Remove extra AI elements in DashboardHome
    content = content.replace('bg-gradient-to-r from-blue-600 to-indigo-700', 'bg-blue-800')
    content = content.replace('bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500', 'bg-blue-600')
    content = content.replace('shadow-[0_0_30px_rgba(168,85,247,0.4)]', 'shadow-sm')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

