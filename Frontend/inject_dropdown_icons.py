import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add User icon back
content = content.replace('>                                         My Profile\n                                      </button>', '>\n                                        <User className="w-4 h-4 mr-2 text-blue-500" /> My Profile\n                                      </button>')

# Add LogOut icon back
content = content.replace('>                                         Logout\n                                      </button>', '>\n                                        <LogOut className="w-4 h-4 mr-2" /> Logout\n                                      </button>')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)

