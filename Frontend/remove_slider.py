import re

register_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(register_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove Decorative dots
dots_pattern = r'\s*\{\/\* Decorative dots \/ Slide Indicators \*\/\}\s*<div className="absolute top-12 left-16 flex space-x-2">\s*\{slides\.map\(\(_, index\) => \(\s*<div \s*key=\{index\} \s*className=\{`h-2 rounded-full transition-all duration-500 \$\{\s*currentSlide === index \? \'w-8 bg-blue-500\' : \'w-2 bg-gray-600\'\s*\}\`\}\s*><\/div>\s*\)\)\}\s*<\/div>'
content = re.sub(dots_pattern, '', content)

# 2. Remove Laptop / Image Slider
slider_pattern = r'\s*\{\/\* Laptop \/ Image Slider \*\/\}\s*<div className="w-full max-w-lg h-64 bg-\[\#111827\] rounded-t-xl border-4 border-gray-800 shadow-2xl relative overflow-hidden">\s*<div \s*className="flex h-full w-full transition-transform duration-1000 ease-in-out"\s*style=\{\{ transform: `translateX\(\-\$\{currentSlide \* 100\}\%\)` \}\}\s*>\s*\{slides\.map\(\(slide, index\) => \(\s*<img \s*key=\{index\}\s*src=\{slide\}\s*alt=\{`Slide \$\{index \+ 1\}`\}\s*className="w-full h-full object-cover flex-shrink-0"\s*\/>\s*\)\)\}\s*<\/div>\s*<\/div>\s*<div className="w-full max-w-lg h-3 bg-gray-400 rounded-b-xl shadow-2xl mb-12 relative flex justify-center items-center">\s*<div className="w-16 h-1 bg-gray-300 rounded-b-md absolute top-0"><\/div>\s*<\/div>'
content = re.sub(slider_pattern, '', content)

with open(register_path, 'w', encoding='utf-8') as f:
    f.write(content)
