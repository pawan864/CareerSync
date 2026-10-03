css_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\index.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

global_css = """
/* Global styles to remove scrollbar visibility and block rubber-band pulling effect */
html, body {
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  
  scrollbar-width: none;  
  
  /* Disable bounce/pull-to-refresh effect which reveals background */
  overscroll-behavior-y: none;
  overscroll-behavior-x: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
html::-webkit-scrollbar, body::-webkit-scrollbar {
  display: none;
}
"""

if "overscroll-behavior-y" not in content:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write("\n" + global_css)
