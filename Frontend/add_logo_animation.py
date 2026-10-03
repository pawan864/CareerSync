import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add motion import if not present
if "import { motion }" not in content:
    content = content.replace("import { GraduationCap } from 'lucide-react';", "import { GraduationCap } from 'lucide-react';\nimport { motion } from 'framer-motion';")

# Replace the logo div with motion.div
old_logo = """<div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200">
                                <GraduationCap className="w-5 h-5 text-blue-800" />
                            </div>"""

new_logo = """<motion.div 
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200"
                            >
                                <GraduationCap className="w-5 h-5 text-blue-800" />
                            </motion.div>"""

content = content.replace(old_logo, new_logo)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
