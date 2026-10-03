import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import SkillCenter from './SkillCenter';\n"
if "import SkillCenter" not in content:
    content = content.replace("import ProfileBuilder from './ProfileBuilder';", "import ProfileBuilder from './ProfileBuilder';\n" + import_stmt)

# Remove the placeholder
content = re.sub(r'const SkillCenter = \(\) => <div.*?</div>;', '', content)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
