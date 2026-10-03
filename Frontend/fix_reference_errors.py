import re

hub_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\OpportunityHub.jsx'
with open(hub_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix ReferenceError by moving opportunities definition up
fix = """
    const opportunities = [
        { id: 1, type: 'Internship', title: 'Software Engineering Intern', company: 'Google', location: 'Remote', stipend: '$5000/mo', duration: '3 months', match: 92, skills: ['Java', 'Spring Boot', 'React'] },
        { id: 2, type: 'Placement', title: 'Full Stack Developer', company: 'Microsoft', location: 'Seattle, WA', stipend: '$120k/yr', duration: 'Full-time', match: 85, skills: ['C#', '.NET', 'React', 'SQL'] },
        { id: 3, type: 'Project', title: 'AI Document Classifier', company: 'OpenAI', location: 'Remote', stipend: 'Unpaid', duration: '2 months', match: 45, skills: ['Python', 'PyTorch', 'NLP'] },
        { id: 4, type: 'Internship', title: 'Frontend Developer Intern', company: 'Vercel', location: 'Hybrid', stipend: '$4000/mo', duration: '6 months', match: 98, skills: ['React', 'Next.js', 'Tailwind'] },
        { id: 5, type: 'Placement', title: 'Data Scientist', company: 'Amazon', location: 'New York, NY', stipend: '$130k/yr', duration: 'Full-time', match: 65, skills: ['Python', 'SQL', 'Machine Learning'] },
        { id: 6, type: 'Project', title: 'Open Source UI Library', company: 'Meta', location: 'Remote', stipend: 'Grant Based', duration: '4 months', match: 78, skills: ['React', 'CSS', 'Figma'] },
    ];

    const [realOpps, setRealOpps] = useState([]);
"""

# Remove existing opportunities definition
content = re.sub(r'const opportunities = \[.*?\];', '', content, flags=re.DOTALL)
content = content.replace("const [realOpps, setRealOpps] = useState([]);", fix)

with open(hub_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Do same for ApplicationTracker.jsx
app_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ApplicationTracker.jsx'
with open(app_path, 'r', encoding='utf-8') as f:
    content_app = f.read()

fix_app = """
    const applications = [
        { id: 1, role: 'Software Engineering Intern', company: 'Google', date: '2 days ago', status: 'Applied', location: 'Remote' },
        { id: 2, role: 'Frontend Developer Intern', company: 'Vercel', date: '1 week ago', status: 'Shortlisted', location: 'Hybrid' },
        { id: 3, role: 'Data Scientist', company: 'Amazon', date: '2 weeks ago', status: 'Interview', location: 'New York, NY' },
        { id: 4, role: 'Full Stack Developer', company: 'Microsoft', date: '1 month ago', status: 'Selected', location: 'Seattle, WA' },
        { id: 5, role: 'Backend Engineer', company: 'Netflix', date: '1 month ago', status: 'Not Selected', location: 'Los Gatos, CA' },
    ];

    const [realApps, setRealApps] = useState([]);
"""

content_app = re.sub(r'const applications = \[.*?\];', '', content_app, flags=re.DOTALL)
content_app = content_app.replace("const [realApps, setRealApps] = useState([]);", fix_app)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content_app)

