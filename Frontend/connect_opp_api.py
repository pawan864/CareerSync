import re

hub_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\OpportunityHub.jsx'
with open(hub_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import api from '../../../services/api';\nimport React, { useState, useEffect } from 'react';"
content = content.replace("import React, { useState } from 'react';", import_stmt)

fetch_logic = """
    const [realOpps, setRealOpps] = useState([]);

    useEffect(() => {
        const fetchOpps = async () => {
            try {
                const res = await api.get('/opportunities');
                if (res.data.success) {
                    setRealOpps(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchOpps();
    }, []);

    // Merge real data with mock data so UI isn't empty if DB is empty
    const displayOpps = realOpps.length > 0 ? realOpps : opportunities;
"""

content = content.replace("const opportunities = [", fetch_logic + "\n    const opportunities = [")
content = content.replace("opportunities.filter(", "displayOpps.filter(")

with open(hub_path, 'w', encoding='utf-8') as f:
    f.write(content)

