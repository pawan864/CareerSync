import re

dashboards = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\EmployerDashboard.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\InstitutionDashboard.jsx'
]

for path in dashboards:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Add active:scale-95 to the sidebar nav buttons
        # They usually look like: className={`w-full flex items-center ... transition-all ... ${
        
        # Let's match: className={`w-full flex items-center[^`]*transition-all[^`]*\$\{
        # and replace with: className={`w-full flex items-center ... transition-all ... active:scale-95 ${
        
        def replacer(match):
            text = match.group(0)
            if 'active:scale-95' not in text:
                return text.replace('${', 'active:scale-95 ${')
            return text

        # Regex to find the nav button className block
        pattern = r'className=\{`w-full flex items-center[^`]*?transition-all[^`]*?\$\{'
        
        new_content = re.sub(pattern, replacer, content)
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {path}")
        else:
            print(f"No changes for {path} (maybe pattern didn't match)")
            
    except Exception as e:
        print(f"Error on {path}: {e}")
