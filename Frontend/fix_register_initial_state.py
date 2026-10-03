import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the initial state instantly pull from location state!
# Wait, we can't call useLocation() before useState().
# Let's move useLocation() up above useState()!

content = content.replace('const [formData, setFormData] = useState({', 'const location = useLocation();\n    const [formData, setFormData] = useState({')

# Now update the initial role in useState
content = content.replace("role: 'student',", "role: location.state?.role || 'student',")

# Now remove the redundant location and useEffect further down
old_redundant = """    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.role) {
            setFormData(prev => ({ ...prev, role: location.state.role }));
        }
    }, [location.state]);"""

content = content.replace(old_redundant, "    const navigate = useNavigate();")

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
