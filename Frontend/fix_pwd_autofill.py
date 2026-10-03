import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_pwd = """                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        placeholder="Password"
                                                        className="w-full bg-transparent text-gray-200 focus:outline-none text-sm pr-10 placeholder-gray-500"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />"""
new_pwd = """                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        placeholder="Password"
                                                        className="w-full bg-transparent text-gray-200 focus:outline-none text-sm pr-10 placeholder-gray-500"
                                                        style={{ WebkitBoxShadow: '0 0 0px 1000px #1e1e24 inset', WebkitTextFillColor: '#e5e7eb' }}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />"""
content = content.replace(old_pwd, new_pwd)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
