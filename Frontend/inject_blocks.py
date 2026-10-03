import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

tpo_block = """
                        {formData.role === 'tpo' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className={`${isDarkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"} text-sm font-semibold mb-3 border-b pb-1`}>TPO Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>TPO Name</label>
                                            <input type="text" name="name" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>TPO ID</label>
                                            <input type="text" name="tpoId" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.tpoId} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Official Email</label>
                                            <input type="email" name="email" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Designation</label>
                                            <input type="text" name="designation" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.designation} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Phone Number</label>
                                            <input type="text" name="phone" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className={`${isDarkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"} text-sm font-semibold mb-3 border-b pb-1`}>Institution Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Institution Name</label>
                                            <input type="text" name="college" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.college} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Institution Code</label>
                                            <input type="text" name="institutionCode" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.institutionCode} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
"""

industry_block = """
                        {formData.role === 'industry' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className={`${isDarkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"} text-sm font-semibold mb-3 border-b pb-1`}>Company Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Company Name</label>
                                            <input type="text" name="companyName" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.companyName} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Corporate Email</label>
                                            <input type="email" name="corporateEmail" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.corporateEmail} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Website</label>
                                            <input type="url" name="website" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.website} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Industry Type</label>
                                            <input type="text" name="industryType" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.industryType} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Company Size</label>
                                            <input type="text" name="companySize" placeholder="e.g. 50-200" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.companySize} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Company Location</label>
                                            <input type="text" name="location" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.location} onChange={handleChange} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Company Registration/Verification Information</label>
                                            <input type="text" name="registrationInfo" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.registrationInfo} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className={`${isDarkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"} text-sm font-semibold mb-3 border-b pb-1`}>Recruiter Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Recruiter Name</label>
                                            <input type="text" name="name" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Designation</label>
                                            <input type="text" name="designation" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.designation} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Corporate Email</label>
                                            <input type="email" name="email" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Phone Number</label>
                                            <input type="text" name="phone" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
"""

faculty_block = """
                                {formData.role === 'faculty' && (
                                    <>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Faculty ID</label>
                                            <input type="text" name="facultyId" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.facultyId} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Institution</label>
                                            <input type="text" name="college" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.college} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Department</label>
                                            <input type="text" name="department" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.department} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Designation</label>
                                            <input type="text" name="designation" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.designation} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Areas of Expertise</label>
                                            <input type="text" name="expertise" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.expertise} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Phone Number</label>
                                            <input type="text" name="phone" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.phone} onChange={handleChange} />
                                        </div>
                                    </>
                                )}
"""

student_block = """
                                {formData.role === 'student' && (
                                    <>
                                        <div>
                                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Enrollment/Student ID</label>
                                            <input type="text" name="studentId" required className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-[#1e293b] text-gray-100 border-transparent" : "bg-[#f8fafc] text-gray-900 border border-gray-300"}`} value={formData.studentId} onChange={handleChange} />
                                        </div>
                                    </>
                                )}
"""

# I need to insert these blocks right before the Password section.
# Password section starts with:
#                        <div>
#                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Password</label>

insert_idx = content.find('                        <div>\n                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Password</label>')

new_content = content[:insert_idx] + student_block + faculty_block + tpo_block + industry_block + content[insert_idx:]

# Additionally, the generic block currently says:
# "Email Address" is always visible if not TPO and not industry?
# Let's fix the generic wrapper. It should be:
# {formData.role !== 'industry' && formData.role !== 'tpo' && ( ... Full Name, Email ... )}
# Wait, let's see what is currently there.
# It currently has:
#                         <div>
#                             <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Full Name</label>
#                             <input type="text" name="name" required ... />
#                         </div>
#
#                         <div>
#                             <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Email Address</label>
#                             <input type="email" name="email" required ... />
#                         </div>

generic_block_start = content.find('                        <div>\n                            <label className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}>Full Name</label>')
# We will wrap it.

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
