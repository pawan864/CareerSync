const fs = require('fs');
let content = fs.readFileSync('Frontend/src/pages/Login.jsx', 'utf8');

// Fix template literal bug for Faculty/TPO/Recruiter successMsg
content = content.replace(/className=\"\$\{themeStyles\[globalTheme\]\.iconBg\}(.*?)\"/g, 'className={`\\${themeStyles[globalTheme].iconBg}$1`}');

// Fix Student error (dark) for mobile
content = content.replace('className="bg-red-900/50 border border-red-500 text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium"', 'className="bg-red-50 md:bg-red-900/50 border border-red-200 md:border-red-500 text-red-600 md:text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium"');

// Fix Student success (dark) for mobile
content = content.replace('className="bg-blue-900/50 border border-blue-500 text-blue-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium mt-2"', 'className="bg-blue-50 md:bg-blue-900/50 border border-blue-200 md:border-blue-500 text-blue-600 md:text-blue-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium mt-2"');

// Fix Admin error (dark) for mobile
content = content.replace('className="bg-red-950/50 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium"', 'className="bg-red-50 md:bg-red-950/50 border border-red-200 md:border-red-500/50 text-red-600 md:text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium"');

// Fix Admin success (dark) for mobile
content = content.replace('className="bg-blue-950/50 border border-blue-500/50 text-blue-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium mt-2"', 'className="bg-blue-50 md:bg-blue-950/50 border border-blue-200 md:border-blue-500/50 text-blue-600 md:text-blue-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium mt-2"');

fs.writeFileSync('Frontend/src/pages/Login.jsx', content);
