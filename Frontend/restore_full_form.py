import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update initial state
old_state = """    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        companyName: '',
        designation: '',
        institutionCode: '',
        department: ''
    });"""
# If the above is not exactly found, we'll try the other one
if old_state not in content:
    old_state = """    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });"""

new_state = """    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'student',
        studentId: '', college: '', course: '', branch: '', semester: '', phone: '',
        facultyId: '', department: '', designation: '', expertise: '',
        companyName: '', corporateEmail: '', website: '', industryType: '', companySize: '', location: '', registrationInfo: '',
        tpoId: '', institutionCode: ''
    });"""
if old_state in content:
    content = content.replace(old_state, new_state)
else:
    print("Could not find state block")

# 2. Add conditional fields to form
# We will remove the generic Full Name and Email fields and instead render them properly inside the role conditions as before.
# Wait, actually in the previous code, there was a generic wrapper.
# Let's completely replace the entire form inner block!
# Find the start of the form
form_start_idx = content.find('<form onSubmit={handleSubmit} className="space-y-4">')
if form_start_idx == -1:
    # try with motion.form
    form_start_idx = content.find('<motion.form')

# Find the end of the form
form_end_idx = content.find('</form>')
if form_end_idx == -1:
    form_end_idx = content.find('</motion.form>')
    form_end_idx = content.find('>', form_end_idx) + 1
else:
    form_end_idx = form_end_idx + 7

new_form_content = """<form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded text-xs text-center">
                                {error}
                            </div>
                        )}

                        {formData.role !== 'recruiter' && formData.role !== 'tpo' && (
                            <>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Full Name</label>
                                    <input type="text" name="name" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.name} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Email Address</label>
                                    <input type="email" name="email" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.email} onChange={handleChange} />
                                </div>
                            </>
                        )}

                        {formData.role === 'student' && (
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Enrollment/Student ID</label>
                                <input type="text" name="studentId" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.studentId} onChange={handleChange} />
                            </div>
                        )}

                        {formData.role === 'faculty' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Faculty ID</label>
                                    <input type="text" name="facultyId" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.facultyId} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Institution</label>
                                    <input type="text" name="college" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.college} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Department</label>
                                    <input type="text" name="department" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.department} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Designation</label>
                                    <input type="text" name="designation" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.designation} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Areas of Expertise</label>
                                    <input type="text" name="expertise" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.expertise} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Phone Number</label>
                                    <input type="text" name="phone" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.phone} onChange={handleChange} />
                                </div>
                            </div>
                        )}

                        {formData.role === 'tpo' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-gray-200 text-sm font-semibold mb-3 border-b border-gray-700 pb-1">TPO Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">TPO Name</label>
                                            <input type="text" name="name" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">TPO ID</label>
                                            <input type="text" name="tpoId" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.tpoId} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Official Email</label>
                                            <input type="email" name="email" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Designation</label>
                                            <input type="text" name="designation" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.designation} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Phone Number</label>
                                            <input type="text" name="phone" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-gray-200 text-sm font-semibold mb-3 border-b border-gray-700 pb-1">Institution Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Institution Name</label>
                                            <input type="text" name="college" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.college} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Institution Code</label>
                                            <input type="text" name="institutionCode" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.institutionCode} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {formData.role === 'recruiter' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-gray-200 text-sm font-semibold mb-3 border-b border-gray-700 pb-1">Company Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Company Name</label>
                                            <input type="text" name="companyName" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.companyName} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Corporate Email</label>
                                            <input type="email" name="corporateEmail" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.corporateEmail} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Website</label>
                                            <input type="url" name="website" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.website} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Industry Type</label>
                                            <input type="text" name="industryType" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.industryType} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Company Size</label>
                                            <input type="text" name="companySize" placeholder="e.g. 50-200" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.companySize} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Company Location</label>
                                            <input type="text" name="location" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.location} onChange={handleChange} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-400 text-xs mb-1">Company Registration/Verification Information</label>
                                            <input type="text" name="registrationInfo" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.registrationInfo} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-gray-200 text-sm font-semibold mb-3 border-b border-gray-700 pb-1">Recruiter Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Recruiter Name</label>
                                            <input type="text" name="name" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Designation</label>
                                            <input type="text" name="designation" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.designation} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Corporate Email</label>
                                            <input type="email" name="email" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs mb-1">Phone Number</label>
                                            <input type="text" name="phone" required className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={formData.phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors shadow-lg shadow-blue-500/30"
                        >
                            Create Account
                        </button>
                    </form>"""

content = content[:form_start_idx] + new_form_content + content[form_end_idx:]

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
