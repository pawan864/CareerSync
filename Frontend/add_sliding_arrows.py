import re

footer_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Footer.jsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Link tags to have the group and flex properties, and add the arrow
content = re.sub(
    r'<li><Link to="([^"]+)" className="hover:text-blue-900 transition-all duration-300">([^<]+)<\/Link><\/li>',
    r'<li><Link to="\1" className="group flex items-center hover:text-blue-900 transition-all duration-300"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1 mr-1.5">&rarr;</span>\2</Link></li>',
    content
)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Now Navbar dropdowns
nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

# The Dropdown link looks like: <Link key={idx} to={detail.link} className="block p-3 rounded-lg transition-colors">
# We want to change the title inside to have an arrow
old_title_div = '<div className="font-semibold text-gray-900 text-sm">{detail.title}</div>'
new_title_div = '<div className="font-semibold text-gray-900 text-sm flex items-center"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1 mr-1.5 text-blue-900 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0">&rarr;</span><span className="transition-transform duration-300 group-hover:translate-x-1">{detail.title}</span></div>'

# Wait, if we use group-hover in Navbar, the Link must have 'group' class.
# Let's check the Navbar.jsx Link class
nav_content = nav_content.replace('className="block p-3 rounded-lg', 'className="group block p-3 rounded-lg')
nav_content = nav_content.replace(old_title_div, new_title_div)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(nav_content)

