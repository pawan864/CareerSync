import os

components = [
    'ResumeBuilder', 'Certifications', 'SavedJobs', 'OfferLetters', 'CompanyInsights', 
    'CareerPathways', 'Mentorship', 'AlumniNetwork', 'Settings', 'DashboardSupport'
]

base_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student'

for name in components:
    code = f"""import React from 'react';

const {name} = () => {{
    return (
        <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-gray-800">{name} - Coming Soon</h2>
        </div>
    );
}};
export default {name};
"""
    with open(os.path.join(base_path, f'{name}.jsx'), 'w', encoding='utf-8') as f:
        f.write(code.strip())

