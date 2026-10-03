import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import { motion, AnimatePresence } from 'framer-motion';\n"
content = content.replace("import React, { useState, useContext } from 'react';", "import React, { useState, useContext } from 'react';\n" + import_stmt)

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
