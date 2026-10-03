import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# For Features
content = content.replace('{/* Features Workflow Section */}\n            <div className="bg-gray-50 py-16">',
                          '{/* Features Workflow Section */}\n            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-gray-50 py-16">')

# For Partners
content = content.replace('{/* Our Partners Section (Infinite Marquee) */}\n            <div className="py-12 bg-white border-t border-gray-200 overflow-hidden relative">',
                          '{/* Our Partners Section (Infinite Marquee) */}\n            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="py-12 bg-white border-t border-gray-200 overflow-hidden relative">')

# For CTA
content = content.replace('{/* CTA Banner */}\n            <div className="bg-blue-900 overflow-hidden relative">',
                          '{/* CTA Banner */}\n            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-blue-900 overflow-hidden relative">')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
