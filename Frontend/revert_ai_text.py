import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert Card 1
content = content.replace('Comprehensive Skill Mapping', 'AI-Driven Skill Mapping')
# Revert Card 3
content = content.replace('advanced matching tools', 'advanced NLP algorithms')
content = content.replace('Automated Job Matching', 'Smart Job Matching')
# Revert Card 6
content = content.replace('guided interview framework', 'AI interviewer')

# Revert UI styles
content = content.replace('bg-blue-100 text-blue-800', 'bg-indigo-100 text-teal-600')
content = content.replace('bg-gray-50 border border-gray-100', 'bg-[#f3f0fc]')
content = content.replace('hover:border-blue-200', 'hover:border-indigo-100')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
