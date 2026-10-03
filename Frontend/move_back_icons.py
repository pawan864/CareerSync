import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Student layout Back button
old_student_back = """                                        </div>
                                        <Link to="/" className="text-gray-400 hover:text-gray-200 flex items-center text-xs font-medium">
                                            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                                        </Link>
                                    </div>"""
new_student_back = """                                        </div>
                                    </div>
                                    <Link to="/" className="absolute top-6 right-6 text-gray-400 hover:text-gray-200 flex items-center text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors">
                                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                                    </Link>"""
content = content.replace(old_student_back, new_student_back)

# Faculty layout Back button
old_faculty_back = """                                        </div>
                                        <Link to="/" className="text-gray-500 hover:text-gray-800 flex items-center text-xs font-medium">
                                            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                                        </Link>
                                    </div>"""
new_faculty_back = """                                        </div>
                                    </div>
                                    <Link to="/" className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 flex items-center text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors">
                                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                                    </Link>"""
content = content.replace(old_faculty_back, new_faculty_back)

# TPO layout Back button
old_tpo_back = """                                        </div>
                                        <Link to="/" className="text-gray-500 hover:text-gray-800 flex items-center text-xs font-medium">
                                            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                                        </Link>
                                    </div>"""
new_tpo_back = """                                        </div>
                                    </div>
                                    <Link to="/" className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 flex items-center text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors">
                                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                                    </Link>"""
content = content.replace(old_tpo_back, new_tpo_back)

# Recruiter layout Back button
old_rec_back = """                                    <Link to="/" className="text-gray-400 hover:text-gray-800 flex items-center text-sm font-medium w-fit mb-8 lg:mb-0 lg:absolute lg:top-8 lg:left-8">
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                    </Link>"""
new_rec_back = """                                    <Link to="/" className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 flex items-center text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors">
                                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                                    </Link>"""
content = content.replace(old_rec_back, new_rec_back)


with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
