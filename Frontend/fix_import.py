import re

pb_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ProfileBuilder.jsx'
with open(pb_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import api from '../../../services/api';", "import api from '../../services/api';")

with open(pb_path, 'w', encoding='utf-8') as f:
    f.write(content)
