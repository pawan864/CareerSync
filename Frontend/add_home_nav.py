import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Import Home icon
content = content.replace("LayoutDashboard,", "LayoutDashboard, Home,")

# Add Home to navItems
nav_replace = """
    const navItems = [
        { id: 'home', label: 'Home Page', icon: Home, desc: 'Return to main site' },
"""
content = content.replace("const navItems = [", nav_replace)

# Modify onClick
content = content.replace("onClick={() => setActiveTab(item.id)}", "onClick={() => item.id === 'home' ? navigate('/') : setActiveTab(item.id)}")

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
