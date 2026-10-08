const fs = require('fs');
let content = fs.readFileSync('Frontend/src/pages/FacultyDashboard.jsx', 'utf8');

if (!content.includes('Menu,')) {
    content = content.replace('LogOut', 'LogOut, Menu, X');
}

if (!content.includes('mobileMenuOpen')) {
    content = content.replace("const [activeTab, setActiveTab] = useState('Overview');", "const [activeTab, setActiveTab] = useState('Overview');\n    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);");
}

content = content.replace('onClick={() => setActiveTab(item.id)}', 'onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}');

content = content.replace('className="w-72 bg-[#0a192f] border-r border-blue-900/50 flex flex-col relative z-20"', 'className={`fixed md:relative w-72 h-full bg-[#0a192f] border-r border-blue-900/50 flex flex-col z-30 transition-transform duration-300 ${mobileMenuOpen ? \'translate-x-0\' : \'-translate-x-full md:translate-x-0\'}`}');

content = content.replace('{/* Main Content Area */}', '{/* Mobile Overlay */}\n            {mobileMenuOpen && (\n                <div \n                    className="fixed inset-0 bg-black/50 z-20 md:hidden" \n                    onClick={() => setMobileMenuOpen(false)}\n                />\n            )}\n\n            {/* Main Content Area */}');

content = content.replace('className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shadow-sm"', 'className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 z-10 shadow-sm"');

content = content.replace('<div>\n                        <h1 className="text-xl font-bold text-gray-800">{activeTab}</h1>\n                        <p className="text-xs text-gray-500">Academic & Mentorship Dashboard</p>\n                    </div>\n\n                    <div className="flex items-center space-x-6"', '<div className="flex items-center">\n                        <button \n                            onClick={() => setMobileMenuOpen(true)}\n                            className="md:hidden p-2 -ml-2 mr-2 text-gray-400 hover:text-gray-800 rounded-lg hover:bg-gray-100"\n                        >\n                            <Menu className="w-6 h-6" />\n                        </button>\n                        <div>\n                            <h1 className="text-xl font-bold text-gray-800">{activeTab}</h1>\n                            <p className="text-xs text-gray-500">Academic & Mentorship Dashboard</p>\n                        </div>\n                    </div>\n\n                    <div className="flex items-center space-x-4 md:space-x-6"');

fs.writeFileSync('Frontend/src/pages/FacultyDashboard.jsx', content);
