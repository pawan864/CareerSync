import re

pb_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ProfileBuilder.jsx'
with open(pb_path, 'r', encoding='utf-8') as f:
    content = f.read()

fetch_fix = """projects: dbProfile.projects && dbProfile.projects.length > 0 ? dbProfile.projects.map(p => ({...p, technologiesUsed: p.technologiesUsed ? p.technologiesUsed.join(', ') : ''})) : [{ title: '', description: '', technologiesUsed: '', githubUrl: '' }],"""
content = re.sub(r'projects: dbProfile\.projects && dbProfile\.projects\.length > 0 \? dbProfile\.projects : \[\{ title: \'\', description: \'\', technologiesUsed: \'\', githubUrl: \'\' \}\],', fetch_fix, content)

save_fix = """
            const processedProjects = formData.projects.map(p => ({
                ...p,
                technologiesUsed: typeof p.technologiesUsed === 'string' ? p.technologiesUsed.split(',').map(s => s.trim()).filter(Boolean) : p.technologiesUsed
            }));

            const payload = {
                personalInfo: formData.personal,
                academicInfo: formData.academic,
                skills: formData.skills,
                projects: processedProjects,
                careerInterests: formData.career
            };
"""
content = re.sub(r'const payload = \{\s*personalInfo: formData\.personal,\s*academicInfo: formData\.academic,\s*skills: formData\.skills,\s*projects: formData\.projects,\s*careerInterests: formData\.career\s*\};', save_fix, content)

with open(pb_path, 'w', encoding='utf-8') as f:
    f.write(content)
