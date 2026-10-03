import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<div className="bg-white py-12 border-b border-gray-100 overflow-hidden relative flex flex-col items-center">',
    '<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-white py-12 border-b border-gray-100 overflow-hidden relative flex flex-col items-center">'
)

content = content.replace(
    '<div className="bg-gradient-to-r from-white via-blue-200 to-blue-500 mt-16 mx-4 sm:mx-8 lg:mx-16 rounded-3xl overflow-hidden shadow-xl mb-20 relative">',
    '<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-white via-blue-200 to-blue-500 mt-16 mx-4 sm:mx-8 lg:mx-16 rounded-3xl overflow-hidden shadow-xl mb-20 relative">'
)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
