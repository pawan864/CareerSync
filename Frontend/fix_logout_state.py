import re

dashboards = [
    (r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx', '../../context/AuthContext'),
    (r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx', '../context/AuthContext'),
    (r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\EmployerDashboard.jsx', '../context/AuthContext'),
    (r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\InstitutionDashboard.jsx', '../context/AuthContext')
]

for path, context_path in dashboards:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Import AuthContext if missing
        if 'AuthContext' not in content:
            # Insert after other imports
            content = re.sub(r"(import React.*?;\n)", r"\1import { AuthContext } from '" + context_path + "';\nimport { useContext } from 'react';\n", content)
            # If no import React, just add to top
            if 'import { AuthContext }' not in content:
                content = f"import {{ AuthContext }} from '{context_path}';\nimport {{ useContext }} from 'react';\n" + content

        # Check if useContext is imported
        if 'useContext' not in content:
            content = content.replace("import React, {", "import React, { useContext,")
            if 'useContext' not in content:
                content = content.replace("from 'react'", ", { useContext } from 'react'")

        # Inject logout from useContext(AuthContext)
        component_name = path.split('\\')[-1].replace('.jsx', '')
        component_def = f"const {component_name} = () => {{"
        
        if component_def in content:
            # Only inject if not already there
            if 'const { logout }' not in content:
                content = content.replace(component_def, component_def + "\n    const { logout } = useContext(AuthContext);")
        else:
            # Fallback if export default function AdminDashboard()
            component_def = f"export default function {component_name}() {{"
            if component_def in content and 'const { logout }' not in content:
                content = content.replace(component_def, component_def + "\n    const { logout } = useContext(AuthContext);")
        
        # Modify handleLogout to call logout()
        old_handle_logout_1 = "const handleLogout = () => {\n        // In a real app, clear tokens here\n        navigate('/admin-login');\n    };"
        new_handle_logout_1 = "const handleLogout = () => {\n        logout();\n        navigate('/admin-login');\n    };"
        content = content.replace(old_handle_logout_1, new_handle_logout_1)

        old_handle_logout_2 = "const handleLogout = () => {\n        // Clear tokens here in real app\n        navigate('/admin-login');\n    };"
        new_handle_logout_2 = "const handleLogout = () => {\n        logout();\n        navigate('/admin-login');\n    };"
        content = content.replace(old_handle_logout_2, new_handle_logout_2)

        old_handle_logout_3 = "const handleLogout = () => {\n        navigate('/login');\n    };"
        new_handle_logout_3 = "const handleLogout = () => {\n        logout();\n        navigate('/');\n    };"
        content = content.replace(old_handle_logout_3, new_handle_logout_3)

        old_handle_logout_4 = "const handleLogout = () => {\n        navigate('/');\n    };"
        new_handle_logout_4 = "const handleLogout = () => {\n        logout();\n        navigate('/');\n    };"
        content = content.replace(old_handle_logout_4, new_handle_logout_4)
        
        # Generic regex replace for handleLogout if the exact match failed
        if 'logout();' not in content:
            content = re.sub(r"(const handleLogout = \(\) => \{\n\s*)(.*navigate\(['\"/a-z-]+\'];\n\s*\})", r"\1logout();\n        \2", content)
            
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {path}")
    except Exception as e:
        print(f"Error on {path}: {e}")
