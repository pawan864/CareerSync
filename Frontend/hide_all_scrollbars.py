css_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\index.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update global scrollbar CSS to target EVERYTHING
global_css = """
/* Hide scrollbar universally for all scrollable containers but allow scrolling */
*, *::before, *::after {
  -ms-overflow-style: none !important;  /* IE and Edge */
  scrollbar-width: none !important;  /* Firefox */
}

*::-webkit-scrollbar {
  display: none !important; /* Chrome, Safari and Opera */
  width: 0 !important;
  height: 0 !important;
}
"""

if "*::-webkit-scrollbar" not in content:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write("\n" + global_css)
