import re

app_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ApplicationTracker.jsx'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import api from '../../../services/api';\nimport React, { useState, useEffect } from 'react';"
content = content.replace("import React, { useState } from 'react';", import_stmt)

fetch_logic = """
    const [realApps, setRealApps] = useState([]);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await api.get('/opportunities/my-applications');
                if (res.data.success) {
                    setRealApps(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchApps();
    }, []);

    const displayApps = realApps.length > 0 ? realApps : applications;
"""

content = content.replace("const applications = [", fetch_logic + "\n    const applications = [")
content = content.replace("applications.map(app", "displayApps.map(app")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)

