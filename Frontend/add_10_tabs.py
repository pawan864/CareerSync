import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add new imports for the 10 icons
imports_check = "import { \n    GraduationCap, LogOut, User, BookOpen, Briefcase, FileText, BrainCircuit, MessageSquare, Calendar, Home, ChevronRight,\n    Award, Users, Building2, Network, LayoutTemplate, Map, Bookmark, MailOpen, Settings, HelpCircle"
content = re.sub(r'import \{.*?\} from \'lucide-react\';', imports_check + "\n} from 'lucide-react';", content, flags=re.DOTALL)

# Import ComingSoon
import_coming_soon = "import ComingSoon from './ComingSoon';\n"
content = content.replace("import EventsHub from './EventsHub';", "import EventsHub from './EventsHub';\n" + import_coming_soon)

# The new navItems
new_navs = """
    const navItems = [
        { id: 'home', label: 'Home Page', icon: Home, desc: 'Return to main site' },
        
        { id: 'profile', label: 'My Profile', icon: User, desc: 'Digital Resume & Details' },
        { id: 'resume', label: 'Resume Builder', icon: LayoutTemplate, desc: 'Create ATS-friendly CVs' },
        
        { id: 'skills', label: 'Skill Center', icon: BrainCircuit, desc: 'Assessments & Gaps' },
        { id: 'certifications', label: 'Certifications', icon: Award, desc: 'Manage verified credentials' },
        
        { id: 'opportunities', label: 'Opportunities', icon: Briefcase, desc: 'Jobs, Internships & Projects' },
        { id: 'applications', label: 'My Applications', icon: FileText, desc: 'Track your status' },
        { id: 'saved', label: 'Saved Jobs', icon: Bookmark, desc: 'Your bookmarked opportunities' },
        { id: 'offers', label: 'Offer Letters', icon: MailOpen, desc: 'Manage official documents' },
        
        { id: 'companies', label: 'Company Insights', icon: Building2, desc: 'Research top recruiters' },
        { id: 'pathways', label: 'Career Pathways', icon: Map, desc: 'Explore role roadmaps' },
        
        { id: 'interviews', label: 'Interview Prep', icon: MessageSquare, desc: 'AI Mocks & Practice' },
        { id: 'events', label: 'Events & Hacks', icon: Calendar, desc: 'Hackathons & Drives' },
        
        { id: 'mentorship', label: 'Mentorship', icon: Users, desc: 'Connect with industry mentors' },
        { id: 'alumni', label: 'Alumni Network', icon: Network, desc: 'Connect with graduates' },
        
        { id: 'settings', label: 'Settings', icon: Settings, desc: 'Account configuration' },
        { id: 'support', label: 'Help & Support', icon: HelpCircle, desc: 'Contact technical support' }
    ];
"""

content = re.sub(r'const navItems = \[.*?\];', new_navs.strip(), content, flags=re.DOTALL)

# Add routes
new_routes = """
                            {activeTab === 'events' && <EventsHub />}
                            
                            {/* New Placeholder Routes */}
                            {['resume', 'certifications', 'saved', 'offers', 'companies', 'pathways', 'mentorship', 'alumni', 'settings', 'support'].includes(activeTab) && (
                                <ComingSoon 
                                    title={navItems.find(i => i.id === activeTab)?.label} 
                                    description={navItems.find(i => i.id === activeTab)?.desc} 
                                />
                            )}
"""
content = content.replace("{activeTab === 'events' && <EventsHub />}", new_routes.strip())

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
