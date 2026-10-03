import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

placeholder_block = """{/* New Placeholder Routes */}
                            {['resume', 'certifications', 'saved', 'offers', 'companies', 'pathways', 'mentorship', 'alumni', 'settings', 'support'].includes(activeTab) && (
                                <ComingSoon 
                                    title={navItems.find(i => i.id === activeTab)?.label} 
                                    description={navItems.find(i => i.id === activeTab)?.desc} 
                                />
                            )}"""

routes = """
                            {activeTab === 'resume' && <ResumeBuilder />}
                            {activeTab === 'certifications' && <Certifications />}
                            {activeTab === 'saved' && <SavedJobs />}
                            {activeTab === 'offers' && <OfferLetters />}
                            {activeTab === 'companies' && <CompanyInsights />}
                            {activeTab === 'pathways' && <CareerPathways />}
                            {activeTab === 'mentorship' && <Mentorship />}
                            {activeTab === 'alumni' && <AlumniNetwork />}
                            {activeTab === 'settings' && <Settings />}
                            {activeTab === 'support' && <DashboardSupport />}
"""

# Since spacing might be off, let's use regex to replace from {/* New Placeholder Routes */} down to )}
content = re.sub(r'\{\/\*\s*New Placeholder Routes\s*\*\/\}.*?\n\s*\)\}', routes, content, flags=re.DOTALL)

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
