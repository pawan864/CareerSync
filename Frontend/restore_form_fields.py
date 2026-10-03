import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update initial state
old_state = """    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });"""
new_state = """    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        companyName: '',
        designation: '',
        institutionCode: '',
        department: ''
    });"""
content = content.replace(old_state, new_state)

# 2. Add conditional fields to form
old_password_field = """                        <div>
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
                        </div>"""

conditional_fields = """
                        {formData.role === 'recruiter' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        required
                                        className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="e.g. Google"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        required
                                        className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        placeholder="e.g. HR Manager"
                                    />
                                </div>
                            </div>
                        )}

                        {formData.role === 'tpo' && (
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Institution Code</label>
                                <input
                                    type="text"
                                    name="institutionCode"
                                    required
                                    className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    value={formData.institutionCode}
                                    onChange={handleChange}
                                    placeholder="e.g. INST-1234"
                                />
                            </div>
                        )}

                        {formData.role === 'faculty' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Institution Code</label>
                                    <input
                                        type="text"
                                        name="institutionCode"
                                        required
                                        className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        value={formData.institutionCode}
                                        onChange={handleChange}
                                        placeholder="e.g. INST-1234"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        required
                                        className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        value={formData.department}
                                        onChange={handleChange}
                                        placeholder="e.g. Computer Science"
                                    />
                                </div>
                            </div>
                        )}
"""

content = content.replace(old_password_field, old_password_field + conditional_fields)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
