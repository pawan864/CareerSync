import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add modal state
old_state = "const [termsAccepted, setTermsAccepted] = useState(false);"
new_state = "const [termsAccepted, setTermsAccepted] = useState(false);\n    const [showTermsModal, setShowTermsModal] = useState(false);\n    const [modalType, setModalType] = useState('terms');"
content = content.replace(old_state, new_state)

# 2. Add X icon to lucide-react import
if ' X,' not in content and ' X ' not in content:
    content = content.replace("from 'lucide-react';", ", X } from 'lucide-react';")

# 3. Update the checkbox and links
old_checkbox_block = """                        <div className="flex items-start mt-2 mb-4">
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
                        </div>"""

new_checkbox_block = """                        <div className="flex items-start mt-2 mb-4">
                            <div className="flex items-center h-4 pt-0.5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all"
                                    required
                                />
                            </div>
                            <label htmlFor="terms" className={`ml-2 text-[11px] font-medium leading-tight ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                I agree with the <button type="button" onClick={() => { setModalType('terms'); setShowTermsModal(true); }} className="text-blue-600 hover:underline hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)]">Terms and Conditions</button> and <button type="button" onClick={() => { setModalType('privacy'); setShowTermsModal(true); }} className="text-blue-600 hover:underline hover:[text-shadow:0_0_8px_rgba(37,99,235,0.5)]">Privacy Policy</button>.
                            </label>
                        </div>"""
content = content.replace(old_checkbox_block, new_checkbox_block)

# 4. Inject Modal Component right before the closing `</motion.div>` of the main wrapper
modal_code = """
            <AnimatePresence>
                {showTermsModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className={`w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${isDarkMode ? 'bg-[#0f172a] border border-gray-800' : 'bg-white border border-gray-200'}`}
                        >
                            <div className={`flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {modalType === 'terms' ? 'Terms and Conditions' : 'Privacy Policy'}
                                </h3>
                                <button onClick={() => setShowTermsModal(false)} className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="p-6 overflow-y-auto slim-scrollbar text-sm space-y-4">
                                {modalType === 'terms' ? (
                                    <>
                                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Welcome to CareerSync. By accessing or using our platform, you agree to be bound by these terms.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1. User Accounts</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>You are responsible for safeguarding your password and for all activities that occur under your account. You agree to provide accurate and complete information during registration.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2. Acceptable Use</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>You agree not to use the platform to post false, misleading, or inappropriate content. Employers must post legitimate opportunities, and students must provide truthful academic records.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3. Termination</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We reserve the right to suspend or terminate accounts that violate our community guidelines or terms of service without prior notice.</p>
                                    </>
                                ) : (
                                    <>
                                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your privacy is critical to us. This policy explains how we collect, use, and protect your data.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1. Data Collection</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We collect information you provide directly to us (e.g., resumes, academic records) and automated usage data (e.g., cookies, IP addresses) to improve our services.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2. Data Usage</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your data is used solely to facilitate career placements, skill gap analysis, and platform functionality. We do not sell your personal data to third parties.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3. Security</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We implement enterprise-grade security measures to protect your information, though no system is 100% secure.</p>
                                    </>
                                )}
                            </div>
                            
                            <div className={`p-4 border-t flex justify-end ${isDarkMode ? 'border-gray-800 bg-[#020617]' : 'border-gray-200 bg-gray-50'}`}>
                                <button onClick={() => setShowTermsModal(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                                    I Understand
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
"""

# Inject before the final `</motion.div>`
content = content.replace('        </motion.div>\n    );\n};\n\nexport default Register;', modal_code + '        </motion.div>\n    );\n};\n\nexport default Register;')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
