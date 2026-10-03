import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the scroll state logic back
old_logic = """const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();"""

new_logic = """const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);"""

content = content.replace(old_logic, new_logic)

# Update nav class to start white, then change to blue-50 when scrolled
old_nav = '<nav className="bg-white shadow-sm border-b sticky top-0 z-50">'
new_nav = '<nav className={`sticky top-0 z-50 transition-colors duration-500 ${scrolled ? "bg-blue-50/95 backdrop-blur-md shadow-md border-b border-blue-200" : "bg-white shadow-sm border-b border-gray-200"}`}>'
content = content.replace(old_nav, new_nav)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
