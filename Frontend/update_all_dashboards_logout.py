import re

dashboards = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\EmployerDashboard.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\InstitutionDashboard.jsx'
]

new_button = """<button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center py-2 px-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 active:scale-95 text-xs font-semibold border border-red-500/20 hover:border-red-500 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] group"
                    >
                        <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>"""

for path in dashboards:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to find the logout button in the sidebar. Usually it has 'onClick={handleLogout}' and says 'Sign Out' or 'Logout'
        # We will just replace any button inside a div that contains handleLogout.
        
        # We will use a regex to replace the entire button that contains onClick={handleLogout}
        # But there might be mobile logout buttons too. Let's just find the one that has w-full or similar
        button_pattern = r'<button\s*onClick=\{handleLogout\}\s*className="[^"]*".*?>.*?</button>'
        
        # We want to replace all occurrences!
        content = re.sub(button_pattern, new_button, content, flags=re.DOTALL)
        
        # Make sure LogOut is imported!
        if 'LogOut' not in content:
            if 'lucide-react' in content:
                content = re.sub(r'(import\s+\{.*?)(}\s*from\s*[\'"]lucide-react[\'"])', r'\1, LogOut \2', content, flags=re.DOTALL)
            else:
                content = "import { LogOut } from 'lucide-react';\n" + content
                
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {path}")
    except Exception as e:
        print(f"Error on {path}: {e}")
