import re

# 1. Update Home.jsx to dispatch event
home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

home_injection = """    useEffect(() => {
        window.dispatchEvent(new CustomEvent('heroSlideChange', { detail: { slide: currentSlide } }));
    }, [currentSlide]);"""

if "heroSlideChange" not in home_content:
    home_content = home_content.replace('const [isPaused, setIsPaused] = useState(false);', 'const [isPaused, setIsPaused] = useState(false);\n\n' + home_injection)
    with open(home_path, 'w', encoding='utf-8') as f:
        f.write(home_content)

# 2. Update Navbar.jsx to listen to event
nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

nav_state = """    const [scrolled, setScrolled] = useState(false);
    const [navTheme, setNavTheme] = useState('blue');

    useEffect(() => {
        const handleSlideChange = (e) => {
            const themes = ['blue', 'indigo', 'orange'];
            setNavTheme(themes[e.detail.slide] || 'blue');
        };
        window.addEventListener('heroSlideChange', handleSlideChange);
        
        // Reset theme if route changes (optional, but good practice)
        return () => window.removeEventListener('heroSlideChange', handleSlideChange);
    }, []);"""

nav_content = nav_content.replace('    const [scrolled, setScrolled] = useState(false);', nav_state)

# 3. Update the Nav class dynamic logic
old_nav_class = '<nav className={`sticky top-0 z-50 transition-colors duration-500 ${scrolled ? "bg-blue-50/95 backdrop-blur-md shadow-md border-b border-blue-200" : "bg-white shadow-sm border-b border-gray-200"}`}>'

new_nav_class = """
    const themeClasses = {
        blue: "bg-blue-50/95 border-blue-200 shadow-blue-900/5",
        indigo: "bg-indigo-50/95 border-indigo-200 shadow-indigo-900/5",
        orange: "bg-orange-50/95 border-orange-200 shadow-orange-900/5"
    };

    const activeNavClass = scrolled 
        ? `${themeClasses[navTheme]} backdrop-blur-md shadow-md border-b`
        : "bg-white shadow-sm border-b border-gray-200";
"""

if "const themeClasses" not in nav_content:
    nav_content = nav_content.replace('    const navigate = useNavigate();', '    const navigate = useNavigate();' + new_nav_class)
    nav_content = nav_content.replace(old_nav_class, '<nav className={`sticky top-0 z-50 transition-colors duration-500 ${activeNavClass}`}>')
    
    with open(nav_path, 'w', encoding='utf-8') as f:
        f.write(nav_content)

