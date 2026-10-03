import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Support.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add GraduationCap to imports
content = content.replace("from 'lucide-react';", ", GraduationCap } from 'lucide-react';")

# Add the flex-col and the logo block
old_wrapper = """    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-r from-white via-blue-50 to-blue-100">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <motion.div """

new_wrapper = """    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-2 px-4 relative overflow-hidden bg-gradient-to-r from-white via-blue-50 to-blue-100">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            {/* Brand Logo and Tagline */}
            <div className="text-center z-20 mb-3 drop-shadow-md">
                <div className="flex items-center justify-center text-blue-900 mb-1.5">
                    <GraduationCap className="h-8 w-8 mr-2.5 text-blue-700" />
                    <span className="font-extrabold text-3xl tracking-tight">
                        Career<span className="text-blue-700">Sync</span>
                    </span>
                </div>
                <p className="text-blue-900/80 text-sm font-medium tracking-wide">
                    Bridging the Gap Between Talent and Opportunity
                </p>
            </div>

            <motion.div """

content = content.replace(old_wrapper, new_wrapper)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Support.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
