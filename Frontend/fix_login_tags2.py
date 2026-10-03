import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's fix the botched area
bad_chunk = """                                        <Link to="/register" className="text-[#2563eb] hover:text-[#1d4ed8] underline text-sm font-semibold transition-all">
                                            Create {portal} Account
                                        </Link>
                                    </div>
                            </>
                                                        </div>
                            </>
                        ) : ("""

good_chunk = """                                        <Link to="/register" className="text-[#2563eb] hover:text-[#1d4ed8] underline text-sm font-semibold transition-all">
                                            Create {portal} Account
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : ("""

content = content.replace(bad_chunk, good_chunk)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
