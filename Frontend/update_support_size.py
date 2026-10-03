import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_support = """                        {showSupport ? (
                            <div className="w-full bg-white/50 backdrop-blur-xl border border-white/60 p-8 flex flex-col justify-center h-full">
                                <div className="flex flex-col items-center text-center mb-6">"""

new_support = """                        {showSupport ? (
                            <div className="w-full h-full flex items-center justify-center p-8 bg-blue-50/30">
                                <div className="w-full max-w-xl bg-white/60 backdrop-blur-2xl border border-gray-100 rounded-3xl p-10 shadow-lg">
                                    <div className="flex flex-col items-center text-center mb-6">"""

content = content.replace(old_support, new_support)

old_form_end = """                                        </form>
                                    )}
                                    <div className="mt-4 text-center">
                                        <button onClick={() => setShowSupport(false)} className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                                            <ArrowLeft className="w-3 h-3 mr-1" /> Back to Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : portal === 'Student' ? ("""

new_form_end = """                                        </form>
                                    )}
                                    <div className="mt-4 text-center">
                                        <button onClick={() => setShowSupport(false)} className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                                            <ArrowLeft className="w-3 h-3 mr-1" /> Back to Login
                                        </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        ) : portal === 'Student' ? ("""

content = content.replace(old_form_end, new_form_end)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
