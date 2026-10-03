import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import ProfileBuilder from './ProfileBuilder';\n"
if "import ProfileBuilder" not in content:
    content = content.replace("import { useNavigate } from 'react-router-dom';", "import { useNavigate } from 'react-router-dom';\n" + import_stmt)

# Remove the placeholder
content = re.sub(r'const ProfileBuilder = \(\) => <div.*?</div>;', '', content)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
