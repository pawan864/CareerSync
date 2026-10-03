import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add framer-motion import
if "import { motion }" not in content:
    content = content.replace("import { GraduationCap, ArrowLeft, Mail, Sun, Moon } from 'lucide-react';", "import { GraduationCap, ArrowLeft, Mail, Sun, Moon } from 'lucide-react';\nimport { motion } from 'framer-motion';")

# Replace outer div with motion.div
old_wrapper = '        <div className="fixed inset-0 w-full h-full overflow-hidden flex font-sans">'
new_wrapper = """        <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-full h-full overflow-hidden flex font-sans"
        >"""
content = content.replace(old_wrapper, new_wrapper)

# Replace closing div for the main wrapper
old_end = """                </div>
            </div>
        </div>
    );
};

export default Register;"""
new_end = """                </div>
            </div>
        </motion.div>
    );
};

export default Register;"""
content = content.replace(old_end, new_end)

# Also remove the animate-fade-in-left and right so they don't clash with the smooth parent motion
content = content.replace('animate-fade-in-left', '')
content = content.replace('animate-fade-in-right', '')

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
