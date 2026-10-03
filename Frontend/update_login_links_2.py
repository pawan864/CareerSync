import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# For Faculty Login
content = re.sub(r'(Faculty Login.*?<Link to="/register")(\s+className="[^"]*">)', r'\1 state={{ role: "faculty" }}\2', content, flags=re.DOTALL)

# For TPO Login
content = re.sub(r'(TPO Login.*?<Link to="/register")(\s+className="[^"]*">)', r'\1 state={{ role: "tpo" }}\2', content, flags=re.DOTALL)

# For Recruiter Login
content = re.sub(r'(Recruiter Login.*?<Link to="/register")(\s+className="[^"]*">)', r'\1 state={{ role: "recruiter" }}\2', content, flags=re.DOTALL)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
