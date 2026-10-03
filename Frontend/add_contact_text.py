import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """                        <div className="mt-6 border-t border-gray-800 pt-4">
                            <p className="text-gray-400 text-xs">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>"""
new_block = """                        <div className="mt-6 border-t border-gray-800 pt-4 space-y-2">
                            <p className="text-gray-400 text-xs">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold transition-colors">
                                    Sign in
                                </Link>
                            </p>
                            <p className="text-gray-400 text-xs">
                                Need assistance?{' '}
                                <Link to="/login" state={{ openSupport: true }} className="text-blue-500 hover:text-blue-400 font-semibold transition-colors cursor-pointer">
                                    Contact Administrator
                                </Link>
                            </p>
                        </div>"""
content = content.replace(old_block, new_block)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
