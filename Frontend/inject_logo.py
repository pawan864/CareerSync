import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the Logo Area by looking for "Logo Area" comment
replacement = """
                {/* Logo Area */}
                <div className="p-6 border-b border-blue-200 bg-white/40 flex items-center">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mr-3 border border-teal-200">
                        <GraduationCap className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Career<span className="text-teal-600">Sync</span></h1>
                        <p className="text-[10px] text-teal-700 font-medium">Student Portal</p>
                    </div>
                </div>
"""
content = re.sub(r'\{\/\* Logo Area \*\/\}.*?\{\/\* Navigation \*\/\}', replacement + '\n\n                {/* Navigation */}', content, flags=re.DOTALL)

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
