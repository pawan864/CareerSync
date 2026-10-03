import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Expand dropdownClasses to dynamicStyles
old_dropdownClasses = """    const dropdownClasses = {
        blue: { bg: "from-white via-blue-100 to-blue-300", shadow: "hover:shadow-blue-200" },
        indigo: { bg: "from-white via-indigo-100 to-indigo-300", shadow: "hover:shadow-indigo-200" },
        orange: { bg: "from-white via-orange-100 to-orange-300", shadow: "hover:shadow-orange-200" }
    };"""

new_dynamicStyles = """    const dynamicStyles = {
        blue: { bg: "from-white via-blue-100 to-blue-300", shadow: "hover:shadow-blue-200", syncText: "text-blue-900", loginBtn: "text-blue-900 border-blue-900", loginHoverBg: "bg-blue-900", signupBtn: "bg-blue-900 border-blue-900", signupTextHover: "hover:text-blue-900" },
        indigo: { bg: "from-white via-indigo-100 to-indigo-300", shadow: "hover:shadow-indigo-200", syncText: "text-indigo-900", loginBtn: "text-indigo-900 border-indigo-900", loginHoverBg: "bg-indigo-900", signupBtn: "bg-indigo-900 border-indigo-900", signupTextHover: "hover:text-indigo-900" },
        orange: { bg: "from-white via-orange-100 to-orange-300", shadow: "hover:shadow-orange-200", syncText: "text-orange-900", loginBtn: "text-orange-900 border-orange-900", loginHoverBg: "bg-orange-900", signupBtn: "bg-orange-900 border-orange-900", signupTextHover: "hover:text-orange-900" }
    };"""
content = content.replace(old_dropdownClasses, new_dynamicStyles)

# Update dropdowns to use dynamicStyles
content = content.replace("dropdownClasses[navTheme]", "dynamicStyles[navTheme]")

# Update "Sync" text
content = content.replace('<span className="text-blue-900">Sync</span>', '<span className={`${dynamicStyles[navTheme].syncText} transition-colors duration-500`}>Sync</span>')

# Update Login button
old_login = """<Link
                                    to="/login"
                                    className="group relative overflow-hidden px-5 py-2 text-sm font-medium text-blue-900 bg-transparent border border-blue-900 rounded-md transition-colors duration-300 hover:text-white"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-blue-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                                    <span className="relative z-10">Log in</span>
                                </Link>"""

new_login = """<Link
                                    to="/login"
                                    className={`group relative overflow-hidden px-5 py-2 text-sm font-medium bg-transparent border rounded-md transition-all duration-500 hover:text-white ${dynamicStyles[navTheme].loginBtn}`}
                                >
                                    <span className={`absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 ${dynamicStyles[navTheme].loginHoverBg}`}></span>
                                    <span className="relative z-10">Log in</span>
                                </Link>"""
content = content.replace(old_login, new_login)

# Update Signup button
old_signup = """<Link
                                    to="/register"
                                    className="ml-3 group relative overflow-hidden px-5 py-2 text-sm font-medium text-white bg-blue-900 border border-blue-900 rounded-md transition-colors duration-300 hover:text-blue-900"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                                    <span className="relative z-10">Sign up</span>
                                </Link>"""

new_signup = """<Link
                                    to="/register"
                                    className={`ml-3 group relative overflow-hidden px-5 py-2 text-sm font-medium text-white border rounded-md transition-all duration-500 ${dynamicStyles[navTheme].signupBtn} ${dynamicStyles[navTheme].signupTextHover}`}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                                    <span className="relative z-10">Sign up</span>
                                </Link>"""
content = content.replace(old_signup, new_signup)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
