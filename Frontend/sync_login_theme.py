import re

# 1. Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    login_content = f.read()

state_injection = """    const location = useLocation();
    const [globalTheme, setGlobalTheme] = useState(localStorage.getItem('globalTheme') || 'blue');

    const themeStyles = {
        blue: { bg: "from-white via-blue-200 to-blue-600", logoBg: "from-green-500/20 to-blue-600/20", logoBorder: "border-blue-200", logoText: "text-blue-800" },
        indigo: { bg: "from-white via-indigo-200 to-indigo-600", logoBg: "from-purple-500/20 to-indigo-600/20", logoBorder: "border-indigo-200", logoText: "text-indigo-800" },
        orange: { bg: "from-white via-orange-200 to-orange-500", logoBg: "from-amber-500/20 to-orange-600/20", logoBorder: "border-orange-200", logoText: "text-orange-800" }
    };
"""
login_content = login_content.replace('    const location = useLocation();', state_injection)

# Replace background
login_content = login_content.replace('className="fixed inset-0 w-full h-full flex flex-col items-center justify-center py-2 px-4 overflow-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600"', 'className={`fixed inset-0 w-full h-full flex flex-col items-center justify-center py-2 px-4 overflow-hidden bg-gradient-to-r transition-colors duration-700 ${themeStyles[globalTheme].bg}`}')

# Replace logo
login_content = login_content.replace('className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200"', 'className={`w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center mr-3 border ${themeStyles[globalTheme].logoBg} ${themeStyles[globalTheme].logoBorder}`}')
login_content = login_content.replace('className="w-6 h-6 text-blue-800"', 'className={`w-6 h-6 ${themeStyles[globalTheme].logoText}`}')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login_content)


# 2. Update Register.jsx
reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    reg_content = f.read()

reg_injection = """    const navigate = useNavigate();
    const [globalTheme] = useState(localStorage.getItem('globalTheme') || 'blue');

    const themeStyles = {
        blue: { bg: "from-white via-blue-200 to-blue-600", logoBg: "from-green-500/20 to-blue-600/20", logoBorder: "border-blue-200", logoText: "text-blue-800" },
        indigo: { bg: "from-white via-indigo-200 to-indigo-600", logoBg: "from-purple-500/20 to-indigo-600/20", logoBorder: "border-indigo-200", logoText: "text-indigo-800" },
        orange: { bg: "from-white via-orange-200 to-orange-500", logoBg: "from-amber-500/20 to-orange-600/20", logoBorder: "border-orange-200", logoText: "text-orange-800" }
    };
"""
reg_content = reg_content.replace('    const navigate = useNavigate();', reg_injection)

# Replace background
reg_content = reg_content.replace('className="min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-r from-white via-blue-200 to-blue-600"', 'className={`min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-r transition-colors duration-700 ${themeStyles[globalTheme].bg}`}')

# Replace logo
reg_content = reg_content.replace('className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200"', 'className={`w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center mr-3 border ${themeStyles[globalTheme].logoBg} ${themeStyles[globalTheme].logoBorder}`}')
reg_content = reg_content.replace('className="w-6 h-6 text-blue-800"', 'className={`w-6 h-6 ${themeStyles[globalTheme].logoText}`}')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(reg_content)

