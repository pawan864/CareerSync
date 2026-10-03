import re

for file_path in [r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\OpportunityHub.jsx', r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ApplicationTracker.jsx']:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace("import api from '../../../services/api';", "import api from '../../services/api';")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
