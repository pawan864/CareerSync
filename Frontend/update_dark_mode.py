import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Sun, Moon to lucide-react import
content = content.replace("import { GraduationCap, ArrowLeft, Mail } from 'lucide-react';", "import { GraduationCap, ArrowLeft, Mail, Sun, Moon } from 'lucide-react';")

# 2. Add state
content = content.replace("const [showPassword, setShowPassword] = useState(false);", "const [showPassword, setShowPassword] = useState(false);\n    const [isDarkMode, setIsDarkMode] = useState(true);")

# 3. Wrapper
content = content.replace('className="w-full lg:w-1/2 bg-[#020617] flex flex-col relative px-8 sm:px-16 py-8 overflow-y-auto slim-scrollbar animate-fade-in-right"', "className={w-full lg:w-1/2 flex flex-col relative px-8 sm:px-16 py-8 overflow-y-auto slim-scrollbar animate-fade-in-right }")

# 4. Toggle Button injection (right after Back link)
toggle_button = '''
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)} 
                    className={bsolute top-8 right-8 p-2 rounded-full transition-colors }
                >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
'''
content = content.replace('</Link>', f'</Link>{toggle_button}', 1)

# 5. Form texts
content = content.replace("className=\"text-gray-400 hover:text-white flex items-center text-sm font-medium w-fit mb-8 lg:mb-0 lg:absolute lg:top-8 lg:left-8\"", "className={lex items-center text-sm font-medium w-fit mb-8 lg:mb-0 lg:absolute lg:top-8 lg:left-8 }")

content = content.replace("'bg-[#1e293b] border-blue-500 text-white'", "isDarkMode ? 'bg-[#1e293b] border-blue-500 text-white' : 'bg-blue-50 border-blue-500 text-blue-700'")
content = content.replace("'border-gray-800 text-gray-400 hover:border-gray-600'", "isDarkMode ? 'border-gray-800 text-gray-400 hover:border-gray-600' : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'")

content = content.replace('className="text-white text-2xl font-bold mb-6"', "className={${isDarkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold mb-6}")
content = content.replace('className="text-white text-sm font-semibold mb-3 border-b border-gray-700 pb-1"', "className={${isDarkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'} text-sm font-semibold mb-3 border-b pb-1}")
content = content.replace('className="block text-gray-400 text-xs mb-1"', "className={lock  text-xs mb-1}")
content = content.replace('className="font-bold text-xl text-white tracking-tight"', "className={ont-bold text-xl  tracking-tight}")
content = content.replace('className="text-gray-400 text-xs mb-1"', "className={${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mb-1}")

content = content.replace('className="text-gray-500 text-[10px] font-bold tracking-widest mb-2 uppercase"', "className={${isDarkMode ? 'text-gray-500' : 'text-gray-600'} text-[10px] font-bold tracking-widest mb-2 uppercase}")

content = content.replace('className="flex-1 flex items-center justify-center bg-transparent border border-gray-800 hover:border-gray-600 text-white py-2 rounded-md transition-colors"', "className={lex-1 flex items-center justify-center border py-2 rounded-md transition-colors }")

content = content.replace('className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"', "className={w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm }")
content = content.replace('className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm"', "className={w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm }")


with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

