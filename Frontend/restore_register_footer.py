import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the "Already have an account" block with the full footer block
old_footer = """                        <div className="mt-6 border-t border-gray-800 pt-4">
                            <p className="text-gray-400 text-xs">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>"""

new_footer = """                        <div className={`mt-6 border-t pt-4 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold transition-all hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)]">
                                    Sign in
                                </Link>
                            </p>
                            
                            <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Need assistance?{' '}
                                <Link to="/support" className="text-blue-600 hover:text-blue-500 font-semibold transition-all hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)]">
                                    Contact Admin
                                </Link>
                            </p>

                            <p className={`text-xs mt-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                By signing up, you agree to our{' '}
                                <a href="#" className="text-blue-600 hover:underline hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)] transition-all">Terms</a>
                                {' '}and{' '}
                                <a href="#" className="text-blue-600 hover:underline hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)] transition-all">Privacy Policy</a>.
                            </p>
                        </div>"""

content = content.replace(old_footer, new_footer)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
