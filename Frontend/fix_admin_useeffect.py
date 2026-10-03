import re

admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import React, { useState, useContext } from 'react';", "import React, { useState, useContext, useEffect } from 'react';")

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(content)
