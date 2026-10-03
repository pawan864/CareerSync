import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Instead of hardcoding regex replacements, let's just replace the exact links one by one.
# But it's easier to use regex because the classNames differ slightly.

# For Student
content = re.sub(r'(Student Login.*?<Link to="/register")(\s+className="[^"]*">)', r'\1 state={{ role: "student" }}\2', content, flags=re.DOTALL)

# For Faculty
content = re.sub(r'(Faculty Portal.*?<Link to="/register")(\s+className="[^"]*">)', r'\1 state={{ role: "faculty" }}\2', content, flags=re.DOTALL)

# For TPO
content = re.sub(r'(TPO Portal.*?<Link to="/register")(\s+className="[^"]*">)', r'\1 state={{ role: "tpo" }}\2', content, flags=re.DOTALL)

# For Recruiter
content = re.sub(r'(Employer Portal.*?<Link to="/register")(\s+className="[^"]*">)', r'\1 state={{ role: "recruiter" }}\2', content, flags=re.DOTALL)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
