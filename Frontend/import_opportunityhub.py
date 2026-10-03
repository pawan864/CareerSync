import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import OpportunityHub from './OpportunityHub';\n"
if "import OpportunityHub" not in content:
    content = content.replace("import SkillCenter from './SkillCenter';", "import SkillCenter from './SkillCenter';\n" + import_stmt)

# Remove the placeholder
content = re.sub(r'const OpportunityHub = \(\) => <div.*?</div>;', '', content)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
