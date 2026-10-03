import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add termsAccepted state
old_show_password = "const [showPassword, setShowPassword] = useState(false);"
if 'const [termsAccepted, setTermsAccepted]' not in content:
    content = content.replace(old_show_password, "const [showPassword, setShowPassword] = useState(false);\n    const [termsAccepted, setTermsAccepted] = useState(false);")

# 2. Insert the checkbox above the submit button
old_button = """                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors shadow-lg shadow-blue-500/30"
                        >"""
                        
new_button = """                        <div className="flex items-start mt-2 mb-4">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                    required
                                />
                            </div>
                            <label htmlFor="terms" className={`ml-2 text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                I agree with the <a href="#" className="text-blue-600 hover:underline hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)]">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)]">Privacy Policy</a>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={!termsAccepted}
                            className={`w-full font-medium py-2 rounded-md transition-all ${termsAccepted ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 cursor-pointer' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                        >"""
content = content.replace(old_button, new_button)

# 3. Remove the old Terms and Privacy block from the footer
old_terms_footer = """                            <p className={`text-xs mt-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                By signing up, you agree to our{' '}
                                <a href="#" className="text-blue-600 hover:underline hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)] transition-all">Terms</a>
                                {' '}and{' '}
                                <a href="#" className="text-blue-600 hover:underline hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)] transition-all">Privacy Policy</a>.
                            </p>"""
content = content.replace(old_terms_footer, "")

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
