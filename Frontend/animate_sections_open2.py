import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# For Partners
content = re.sub(
    r'(\{\/\* Our Partners Section \(Infinite Marquee\) \*\/\}\s*)<div className="py-12 bg-white border-t border-gray-200 overflow-hidden relative">',
    r'\1<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="py-12 bg-white border-t border-gray-200 overflow-hidden relative">',
    content
)

# For CTA
content = re.sub(
    r'(\{\/\* CTA Banner \*\/\}\s*)<div className="bg-blue-900 overflow-hidden relative">',
    r'\1<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-blue-900 overflow-hidden relative">',
    content
)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
