import os
import re

components = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ProfileBuilder.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\SkillCenter.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\OpportunityHub.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ApplicationTracker.jsx'
]

for file_path in components:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Strip out AI-looking typography and glows
    content = content.replace('uppercase tracking-wider', 'font-medium')
    content = content.replace('uppercase tracking-widest', 'font-medium')
    content = content.replace('uppercase', '')
    content = content.replace('tracking-wider', '')
    content = content.replace('tracking-widest', '')
    
    # Soften bold text to semibold or medium
    content = content.replace('font-bold', 'font-medium')
    content = content.replace('font-extrabold', 'font-semibold')
    
    # Remove excessive blur and glow effects
    content = re.sub(r'shadow-\[.*?\]', 'shadow-sm', content)
    content = content.replace('blur-[100px]', '')
    
    # Standardize button styles (less extreme border radius and gradients)
    content = content.replace('rounded-2xl', 'rounded-lg')
    content = content.replace('rounded-xl', 'rounded-md')
    
    # Soften some text colors
    content = content.replace('text-[10px]', 'text-xs')
    content = content.replace('text-gray-900', 'text-gray-800')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

