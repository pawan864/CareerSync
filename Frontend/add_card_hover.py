import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_card = """<div className="mt-4 bg-[#f0f4f8] rounded-xl p-3 flex items-center border border-blue-100">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex flex-shrink-0 items-center justify-center text-teal-600 mr-3">
                                                <UserPlus className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 mb-0.5 font-medium">Don't have an recruiter account?</p>
                                                <Link to="/register" className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] underline flex items-center">
                                                    Register Your Company <ArrowRight className="w-3 h-3 ml-1" />
                                                </Link>
                                            </div>
                                        </div>"""

new_card = """<Link to="/register" className="mt-4 bg-[#f0f4f8] hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5 hover:border-blue-300 transition-all duration-300 rounded-xl p-3 flex items-center border border-blue-100 block group">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex flex-shrink-0 items-center justify-center text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-colors mr-3">
                                                <UserPlus className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 mb-0.5 font-medium">Don't have an recruiter account?</p>
                                                <div className="text-xs font-semibold text-[#2563eb] underline flex items-center group-hover:text-[#1d4ed8] transition-colors">
                                                    Register Your Company <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>"""

content = content.replace(old_card, new_card)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
