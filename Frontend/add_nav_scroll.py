import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add useState and useEffect
content = content.replace("import React, { useContext } from 'react';", "import React, { useContext, useState, useEffect } from 'react';")

# Add scroll state logic
logic = """const Navbar = () => {
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

content = content.replace("""const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();""", logic)

# Update nav class
old_nav = '<nav className="bg-white shadow-sm border-b sticky top-0 z-50">'
new_nav = '<nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200" : "bg-white/40 backdrop-blur-md border-b border-transparent"}`}>'
content = content.replace(old_nav, new_nav)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
