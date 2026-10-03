import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Card 1
content = content.replace('AI-Driven Skill Mapping', 'Comprehensive Skill Mapping')
# Fix Card 3
content = content.replace('advanced NLP algorithms', 'advanced matching tools')
content = content.replace('Smart Job Matching', 'Automated Job Matching')
# Fix Card 6
content = content.replace('AI interviewer', 'guided interview framework')

# Fix UI styles of cards to match dark blue corporate (just in case they meant the styling too)
# The icons currently have text-teal-600 bg-indigo-100.
content = content.replace('bg-indigo-100 text-teal-600', 'bg-blue-100 text-blue-800')
content = content.replace('bg-[#f3f0fc]', 'bg-gray-50 border border-gray-100')
content = content.replace('hover:border-indigo-100', 'hover:border-blue-200')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
