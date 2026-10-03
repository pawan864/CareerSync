import os

components = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ProfileBuilder.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\SkillCenter.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\OpportunityHub.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ApplicationTracker.jsx'
]

for file_path in components:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('bg-[#121212]', 'bg-white')
    content = content.replace('bg-[#0a0a0a]', 'bg-gray-50')
    content = content.replace('bg-[#1a1a1a]', 'bg-blue-50')
    content = content.replace('border-gray-800', 'border-blue-100')
    content = content.replace('border-gray-700', 'border-gray-200')
    content = content.replace('text-white', 'text-gray-900')
    content = content.replace('text-gray-400', 'text-gray-600')
    content = content.replace('text-gray-300', 'text-gray-700')
    content = content.replace('bg-gray-800/50', 'bg-blue-50')
    content = content.replace('bg-[#1e1e1e]', 'bg-blue-600')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

