const fs = require('fs');
let content = fs.readFileSync('Frontend/src/pages/FacultyDashboard.jsx', 'utf8');
content = content.split('`r`n').join('\n');
fs.writeFileSync('Frontend/src/pages/FacultyDashboard.jsx', content);
