import re

files = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Footer.jsx'
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove all glows
    content = re.sub(r'hover:\[text-shadow:[^\]]+\]\s*', '', content)
    content = re.sub(r'hover:drop-shadow-\[[^\]]+\]\s*', '', content)
    
    # Remove all hover backgrounds
    content = content.replace('hover:bg-gray-50 ', '')
    content = content.replace('hover:bg-indigo-50 ', '')
    content = content.replace('hover:bg-blue-50 ', '')
    
    # Ensure they have hover:text-blue-900
    # Actually, they already have hover:text-blue-900 from my previous scripts.

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

