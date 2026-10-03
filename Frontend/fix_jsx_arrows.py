import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("Student -> Industry Feedback", "Student &rarr; Industry Feedback")
content = content.replace("Industry -> Student Feedback", "Industry &rarr; Student Feedback")

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
