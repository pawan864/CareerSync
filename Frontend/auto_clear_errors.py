import re

# UPDATE LOGIN.JSX
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

error_effect = """
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);
"""

if "setTimeout(() => setError(''), 5000);" not in content:
    content = content.replace("    const { login } = useContext(AuthContext);", error_effect + "\n    const { login } = useContext(AuthContext);")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)


# UPDATE ADMINLOGIN.JSX
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

if "setTimeout(() => setError(''), 5000);" not in admin_content:
    admin_content = admin_content.replace("    const { login } = useContext(AuthContext);", error_effect + "\n    const { login } = useContext(AuthContext);")

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
