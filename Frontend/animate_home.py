import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add framer motion import
if "import { motion } from 'framer-motion';" not in content:
    content = content.replace("import { BookOpen,", "import { motion } from 'framer-motion';\nimport { BookOpen,")

# Replace outer div with motion.div
old_wrapper = '        <div className="bg-white">'
new_wrapper = """        <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white"
        >"""
content = content.replace(old_wrapper, new_wrapper)

# Replace the closing tag
old_end = """        </div>
    );
};

export default Home;"""
new_end = """        </motion.div>
    );
};

export default Home;"""
content = content.replace(old_end, new_end)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
