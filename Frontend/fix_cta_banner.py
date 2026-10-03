import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the CTA Banner class
old_cta = 'className="bg-gradient-to-r from-white via-blue-200 to-blue-500 mt-16 mx-4 sm:mx-8 lg:mx-16 rounded-3xl overflow-hidden shadow-xl mb-20 relative"'
new_cta = 'className={`bg-gradient-to-r mt-16 mx-4 sm:mx-8 lg:mx-16 rounded-3xl overflow-hidden shadow-xl mb-20 relative transition-colors duration-700 ${pageStyles[pageTheme].ctaGradient}`}'
content = content.replace(old_cta, new_cta)

# Replace the specific case where there might be a newline
content = re.sub(r'className="bg-gradient-to-r from-white via-blue-200 to-blue-500\s+mt-16', r'className={`bg-gradient-to-r transition-colors duration-700 ${pageStyles[pageTheme].ctaGradient} mt-16', content)
content = content.replace('shadow-xl mb-20 relative"', 'shadow-xl mb-20 relative`}')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
