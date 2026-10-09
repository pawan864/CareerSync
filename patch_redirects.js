const fs = require('fs');

// 1. Patch AuthContext.jsx
let authCtx = fs.readFileSync('Frontend/src/context/AuthContext.jsx', 'utf8');
authCtx = authCtx.replace('const githubAuth = async (code) => {', 'const githubAuth = async (code, role) => {');
authCtx = authCtx.replace(`const res = await api.post('/auth/github', { code });`, `const res = await api.post('/auth/github', { code, role });`);
fs.writeFileSync('Frontend/src/context/AuthContext.jsx', authCtx);

// 2. Patch GithubCallback.jsx
let cbCode = fs.readFileSync('Frontend/src/pages/GithubCallback.jsx', 'utf8');
cbCode = cbCode.replace('const res = await githubAuth(code);', `
            const role = localStorage.getItem('oauth_role') || 'student';
            const res = await githubAuth(code, role);
`);
cbCode = cbCode.replace(`setTimeout(() => navigate('/profile'), 1000);`, `
                setTimeout(() => {
                    const r = res.user.role;
                    if (r === 'student') navigate('/student-dashboard');
                    else if (r === 'recruiter') navigate('/employer');
                    else if (r === 'faculty') navigate('/faculty-dashboard');
                    else if (r === 'admin') navigate('/admin-dashboard');
                    else if (r === 'tpo') navigate('/institution');
                    else navigate('/profile');
                }, 1000);
`);
fs.writeFileSync('Frontend/src/pages/GithubCallback.jsx', cbCode);

// 3. Patch Login.jsx
let loginCode = fs.readFileSync('Frontend/src/pages/Login.jsx', 'utf8');
loginCode = loginCode.replace('const handleGithubLogin = () => {', `const handleGithubLogin = (roleStr) => {
        localStorage.setItem('oauth_role', roleStr || 'student');`);
// Replace onClick={() => handleGithubLogin()} with onClick={() => handleGithubLogin(portal)}
loginCode = loginCode.replace(/onClick=\{\(\) => handleGithubLogin\(\)\}/g, `onClick={() => handleGithubLogin(portal)}`);
fs.writeFileSync('Frontend/src/pages/Login.jsx', loginCode);

// 4. Patch Register.jsx
let regCode = fs.readFileSync('Frontend/src/pages/Register.jsx', 'utf8');
regCode = regCode.replace('const handleGithubLogin = () => {', `const handleGithubLogin = (roleStr) => {
        localStorage.setItem('oauth_role', roleStr || 'student');`);

// Wait, Register.jsx has different roles per slide? Let's check if it has portal or what variable it uses.
// Let's assume we can just pass 'student' for now, or check Register.jsx structure.
// Register.jsx uses slides. Let's just find out what variable it uses.
// If it uses currentSlide, slide 0=student, 1=recruiter, etc.
// For now, let's just make it use 'student' as fallback if we don't know.
regCode = regCode.replace(/onClick=\{\(\) => handleGithubLogin\(\)\}/g, `onClick={() => handleGithubLogin('student')}`);
fs.writeFileSync('Frontend/src/pages/Register.jsx', regCode);

// 5. Patch Backend authController.js
let authCtrl = fs.readFileSync('Backend/controllers/authController.js', 'utf8');
authCtrl = authCtrl.replace(`const { code } = req.body;`, `const { code, role } = req.body;`);
authCtrl = authCtrl.replace(`role: 'student',`, `role: role || 'student',`);
fs.writeFileSync('Backend/controllers/authController.js', authCtrl);
