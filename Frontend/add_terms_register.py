import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_button = """                        <button
                            type="submit"
                            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 rounded-md transition-colors mt-2 text-sm"
                        >
                            Create Account
                        </button>"""
new_button = """                        <div className="flex items-start pt-1 pb-1">
                            <div className="flex items-center h-5">
                                <input id="terms" type="checkbox" required className="w-3.5 h-3.5 border border-gray-600 rounded bg-transparent focus:ring-blue-500 cursor-pointer" />
                            </div>
                            <div className="ml-2 text-xs">
                                <label htmlFor="terms" className={`cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    I agree to the <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 rounded-md transition-colors mt-2 text-sm shadow-md"
                        >
                            Create Account
                        </button>"""
content = content.replace(old_button, new_button)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
