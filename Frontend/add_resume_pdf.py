import re

pb_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\ProfileBuilder.jsx'
with open(pb_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import jsPDF from 'jspdf';\nimport html2canvas from 'html2canvas';\n"
content = content.replace("import api from '../../../services/api';", "import api from '../../../services/api';\n" + import_stmt)

generate_func = """
    const generateResumePDF = async () => {
        const input = document.getElementById('resume-preview');
        if (!input) return;
        
        try {
            // Un-hide the preview for rendering
            input.style.display = 'block';
            
            const canvas = await html2canvas(input, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${formData.personal.name || 'Student'}_Resume.pdf`);
            
            // Hide it back
            input.style.display = 'none';
        } catch (err) {
            console.error("PDF Generation Error", err);
        }
    };
"""

content = content.replace("const saveProfile = async () => {", generate_func + "\n    const saveProfile = async () => {")

preview_div = """
            {/* HIDDEN RESUME PREVIEW FOR PDF GENERATION */}
            <div id="resume-preview" className="hidden bg-white text-black p-10 w-[800px] absolute -left-[9999px]">
                <h1 className="text-4xl font-bold border-b-2 border-black pb-2 mb-4">{formData.personal.name || 'Student Name'}</h1>
                <p className="mb-6">{formData.personal.linkedinUrl} | {formData.personal.githubUrl}</p>
                
                <h2 className="text-2xl font-bold mb-2">Education</h2>
                <div className="mb-6">
                    <p className="font-bold">{formData.academic.college}</p>
                    <p>{formData.academic.department} | CGPA: {formData.academic.cgpa}</p>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Technical Skills</h2>
                <div className="mb-6">
                    {formData.skills.filter(s => s.category === 'Technical').map(s => s.name).join(', ')}
                </div>

                <h2 className="text-2xl font-bold mb-2">Projects</h2>
                <div className="mb-6">
                    {formData.projects.map((p, i) => (
                        <div key={i} className="mb-3">
                            <p className="font-bold">{p.title}</p>
                            <p className="italic text-sm text-gray-600 mb-1">{typeof p.technologiesUsed === 'string' ? p.technologiesUsed : p.technologiesUsed?.join(', ')}</p>
                            <p>{p.description}</p>
                        </div>
                    ))}
                </div>
            </div>
"""

content = content.replace("return (", preview_div + "\n    return (")

content = content.replace(
    '<button className="flex items-center justify-center px-6 py-3 bg-white text-gray-900', 
    '<button onClick={generateResumePDF} className="flex items-center justify-center px-6 py-3 bg-white text-gray-900'
)

with open(pb_path, 'w', encoding='utf-8') as f:
    f.write(content)
