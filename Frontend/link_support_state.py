import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add useLocation to imports
if "useLocation" not in content:
    content = content.replace("import { Link, useNavigate }", "import { Link, useNavigate, useLocation }")

# Add useEffect to read state
old_state = "    const [showSupport, setShowSupport] = useState(false);"
new_state = """    const location = useLocation();
    const [showSupport, setShowSupport] = useState(location.state?.openSupport || false);
    
    useEffect(() => {
        if (location.state?.openSupport) {
            setShowSupport(true);
        }
    }, [location.state]);"""
content = content.replace(old_state, new_state)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
