import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the dropdownClasses object
old_themeClasses = """    const themeClasses = {"""

new_themeClasses = """    const dropdownClasses = {
        blue: { bg: "from-white via-blue-100 to-blue-300", shadow: "hover:shadow-blue-200" },
        indigo: { bg: "from-white via-indigo-100 to-indigo-300", shadow: "hover:shadow-indigo-200" },
        orange: { bg: "from-white via-orange-100 to-orange-300", shadow: "hover:shadow-orange-200" }
    };

    const themeClasses = {"""

content = content.replace(old_themeClasses, new_themeClasses)

# Replace the hardcoded card background
old_card_bg = '<div className="bg-gradient-to-r from-white via-blue-100 to-blue-300 rounded-xl shadow-xl border border-gray-100 p-3 overflow-hidden">'
new_card_bg = '<div className={`bg-gradient-to-r ${dropdownClasses[navTheme].bg} rounded-xl shadow-xl border border-gray-100 p-3 overflow-hidden transition-colors duration-500`}>'
content = content.replace(old_card_bg, new_card_bg)

# Replace the hardcoded link shadow
old_link_class = '<Link \n                                                    key={idx} \n                                                    to={detail.link}\n                                                    className="block p-3 rounded-lg hover:bg-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"\n                                                >'
new_link_class = '<Link \n                                                    key={idx} \n                                                    to={detail.link}\n                                                    className={`block p-3 rounded-lg hover:bg-white hover:shadow-lg ${dropdownClasses[navTheme].shadow} transition-all duration-300`}\n                                                >'
content = content.replace(old_link_class, new_link_class)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
