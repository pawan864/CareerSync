const fs = require('fs');
let content = fs.readFileSync('Frontend/src/pages/Login.jsx', 'utf8');

// Replace all error message divs in Login.jsx
content = content.replace(/className=\"bg-red-[^\"]+\"/g, 'className="bg-red-50 md:bg-red-900/50 border border-red-200 md:border-red-500/50 text-red-600 md:text-red-200 px-3 py-2 rounded-md text-xs text-center font-bold shadow-sm md:shadow-none"');

fs.writeFileSync('Frontend/src/pages/Login.jsx', content);
