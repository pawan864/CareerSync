import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add useLocation to imports
content = content.replace("import { Link, useNavigate } from 'react-router-dom';", "import { Link, useNavigate, useLocation } from 'react-router-dom';")

# 2. Extract location and use it to set default role
old_init = "const { register } = useContext(AuthContext);\n    const navigate = useNavigate();"
new_init = "const { register } = useContext(AuthContext);\n    const navigate = useNavigate();\n    const location = useLocation();\n\n    useEffect(() => {\n        if (location.state?.role) {\n            setFormData(prev => ({ ...prev, role: location.state.role }));\n        }\n    }, [location.state]);"

content = content.replace(old_init, new_init)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
