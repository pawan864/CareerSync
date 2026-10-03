import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure motion is imported
if 'import { motion' not in content:
    content = content.replace("from 'framer-motion';", "import { motion } from 'framer-motion';")
else:
    # ensure motion is in the import
    if 'motion,' not in content and ' motion ' not in content:
        content = content.replace("import { AnimatePresence }", "import { motion, AnimatePresence }")

# Replace the root wrapper
old_wrapper = '<div \n            className="fixed inset-0 w-full h-full overflow-hidden flex font-sans"\n        >'
if old_wrapper not in content:
    old_wrapper = '<div className="fixed inset-0 w-full h-full overflow-hidden flex font-sans">'

new_wrapper = """        <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-full h-full overflow-hidden flex font-sans"
        >"""

content = content.replace(old_wrapper, new_wrapper)
content = content.replace('<div\n            className="fixed inset-0 w-full h-full overflow-hidden flex font-sans"\n        >', new_wrapper)
# Also in case it has different formatting:
content = re.sub(r'<div\s+className="fixed inset-0 w-full h-full overflow-hidden flex font-sans"\s*>', new_wrapper, content)

# Replace the closing tag of the root wrapper
# We need to find the last </div> and change it to </motion.div>
# Since we know the file ends with </div>\n    );\n};\n\nexport default Register;
old_end = """        </div>
    );
};

export default Register;"""
new_end = """        </motion.div>
    );
};

export default Register;"""
content = content.replace(old_end, new_end)

# Also remove animate-fade-in-right if it exists so it doesn't clash
content = content.replace(' animate-fade-in-right', '')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
