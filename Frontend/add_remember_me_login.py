import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Remember Me to Student Layout
old_student_remember = """                                                <div className="mt-3 text-right">
                                                    <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-white transition-colors">Forgot Password?</Link>
                                                </div>"""
new_student_remember = """                                                <div className="mt-3 flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <input id="remember-me-student" type="checkbox" className="h-3.5 w-3.5 text-[#9b72f0] focus:ring-[#9b72f0] border-gray-600 bg-transparent rounded cursor-pointer" />
                                                        <label htmlFor="remember-me-student" className="ml-1.5 block text-xs text-gray-400 cursor-pointer">Remember me</label>
                                                    </div>
                                                    <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-white transition-colors">Forgot Password?</Link>
                                                </div>"""
content = content.replace(old_student_remember, new_student_remember)

# Add Remember Me to Faculty Layout
old_faculty_remember = """                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="text-gray-400 hover:text-gray-600 focus:outline-none ml-2"
                                                    >
                                                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <button"""
new_faculty_remember = """                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="text-gray-400 hover:text-gray-600 focus:outline-none ml-2"
                                                    >
                                                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                                <div className="mt-3 flex items-center">
                                                    <input id="remember-me-faculty" type="checkbox" className="h-3.5 w-3.5 text-[#047857] focus:ring-[#047857] border-gray-300 rounded cursor-pointer" />
                                                    <label htmlFor="remember-me-faculty" className="ml-1.5 block text-xs text-gray-600 cursor-pointer">Remember me</label>
                                                </div>
                                            </div>

                                            <button"""
content = content.replace(old_faculty_remember, new_faculty_remember)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
