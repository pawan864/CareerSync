import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

imports = """
import ResumeBuilder from './ResumeBuilder';
import Certifications from './Certifications';
import SavedJobs from './SavedJobs';
import OfferLetters from './OfferLetters';
import CompanyInsights from './CompanyInsights';
import CareerPathways from './CareerPathways';
import Mentorship from './Mentorship';
import AlumniNetwork from './AlumniNetwork';
import Settings from './Settings';
import DashboardSupport from './DashboardSupport';
"""

content = content.replace("import ComingSoon from './ComingSoon';", imports)

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
