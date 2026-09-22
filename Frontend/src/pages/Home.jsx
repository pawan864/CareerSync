import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Users, CheckCircle, BarChart, UserPlus, FileText } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-white via-blue-200 to-blue-500 w-full min-h-[calc(100vh-4rem)] flex items-center border-b border-gray-200 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* Left Content */}
                        <div className="md:w-1/2 text-left mb-12 md:mb-0 pr-0 md:pr-10">
                            <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-200">
                                The Future of Campus Placements
                            </div>
                            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl xl:text-5xl mb-6">
                                <span className="block md:whitespace-nowrap">Connecting Top Campus Talent</span>
                                <span className="block text-gray-900 mt-2 md:whitespace-nowrap">With Industry Leaders</span>
                            </h1>
                            <p className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed">
                                Empowering students with AI-driven skill mapping, connecting industries with top-tier verified talent, and providing institutions with real-time placement analytics.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                                <Link to="/register" className="flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-transform hover:-translate-y-1">
                                    Join as Student
                                </Link>
                                <Link to="/jobs" className="flex items-center justify-center px-6 py-2.5 border-2 border-indigo-600 text-sm font-bold rounded-md text-indigo-700 bg-white hover:bg-indigo-50 shadow transition-transform hover:-translate-y-1">
                                    Explore Opportunities
                                </Link>
                            </div>


                        </div>

                        {/* Right Content Spacer (so text doesn't span full width on large screens) */}
                        <div className="md:w-1/2 hidden md:block"></div>
                    </div>
                </div>

                {/* Absolute Bottom-Anchored Image */}
                <img 
                    src="/hero-student-transparent.jpg?v=13" 
                    alt="Isolated Indian college student boy" 
                    className="hidden md:block absolute bottom-0 right-0 lg:right-[5%] xl:right-[10%] w-auto h-[90%] max-h-[850px] object-contain object-bottom mix-blend-multiply pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(to top, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                />
            </div>

            {/* Features Workflow Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Timeline Line */}
                    <div className="hidden md:flex justify-between items-center relative mb-12 px-10">
                        <div className="absolute left-0 right-0 h-1 bg-indigo-800 top-1/2 transform -translate-y-1/2 z-0"></div>
                        
                        <div className="relative z-10 bg-indigo-800 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">01</div>
                        <div className="relative z-10 bg-indigo-800 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">02</div>
                        <div className="relative z-10 bg-indigo-800 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">03</div>
                        <div className="relative z-10 bg-indigo-800 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">04</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="bg-[#f3f0fc] p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all duration-300">
                            <div className="bg-indigo-100 text-indigo-600 h-12 w-12 rounded-lg flex items-center justify-center mb-6">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Driven Skill Mapping</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Students can analyze their resumes instantly to identify skill gaps and receive personalized learning paths to become industry-ready.
                            </p>
                        </div>
                        
                        {/* Card 2 */}
                        <div className="bg-[#f3f0fc] p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all duration-300">
                            <div className="bg-indigo-100 text-indigo-600 h-12 w-12 rounded-lg flex items-center justify-center mb-6">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Institutional Verification</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                TPOs can securely verify student profiles and academic records, creating a trusted and highly credible talent pool for recruiters.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#f3f0fc] p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all duration-300">
                            <div className="bg-indigo-100 text-indigo-600 h-12 w-12 rounded-lg flex items-center justify-center mb-6">
                                <BarChart className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Job Matching</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Employers use our advanced NLP algorithms to automatically match their job requirements with the most qualified campus talent.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-[#f3f0fc] p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all duration-300">
                            <div className="bg-indigo-100 text-indigo-600 h-12 w-12 rounded-lg flex items-center justify-center mb-6">
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Placement Analytics</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Comprehensive real-time dashboards allow institutions to track hiring pipelines, placement rates, and ongoing recruitment drives.
                            </p>
                        </div>
                    </div>

                    {/* Second Timeline Line */}
                    <div className="hidden md:flex justify-between items-center relative mb-12 mt-16 px-10">
                        <div className="absolute left-0 right-0 h-1 bg-indigo-800 top-1/2 transform -translate-y-1/2 z-0"></div>
                        
                        <div className="relative z-10 bg-indigo-800 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">05</div>
                        <div className="relative z-10 bg-indigo-800 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">06</div>
                        <div className="relative z-10 bg-indigo-800 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">07</div>
                        <div className="relative z-10 bg-indigo-800 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">08</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Card 5 */}
                        <div className="bg-[#f3f0fc] p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all duration-300">
                            <div className="bg-indigo-100 text-indigo-600 h-12 w-12 rounded-lg flex items-center justify-center mb-6">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Resume Building</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Automatically generate ATS-friendly professional resumes based on your verified skills, projects, and academic records.
                            </p>
                        </div>
                        
                        {/* Card 6 */}
                        <div className="bg-[#f3f0fc] p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all duration-300">
                            <div className="bg-indigo-100 text-indigo-600 h-12 w-12 rounded-lg flex items-center justify-center mb-6">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Mock Interviews</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Practice your technical and behavioral skills with our AI interviewer to gain confidence before real industry interviews.
                            </p>
                        </div>

                        {/* Card 7 */}
                        <div className="bg-[#f3f0fc] p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all duration-300">
                            <div className="bg-indigo-100 text-indigo-600 h-12 w-12 rounded-lg flex items-center justify-center mb-6">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">One-Click Apply</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Apply to top-tier verified internships and full-time positions with a single click, directly from your personalized dashboard.
                            </p>
                        </div>

                        {/* Card 8 */}
                        <div className="bg-[#f3f0fc] p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all duration-300">
                            <div className="bg-indigo-100 text-indigo-600 h-12 w-12 rounded-lg flex items-center justify-center mb-6">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Alumni Mentorship</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Connect with successfully placed alumni from your institution for 1-on-1 career guidance and industry referrals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Partners Section (Infinite Marquee) */}
            <div className="bg-white py-12 border-b border-gray-100 overflow-hidden relative flex flex-col items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center z-10">
                    <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">Trusted by industry leaders & top universities</p>
                </div>
                
                {/* Gradient Masks for smooth fade on edges */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex overflow-hidden group w-full">
                    <div className="animate-marquee group-hover:pause flex items-center space-x-16 px-8">
                        {[...Array(2)].map((_, i) => (
                            <React.Fragment key={i}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-8 object-contain transition-transform hover:scale-110" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 object-contain transition-transform hover:scale-110" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 object-contain transition-transform hover:scale-110" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-10 object-contain transition-transform hover:scale-110" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" alt="TCS" className="h-10 object-contain transition-transform hover:scale-110" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="h-8 object-contain transition-transform hover:scale-110" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" alt="Cisco" className="h-8 object-contain transition-transform hover:scale-110" />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-white via-blue-200 to-blue-500 mt-16 mx-4 sm:mx-8 lg:mx-16 rounded-3xl overflow-hidden shadow-xl mb-20 relative">
                <div className="px-8 py-16 md:p-16 flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="md:w-1/2 text-gray-900">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                            Start Connecting<br/>With Industry<br/>Today
                        </h2>
                        <p className="text-xl text-gray-700 font-medium mb-8">
                            Begin your industry connections
                        </p>
                        <Link to="/register" className="inline-block bg-indigo-600 text-white font-bold px-8 py-4 rounded-md shadow hover:bg-indigo-700 transition-colors">
                            Get Started Now
                        </Link>
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0 relative">
                        {/* Mockup Dashboard Image - Using standard HTML element styling to emulate the screenshot */}
                        <div className="bg-white rounded-lg shadow-2xl p-4 transform md:rotate-[-2deg] transition-transform hover:rotate-0">
                            <div className="flex justify-between items-center border-b pb-4 mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-green-500 rounded-md"></div>
                                    <div className="font-bold text-gray-800">Qollabb</div>
                                </div>
                                <div className="text-xs bg-indigo-600 text-white px-3 py-1 rounded">+ Post a job</div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Good morning, Maria</h3>
                                <p className="text-xs text-gray-500 mb-4">Here is your job listings statistic report from July 19 - July 25.</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-indigo-600 text-white p-3 rounded-lg flex flex-col">
                                        <span className="text-2xl font-bold">76</span>
                                        <span className="text-xs opacity-80">New candidates to review</span>
                                    </div>
                                    <div className="bg-teal-400 text-white p-3 rounded-lg flex flex-col">
                                        <span className="text-2xl font-bold">3</span>
                                        <span className="text-xs opacity-80">Schedule for today</span>
                                    </div>
                                    <div className="bg-blue-500 text-white p-3 rounded-lg flex flex-col">
                                        <span className="text-2xl font-bold">24</span>
                                        <span className="text-xs opacity-80">Messages received</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
