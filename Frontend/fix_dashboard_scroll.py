import re

def fix_scroll(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change min-h-screen to h-screen overflow-hidden to force independent scrolling
    content = content.replace(
        '<div className="min-h-screen bg-gray-50 flex">',
        '<div className="h-screen overflow-hidden bg-gray-50 flex">'
    )
    content = content.replace(
        '<div className="min-h-screen bg-[#050505] flex">',
        '<div className="h-screen overflow-hidden bg-[#050505] flex">'
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_scroll(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx')
fix_scroll(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx')
