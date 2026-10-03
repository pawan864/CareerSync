import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add X to lucide-react imports
if " X " not in content and ", X," not in content:
    content = content.replace("Sun, Moon } from 'lucide-react';", "Sun, Moon, X } from 'lucide-react';")

# Add state
old_state = "    const [showPassword, setShowPassword] = useState(false);"
new_state = "    const [showPassword, setShowPassword] = useState(false);\n    const [showTermsModal, setShowTermsModal] = useState(false);\n    const [showPrivacyModal, setShowPrivacyModal] = useState(false);"
content = content.replace(old_state, new_state)

# Replace the links with buttons
old_links = """                                <label htmlFor="terms" className={`cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    I agree to the <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                                </label>"""
new_links = """                                <label htmlFor="terms" className={`cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    I agree to the <button type="button" onClick={() => setShowTermsModal(true)} className="text-blue-500 hover:underline">Terms of Service</button> and <button type="button" onClick={() => setShowPrivacyModal(true)} className="text-blue-500 hover:underline">Privacy Policy</button>
                                </label>"""
content = content.replace(old_links, new_links)

# Add the Modals right before the final closing </motion.div>
modals_code = """
            {/* Terms Modal */}
            <AnimatePresence>
                {showTermsModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative ${isDarkMode ? 'bg-[#0f172a] text-gray-200' : 'bg-white text-gray-800'}`}
                        >
                            <button onClick={() => setShowTermsModal(false)} className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Terms of Service</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <p><strong>1. Acceptance of Terms:</strong> By creating an account, you agree to be bound by these Terms of Service. CareerSync reserves the right to modify these terms at any time.</p>
                                <p><strong>2. User Responsibilities:</strong> You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your sole responsibility.</p>
                                <p><strong>3. Data Authenticity:</strong> You agree to provide accurate, current, and complete information. CareerSync may suspend or terminate accounts that provide fraudulent academic or professional credentials.</p>
                                <p><strong>4. Code of Conduct:</strong> Users must maintain professional decorum when communicating with institutions or recruiters. Spamming, harassment, or abusive language will result in immediate termination.</p>
                                <p><strong>5. Platform Availability:</strong> While we strive for 99.9% uptime, CareerSync does not guarantee uninterrupted access to the platform and is not liable for data loss during outages.</p>
                                <p><strong>6. Intellectual Property:</strong> All content, features, and functionality on CareerSync are owned by us and are protected by international copyright laws.</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-700/50 flex justify-end">
                                <button onClick={() => setShowTermsModal(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">I Understand</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Privacy Modal */}
            <AnimatePresence>
                {showPrivacyModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative ${isDarkMode ? 'bg-[#0f172a] text-gray-200' : 'bg-white text-gray-800'}`}
                        >
                            <button onClick={() => setShowPrivacyModal(false)} className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <p><strong>1. Information We Collect:</strong> We collect personal information you provide when registering, including your name, email, academic records, and professional details. We also collect usage data to improve our services.</p>
                                <p><strong>2. How We Use Your Data:</strong> Your data is used exclusively to connect you with relevant opportunities (if you are a student) or relevant candidates (if you are a recruiter). We use AI matching algorithms to process your profile.</p>
                                <p><strong>3. Data Sharing:</strong> Student profiles are only visible to verified recruiters and your associated educational institution. We do not sell your personal data to third-party advertising agencies.</p>
                                <p><strong>4. Security Measures:</strong> We implement enterprise-grade encryption and secure database practices to protect your information against unauthorized access, alteration, or destruction.</p>
                                <p><strong>5. Cookies and Tracking:</strong> CareerSync uses essential cookies to maintain your active session and preferences. You can control cookie settings through your browser.</p>
                                <p><strong>6. Your Rights:</strong> You have the right to request a copy of your data, correct inaccuracies, or request complete deletion of your account at any time by contacting support.</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-700/50 flex justify-end">
                                <button onClick={() => setShowPrivacyModal(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">I Understand</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>"""
content = content.replace("        </motion.div>", modals_code)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
