import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace wrapper div to add hover events
content = content.replace('<div className="flex items-center space-x-4 relative">', '<div className="flex items-center space-x-4 relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>')

# Remove onClick from avatar circle
content = content.replace('onClick={() => setIsDropdownOpen(!isDropdownOpen)}', '')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
