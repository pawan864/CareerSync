import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Change the username/email input
old_input1 = """                                            <div className="relative border-b border-gray-600 focus-within:border-[#9b72f0] transition-colors pb-1">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Username or Email"
                                                    className="w-full bg-transparent text-gray-200 focus:outline-none text-sm placeholder-gray-500"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>"""
new_input1 = """                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Username or Email"
                                                    className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b72f0] text-sm placeholder-gray-500 shadow-sm"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>"""
content = content.replace(old_input1, new_input1)

# Change the password input
old_input2 = """                                            <div>
                                                <div className="relative border-b border-gray-600 focus-within:border-[#9b72f0] transition-colors pb-1 flex items-center justify-between">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        placeholder="Password"
                                                        className="w-full bg-transparent text-gray-200 focus:outline-none text-sm pr-10 placeholder-gray-500"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="text-gray-500 hover:text-gray-300 focus:outline-none absolute right-0"
                                                    >
                                                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                </div>"""
new_input2 = """                                            <div>
                                                <div className="relative flex items-center justify-between">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        placeholder="Password"
                                                        className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b72f0] text-sm pr-10 placeholder-gray-500 shadow-sm"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="text-gray-400 hover:text-gray-600 focus:outline-none absolute right-3"
                                                    >
                                                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                </div>"""
content = content.replace(old_input2, new_input2)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
