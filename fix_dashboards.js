const fs = require('fs');

function fixStudent() {
    let content = fs.readFileSync('Frontend/src/pages/student/StudentDashboard.jsx', 'utf8');

    content = content.replace('HelpCircle', 'HelpCircle, Menu, X');

    content = content.replace('const [isDropdownOpen, setIsDropdownOpen] = useState(false);', 'const [isDropdownOpen, setIsDropdownOpen] = useState(false);\n    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);');

    content = content.replace('onClick={() => setActiveTab(item.id)}', 'onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}');

    content = content.replace('className="w-72 bg-white/60 backdrop-blur-md border-r border-blue-200 flex flex-col z-20"', 'className={`fixed md:relative w-72 h-full bg-white/95 backdrop-blur-md border-r border-blue-200 flex flex-col z-30 transition-transform duration-300 ${mobileMenuOpen ? \'translate-x-0\' : \'-translate-x-full md:translate-x-0\'}`}');

    content = content.replace('{/* Main Content Area */}', '{/* Mobile Overlay */}\n            {mobileMenuOpen && (\n                <div \n                    className="fixed inset-0 bg-black/50 z-20 md:hidden" \n                    onClick={() => setMobileMenuOpen(false)}\n                />\n            )}\n\n            {/* Main Content Area */}');

    content = content.replace('justify-between px-8 z-20', 'justify-between px-4 md:px-8 z-10');

    content = content.replace('<div>\n                        <h2', '<div className="flex items-center">\n                        <button \n                            onClick={() => setMobileMenuOpen(true)}\n                            className="md:hidden p-2 -ml-2 mr-2 text-blue-900 rounded-lg hover:bg-blue-100"\n                        >\n                            <Menu className="w-6 h-6" />\n                        </button>\n                        <div>\n                        <h2');

    content = content.replace('</p>\n                    </div>\n                    <div className="flex items-center space-x-4 relative"', '</p>\n                        </div>\n                    </div>\n                    <div className="flex items-center space-x-4 relative"');

    fs.writeFileSync('Frontend/src/pages/student/StudentDashboard.jsx', content);
    console.log('Fixed Student Dashboard');
}

function fixFaculty() {
    let content = fs.readFileSync('Frontend/src/pages/FacultyDashboard.jsx', 'utf8');
    
    if (!content.includes('Menu,')) {
        content = content.replace('LogOut', 'LogOut, Menu, X');
    }
    
    if (!content.includes('mobileMenuOpen')) {
        content = content.replace('const [isDropdownOpen, setIsDropdownOpen] = useState(false);', 'const [isDropdownOpen, setIsDropdownOpen] = useState(false);\n    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);');
    }

    content = content.replace('onClick={() => setActiveTab(item.id)}', 'onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}');
    
    content = content.replace('className="w-72 bg-[#050505] border-r border-gray-800 flex flex-col z-20"', 'className={`fixed md:relative w-72 h-full bg-[#050505] border-r border-gray-800 flex flex-col z-30 transition-transform duration-300 ${mobileMenuOpen ? \'translate-x-0\' : \'-translate-x-full md:translate-x-0\'}`}');
    content = content.replace('className="w-72 bg-white border-r border-gray-200 flex flex-col z-20"', 'className={`fixed md:relative w-72 h-full bg-white border-r border-gray-200 flex flex-col z-30 transition-transform duration-300 ${mobileMenuOpen ? \'translate-x-0\' : \'-translate-x-full md:translate-x-0\'}`}');

    content = content.replace('{/* Main Content Area */}', '{/* Mobile Overlay */}\n            {mobileMenuOpen && (\n                <div \n                    className="fixed inset-0 bg-black/50 z-20 md:hidden" \n                    onClick={() => setMobileMenuOpen(false)}\n                />\n            )}\n\n            {/* Main Content Area */}');
    
    content = content.replace('justify-between px-8 z-20', 'justify-between px-4 md:px-8 z-10');
    
    content = content.replace('<div>\n                        <h2', '<div className="flex items-center">\n                        <button \n                            onClick={() => setMobileMenuOpen(true)}\n                            className="md:hidden p-2 -ml-2 mr-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"\n                        >\n                            <Menu className="w-6 h-6" />\n                        </button>\n                        <div>\n                        <h2');
    
    content = content.replace('</p>\n                    </div>\n                    <div className="flex items-center space-x-4 relative"', '</p>\n                        </div>\n                    </div>\n                    <div className="flex items-center space-x-4 relative"');

    fs.writeFileSync('Frontend/src/pages/FacultyDashboard.jsx', content);
    console.log('Fixed Faculty Dashboard');
}

function fixAdmin() {
    let content = fs.readFileSync('Frontend/src/pages/admin/AdminDashboard.jsx', 'utf8');
    
    if (!content.includes('Menu,')) {
        content = content.replace('LogOut', 'LogOut, Menu, X');
    }
    
    if (!content.includes('mobileMenuOpen')) {
        content = content.replace('const [activeTab, setActiveTab] = React.useState(\'users\');', 'const [activeTab, setActiveTab] = React.useState(\'users\');\n    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);');
    }

    content = content.replace('onClick={() => setActiveTab(item.id)}', 'onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}');
    
    content = content.replace('className="w-64 bg-[#0a0a0a] border-r border-gray-800 flex flex-col relative z-20"', 'className={`fixed md:relative w-64 h-full bg-[#0a0a0a] border-r border-gray-800 flex flex-col z-30 transition-transform duration-300 ${mobileMenuOpen ? \'translate-x-0\' : \'-translate-x-full md:translate-x-0\'}`}');
    
    content = content.replace('{/* Main Content Area */}', '{/* Mobile Overlay */}\n            {mobileMenuOpen && (\n                <div \n                    className="fixed inset-0 bg-black/50 z-20 md:hidden" \n                    onClick={() => setMobileMenuOpen(false)}\n                />\n            )}\n\n            {/* Main Content Area */}');
    
    content = content.replace('className="h-16 border-b border-gray-800 bg-[#050505] flex items-center justify-between px-8"', 'className="h-16 border-b border-gray-800 bg-[#050505] flex items-center justify-between px-4 md:px-8"');
    
    content = content.replace('<div>\n                        <h2', '<div className="flex items-center">\n                        <button \n                            onClick={() => setMobileMenuOpen(true)}\n                            className="md:hidden p-2 -ml-2 mr-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"\n                        >\n                            <Menu className="w-6 h-6" />\n                        </button>\n                        <div>\n                        <h2');
    
    content = content.replace('</p>\n                    </div>\n                    <div className="flex items-center space-x-4"', '</p>\n                        </div>\n                    </div>\n                    <div className="flex items-center space-x-4"');

    fs.writeFileSync('Frontend/src/pages/admin/AdminDashboard.jsx', content);
    console.log('Fixed Admin Dashboard');
}

fixStudent();
fixFaculty();
fixAdmin();
