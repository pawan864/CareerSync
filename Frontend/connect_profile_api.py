import re

pb_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ProfileBuilder.jsx'
with open(pb_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports: useEffect and api
import_stmt = "import React, { useState, useEffect } from 'react';\nimport api from '../../../services/api';\n"
content = content.replace("import React, { useState } from 'react';", import_stmt)

# Add fetch and save logic
logic_to_add = """
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profile/me');
                if (res.data.success && res.data.data) {
                    const dbProfile = res.data.data;
                    setFormData({
                        personal: dbProfile.personalInfo || { phone: '', portfolioUrl: '', githubUrl: '', linkedinUrl: '' },
                        academic: dbProfile.academicInfo || { college: '', department: '', semester: '', graduationYear: '', cgpa: '' },
                        skills: dbProfile.skills && dbProfile.skills.length > 0 ? dbProfile.skills : [{ name: '', level: 'Beginner', category: 'Technical' }],
                        projects: dbProfile.projects && dbProfile.projects.length > 0 ? dbProfile.projects : [{ title: '', description: '', technologiesUsed: '', githubUrl: '' }],
                        career: dbProfile.careerInterests || { targetRoles: '', preferredLocations: '' }
                    });
                }
            } catch (err) {
                console.log("No profile exists yet or error fetching.");
            }
        };
        fetchProfile();
    }, []);

    const saveProfile = async () => {
        setIsSaving(true);
        setMessage({ text: '', type: '' });
        try {
            const payload = {
                personalInfo: formData.personal,
                academicInfo: formData.academic,
                skills: formData.skills,
                projects: formData.projects,
                careerInterests: formData.career
            };
            const res = await api.post('/profile', payload);
            if (res.data.success) {
                setMessage({ text: 'Profile saved successfully!', type: 'success' });
            }
        } catch (err) {
            setMessage({ text: 'Failed to save profile. Please try again.', type: 'error' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        }
    };
"""

content = content.replace("const steps = [", logic_to_add + "\n    const steps = [")

# Add message UI and connect save button
save_btn_replace = """
                                    <button onClick={saveProfile} disabled={isSaving} className="flex items-center justify-center px-6 py-3 bg-[#1e1e1e] border border-gray-700 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                                        {isSaving ? 'Saving...' : 'Save Profile to Database'}
                                    </button>
                                </div>
                                {message.text && (
                                    <div className={`mt-6 px-4 py-2 rounded-md max-w-md mx-auto text-sm font-bold ${message.type === 'success' ? 'bg-green-900/50 text-green-400 border border-green-500' : 'bg-red-900/50 text-red-400 border border-red-500'}`}>
                                        {message.text}
                                    </div>
                                )}
"""

content = re.sub(r'<button className="flex items-center justify-center px-6 py-3 bg-\[#1e1e1e\].*?Save Profile to Database\s*</button>\s*</div>', save_btn_replace, content, flags=re.DOTALL)


with open(pb_path, 'w', encoding='utf-8') as f:
    f.write(content)
