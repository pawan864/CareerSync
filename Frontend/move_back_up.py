import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all occurrences of top-6 right-6 with top-3 right-6 for the Back arrow (and the Home arrow for the support modal)
content = content.replace('className="absolute top-6 right-6 p-2', 'className="absolute top-4 right-6 p-2')
content = content.replace('className="absolute top-6 right-6 text-gray-400', 'className="absolute top-4 right-6 text-gray-400')
content = content.replace('className="absolute top-6 right-6 text-gray-500', 'className="absolute top-4 right-6 text-gray-500')

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
