import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add icons to imports
content = content.replace("BrainCircuit", "BrainCircuit, MessageSquare, Calendar")

# Add component imports
import_stmt = "import InterviewPrep from './InterviewPrep';\nimport EventsHub from './EventsHub';\n"
content = content.replace("import ApplicationTracker from './ApplicationTracker';", "import ApplicationTracker from './ApplicationTracker';\n" + import_stmt)

# Add nav items
new_navs = """
        { id: 'opportunities', label: 'Opportunities', icon: Briefcase, desc: 'Jobs, Internships & Projects' },
        { id: 'applications', label: 'My Applications', icon: FileText, desc: 'Track your status' },
        { id: 'interviews', label: 'Interview Prep', icon: MessageSquare, desc: 'AI Mocks & Practice' },
        { id: 'events', label: 'Events & Hacks', icon: Calendar, desc: 'Hackathons & Drives' }
"""
content = re.sub(r"\{\s*id:\s*'opportunities'.*?\},\s*\{\s*id:\s*'applications'.*?\}\s*", new_navs, content, flags=re.DOTALL)

# Add routes to AnimatePresence block
new_routes = """
                            {activeTab === 'applications' && <ApplicationTracker />}
                            {activeTab === 'interviews' && <InterviewPrep />}
                            {activeTab === 'events' && <EventsHub />}
"""
content = content.replace("{activeTab === 'applications' && <ApplicationTracker />}", new_routes)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)

