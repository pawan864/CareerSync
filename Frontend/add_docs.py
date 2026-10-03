import re

def add_header(filepath, description):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "/**" not in content[:50]:
        doc = f"""/**
 * {description}
 * 
 * Features:
 * - Responsive UI using Tailwind CSS
 * - Interactive Framer Motion animations
 * - Dynamic rendering based on role/portal selection
 * - Unified typography and interactive states
 */
"""
        content = doc + content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

add_header(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx', "Landing Page Component (Home.jsx)")
add_header(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', "Unified Login System (Login.jsx) handling Student, Faculty, TPO, Recruiter, and Admin authentication.")
add_header(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', "Universal Registration Portal (Register.jsx) supporting dynamic role-based forms (Student, Faculty, TPO, Recruiter).")

