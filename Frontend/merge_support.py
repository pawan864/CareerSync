import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add states for support
imports = "import { useState, useContext, useEffect } from 'react';"
new_imports = "import { useState, useContext, useEffect } from 'react';\nimport { MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';"
if "MessageSquare" not in content:
    content = content.replace("import { \n    ArrowLeft", "import { \n    ArrowLeft, MessageSquare, Send, CheckCircle2, AlertCircle,")

state_injection = """    const [showPassword, setShowPassword] = useState(false);"""
new_state = """    const [showPassword, setShowPassword] = useState(false);
    const [showSupport, setShowSupport] = useState(false);
    const [supportStatus, setSupportStatus] = useState('idle');
    const [supportData, setSupportData] = useState({ name: '', email: '', role: 'student', category: 'login', description: '' });

    const handleSupportChange = (e) => {
        setSupportData({ ...supportData, [e.target.name]: e.target.value });
    };

    const handleSupportSubmit = (e) => {
        e.preventDefault();
        setSupportStatus('submitting');
        setTimeout(() => {
            setSupportStatus('success');
            setSupportData({ name: '', email: '', role: 'student', category: 'login', description: '' });
        }, 1500);
    };"""
content = content.replace(state_injection, new_state)

# Replace the Link to trigger state instead of navigation
old_link = """<Link to="/support" className="font-bold text-blue-900 hover:underline transition-colors">Contact Technical Support</Link>"""
new_link = """<button onClick={() => setShowSupport(true)} className="font-bold text-blue-900 hover:underline transition-colors">Contact Technical Support</button>"""
content = content.replace(old_link, new_link)

# Replace the inner AnimatePresence content conditionally
# Currently it is:
#                     <motion.div
#                         key={portal}
#                         initial="initial" ...
#                     >
#                         {portal === 'Student' ? ( ... ) : ... }
#                     </motion.div>

# We can wrap it: 
# {showSupport ? ( <SupportForm /> ) : ( <LoginForm /> )}
# But wait, it's better to make `showSupport` a key in the motion.div!
# key={showSupport ? 'support' : portal}

old_motion = """                    <motion.div
                        key={portal}"""
new_motion = """                    <motion.div
                        key={showSupport ? 'support' : portal}"""
content = content.replace(old_motion, new_motion)

old_form = """                        {portal === 'Student' ? ("""

support_form = """                        {showSupport ? (
                            <div className="w-full bg-white/50 backdrop-blur-xl border border-white/60 p-8 flex flex-col justify-center h-full">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-3">
                                        <MessageSquare className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Technical Support</h2>
                                    <p className="text-gray-500 mt-1 text-sm">We're here to help you resolve any issues.</p>
                                </div>
                                
                                <div className="flex-grow flex flex-col justify-center">
                                    {supportStatus === 'success' ? (
                                        <div className="text-center py-8">
                                            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ticket Submitted!</h3>
                                            <p className="text-gray-600 mb-6">Your support ticket has been raised. Our technical team will review it and contact you via email shortly.</p>
                                            <button onClick={() => { setSupportStatus('idle'); setShowSupport(false); }} className="text-blue-600 font-medium hover:underline">
                                                Back to Login
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSupportSubmit} className="space-y-4 max-w-lg mx-auto w-full">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-medium mb-1">Full Name</label>
                                                    <input type="text" name="name" required className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm" value={supportData.name} onChange={handleSupportChange} placeholder="John Doe" />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-medium mb-1">Email Address</label>
                                                    <input type="email" name="email" required className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm" value={supportData.email} onChange={handleSupportChange} placeholder="john@example.com" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-medium mb-1">Your Role</label>
                                                    <select name="role" className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm" value={supportData.role} onChange={handleSupportChange}>
                                                        <option value="student">Student</option>
                                                        <option value="faculty">Faculty</option>
                                                        <option value="tpo">TPO / Institution</option>
                                                        <option value="recruiter">Recruiter</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-medium mb-1">Issue Category</label>
                                                    <select name="category" className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm" value={supportData.category} onChange={handleSupportChange}>
                                                        <option value="login">Login / Authentication</option>
                                                        <option value="registration">Registration Process</option>
                                                        <option value="technical">Technical Glitch / Bug</option>
                                                        <option value="other">Other Request</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 text-xs font-medium mb-1">Describe the Issue</label>
                                                <textarea name="description" required rows="3" className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm resize-none" value={supportData.description} onChange={handleSupportChange} placeholder="Please provide specific details..."></textarea>
                                            </div>
                                            <button type="submit" disabled={supportStatus === 'submitting'} className={`w-full flex items-center justify-center py-2.5 rounded-lg text-white font-medium transition-colors text-sm ${supportStatus === 'submitting' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                                {supportStatus === 'submitting' ? 'Submitting...' : <>Submit Ticket <Send className="w-4 h-4 ml-2" /></>}
                                            </button>
                                        </form>
                                    )}
                                    <div className="mt-4 text-center">
                                        <button onClick={() => setShowSupport(false)} className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                                            <ArrowLeft className="w-3 h-3 mr-1" /> Back to Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : portal === 'Student' ? ("""

content = content.replace(old_form, support_form)

# Add conditional rendering to hide the footer when showSupport is true
old_footer = """            <div className="mt-3 text-center z-20">"""
new_footer = """            {!showSupport && (
                <div className="mt-3 text-center z-20">"""

content = content.replace(old_footer, new_footer)
content = content.replace("""                </p>
            </div>
        </div>
    );
};""", """                </p>
                </div>
            )}
        </div>
    );
};""")


with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
