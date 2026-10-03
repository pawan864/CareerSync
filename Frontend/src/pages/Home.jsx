/**
 * Landing Page Component (Home.jsx)
 * 
 * Features:
 * - Responsive UI using Tailwind CSS
 * - Interactive Framer Motion animations
 * - Dynamic rendering based on role/portal selection
 * - Unified typography and interactive states
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Briefcase, Users, CheckCircle, BarChart, UserPlus, FileText, Pause, Play, ArrowRight } from 'lucide-react';


const heroSlides = [
    {
        id: 1,
        tagline: "The Future of Campus Placements",
        title1: "Connecting Top Campus Talent",
        title2: "With Industry Leaders",
        description: "Empowering students with AI-driven skill mapping, connecting industries with top-tier verified talent, and providing TPOs with real-time placement analytics.",
        button1: "Join as Student",
        button1Link: "/register",
        button2: "Explore Opportunities",
        button2Link: "/jobs",
        imageSrc: "/hero-student-transparent.jpg?v=13",
        imageAlt: "Isolated Indian college student boy",
        gradient: "from-white via-blue-200 to-blue-500",
        taglineBg: "bg-blue-100 text-blue-900 border-blue-200",
        btn1Color: "bg-blue-900 hover:bg-blue-800",
        btn2Color: "border-blue-900 text-blue-900 hover:bg-blue-50",
        pillGlow: "hover:border-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.7)]",
        activeDot: "bg-blue-800 w-5",
        iconHover: "hover:text-blue-600"
    },
    {
        id: 2,
        tagline: "Empowering Your Career Journey",
        title1: "Discover Your True Potential",
        title2: "With AI-Powered Insights",
        description: "Build a dynamic profile, instantly match with top employers, and jumpstart your career through CareerSync's intelligent placement engine.",
        button1: "Get Started Now",
        button1Link: "/register",
        button2: "Learn More",
        button2Link: "/about",
        imageSrc: "/hero-girl-transparent.jpg",
        imageAlt: "Isolated female student",
        gradient: "from-white via-indigo-200 to-indigo-500",
        taglineBg: "bg-indigo-100 text-indigo-900 border-indigo-200",
        btn1Color: "bg-indigo-900 hover:bg-indigo-800",
        btn2Color: "border-indigo-900 text-indigo-900 hover:bg-indigo-50",
        pillGlow: "hover:border-indigo-400 hover:shadow-[0_0_12px_rgba(99,102,241,0.7)]",
        activeDot: "bg-indigo-800 w-5",
        iconHover: "hover:text-indigo-600"
    },
    {
        id: 3,
        tagline: "Celebrate Your Achievements",
        title1: "Step Into The Professional World",
        title2: "With Total Confidence",
        description: "From campus convocation to corporate success. CareerSync transforms your academic milestones into real-world career opportunities seamlessly.",
        button1: "Start Your Journey",
        button1Link: "/register",
        button2: "View Placements",
        button2Link: "/about",
        imageSrc: "/hero-convocation-student.jpg",
        imageAlt: "Graduation caps thrown in the air during convocation",
        gradient: "from-white via-orange-100 to-orange-200",
        taglineBg: "bg-orange-100 text-orange-900 border-orange-200",
        btn1Color: "bg-orange-800 hover:bg-orange-700",
        btn2Color: "border-orange-800 text-orange-900 hover:bg-orange-50",
        pillGlow: "hover:border-orange-400 hover:shadow-[0_0_12px_rgba(249,115,22,0.7)]",
        activeDot: "bg-orange-800 w-5",
        iconHover: "hover:text-orange-600"
    }
];

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [pageTheme, setPageTheme] = useState('indigo');

    useEffect(() => {
        if (isPaused) {
            const themes = ['blue', 'indigo', 'orange'];
            setPageTheme(themes[currentSlide]);
        } else {
            setPageTheme('indigo'); // Default back to indigo when playing
        }
    }, [isPaused, currentSlide]);

    useEffect(() => {
        localStorage.setItem('globalTheme', pageTheme);
        window.dispatchEvent(new CustomEvent('pageThemeChange', { detail: { theme: pageTheme } }));
    }, [pageTheme]);

    const pageStyles = {
        blue: { bgDark: "bg-blue-500", cardBg: "bg-blue-50", iconBg: "bg-blue-100", iconText: "text-blue-600", borderHover: "hover:border-blue-200", btnBg: "bg-blue-600 hover:bg-blue-700", ctaGradient: "from-white via-blue-200 to-blue-500", textLight: "text-white" },
        indigo: { bgDark: "bg-indigo-500", cardBg: "bg-[#f3f0fc]", iconBg: "bg-indigo-100", iconText: "text-indigo-600", borderHover: "hover:border-indigo-100", btnBg: "bg-indigo-600 hover:bg-indigo-700", ctaGradient: "from-white via-indigo-200 to-indigo-500", textLight: "text-white" },
        orange: { bgDark: "bg-orange-200", cardBg: "bg-[#fdfbf5]", iconBg: "bg-orange-100", iconText: "text-orange-600", borderHover: "hover:border-orange-200", btnBg: "bg-amber-800 hover:bg-amber-900", ctaGradient: "from-white via-orange-100 to-orange-200", textLight: "text-orange-900" }
    };


    useEffect(() => {
        window.dispatchEvent(new CustomEvent('heroSlideChange', { detail: { slide: currentSlide } }));
    }, [currentSlide]);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [isPaused]);
    return (
        <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white"
        >
            {/* Hero Section */}
                        {/* Hero Section Slideshow */}
            <div className="relative w-full min-h-[calc(100vh-4rem)] flex items-center border-b border-gray-200 overflow-hidden bg-white">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentSlide}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient} flex items-center`}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10 h-full flex items-center">
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                {/* Left Content */}
                                <div className="md:w-1/2 text-left mb-12 md:mb-0 pr-0 md:pr-10">
                                    <div className={`inline-block px-4 py-1 rounded-full font-semibold text-sm mb-6 border ${heroSlides[currentSlide].taglineBg}`}>
                                        {heroSlides[currentSlide].tagline}
                                    </div>
                                    <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl xl:text-5xl mb-6">
                                        <span className="block md:whitespace-nowrap">{heroSlides[currentSlide].title1}</span>
                                        <span className="block text-gray-900 mt-2 md:whitespace-nowrap">{heroSlides[currentSlide].title2}</span>
                                    </h1>
                                    <p className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed italic">
                                        {heroSlides[currentSlide].description}
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                                        <Link to={heroSlides[currentSlide].button1Link} className={`flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-md text-white shadow-lg transition-transform hover:-translate-y-1 ${heroSlides[currentSlide].btn1Color}`}>
                                            {heroSlides[currentSlide].button1}
                                        </Link>
                                        <Link to={heroSlides[currentSlide].button2Link} className={`flex items-center justify-center px-6 py-2.5 border-2 text-sm font-bold rounded-md bg-white shadow transition-transform hover:-translate-y-1 ${heroSlides[currentSlide].btn2Color}`}>
                                            {heroSlides[currentSlide].button2}
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Right Content Spacer */}
                                <div className="md:w-1/2 hidden md:block"></div>
                            </div>
                        </div>

                        {/* Absolute Bottom-Anchored Image */}
                        <img 
                            src={heroSlides[currentSlide].imageSrc} 
                            alt={heroSlides[currentSlide].imageAlt} 
                            className="hidden md:block absolute bottom-0 right-0 lg:right-[5%] xl:right-[10%] w-auto h-[90%] max-h-[850px] object-contain object-bottom mix-blend-multiply pointer-events-none"
                            style={{
                                maskImage: 'linear-gradient(to top, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Slideshow Indicators */}
                <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm transition-all duration-500 cursor-pointer group ${heroSlides[currentSlide].pillGlow}`}>
                    {/* Play/Pause Toggle */}
                    <button 
                        onClick={() => setIsPaused(!isPaused)}
                        className={`text-gray-700 hover:scale-110 active:scale-95 transition-all ${heroSlides[currentSlide].iconHover}`}
                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                    >
                        {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
                    </button>
                    
                    {/* Dots */}
                    <div className="flex space-x-1.5 border-l border-gray-400/30 pl-2">
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentSlide(idx);
                                    setIsPaused(true);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? heroSlides[currentSlide].activeDot : 'bg-gray-500/80 hover:bg-gray-700 w-1.5'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            
            {/* Global Impact / Statistics Section */}
            <div className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="px-4">
                            <h4 className={`text-4xl font-extrabold transition-colors duration-500 mb-2 ${pageStyles[pageTheme].textDark}`}>500+</h4>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Top Companies</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="px-4">
                            <h4 className={`text-4xl font-extrabold transition-colors duration-500 mb-2 ${pageStyles[pageTheme].textDark}`}>50+</h4>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Universities</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="px-4">
                            <h4 className={`text-4xl font-extrabold transition-colors duration-500 mb-2 ${pageStyles[pageTheme].textDark}`}>25k+</h4>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Students Placed</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="px-4">
                            <h4 className={`text-4xl font-extrabold transition-colors duration-500 mb-2 ${pageStyles[pageTheme].textDark}`}>98%</h4>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Success Rate</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Workflow Section */}

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Timeline Line */}
                    <div className="hidden md:flex justify-between items-center relative mb-12 px-10">
                        <div className={`absolute left-0 right-0 h-1 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} top-1/2 transform -translate-y-1/2 z-0`}></div>
                        
                        <div className={`relative z-10 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>01</div>
                        <div className={`relative z-10 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>02</div>
                        <div className={`relative z-10 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>03</div>
                        <div className={`relative z-10 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>04</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Driven Skill Mapping</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Students can analyze their resumes instantly to identify skill gaps and receive personalized learning paths to become industry-ready.
                            </p>
                        </div>
                        
                        {/* Card 2 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">TPOal Verification</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                TPOs can securely verify student profiles and academic records, creating a trusted and highly credible talent pool for recruiters.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <BarChart className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Job Matching</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Recruiters use our advanced NLP algorithms to automatically match their job requirements with the most qualified campus talent.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Placement Analytics</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Comprehensive real-time dashboards allow TPOs to track hiring pipelines, placement rates, and ongoing recruitment drives.
                            </p>
                        </div>
                    </div>

                    {/* Second Timeline Line */}
                    <div className="hidden md:flex justify-between items-center relative mb-12 mt-16 px-10">
                        <div className={`absolute left-0 right-0 h-1 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} top-1/2 transform -translate-y-1/2 z-0`}></div>
                        
                        <div className={`relative z-10 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>05</div>
                        <div className={`relative z-10 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>06</div>
                        <div className={`relative z-10 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>07</div>
                        <div className={`relative z-10 transition-colors duration-500 ${pageStyles[pageTheme].bgDark} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>08</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Card 5 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Resume Building</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Automatically generate ATS-friendly professional resumes based on your verified skills, projects, and academic records.
                            </p>
                        </div>
                        
                        {/* Card 6 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Mock Interviews</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Practice your technical and behavioral skills with our AI interviewer to gain confidence before real industry interviews.
                            </p>
                        </div>

                        {/* Card 7 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">One-Click Apply</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Apply to top-tier verified internships and full-time positions with a single click, directly from your personalized dashboard.
                            </p>
                        </div>

                        {/* Card 8 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Alumni Mentorship</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Connect with successfully placed alumni from your TPO for 1-on-1 career guidance and industry referrals.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Our Partners Section (Infinite Marquee) */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-white py-12 border-b border-gray-100 overflow-hidden relative flex flex-col items-center">
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
            </motion.div>

            
            {/* Success Stories / Testimonials */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-gray-50 py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            Success Stories
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            See how CareerSync is transforming the hiring landscape for students and top-tier recruiters.
                        </p>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <motion.div initial="initial" whileHover="hover" className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative border border-gray-200 overflow-hidden cursor-pointer group h-64 flex flex-col justify-end">
                            {/* Default Visible State (Minimal & Professional) */}
                            <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-300 group-hover:opacity-0 z-10 transition-colors duration-500 ${pageStyles[pageTheme].cardBg}`}>
                                <div className="w-16 h-16 rounded-full mb-4">
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" alt="Aryan Sharma" className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-1">Aryan Sharma</h4>
                                <p className="text-sm font-medium text-gray-500 text-center">Placed at TechCorp</p>
                            </div>

                            {/* Hover Reveal State */}
                            <motion.div 
                                variants={{
                                    initial: { clipPath: 'circle(0% at 100% 0%)' },
                                    hover: { clipPath: 'circle(150% at 100% 0%)' }
                                }}
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                                className="absolute inset-0 z-20 p-8 flex flex-col justify-center transition-colors duration-500 bg-white shadow-inner"
                            >
                                <p className="text-gray-700 italic mb-6 leading-relaxed relative z-10 text-sm font-medium">
                                    "Honestly, the platform made applying for jobs so much less stressful. It instantly flagged missing keywords in my resume before I applied, which ended up getting me my first big internship."
                                </p>
                                <div className={`font-bold text-xs uppercase tracking-wider ${pageStyles[pageTheme].iconText}`}>
                                    Aryan Sharma
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Testimonial 2 */}
                        <motion.div initial="initial" whileHover="hover" className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative border border-gray-200 overflow-hidden cursor-pointer group h-64 flex flex-col justify-end">
                            {/* Default Visible State */}
                            <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-300 group-hover:opacity-0 z-10 transition-colors duration-500 ${pageStyles[pageTheme].cardBg}`}>
                                <div className="w-16 h-16 rounded-full mb-4">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Priya Reddy" className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-1">Priya Reddy</h4>
                                <p className="text-sm font-medium text-gray-500 text-center">Talent Acquisition, InnovateInc</p>
                            </div>

                            {/* Hover Reveal State */}
                            <motion.div 
                                variants={{
                                    initial: { clipPath: 'circle(0% at 100% 0%)' },
                                    hover: { clipPath: 'circle(150% at 100% 0%)' }
                                }}
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                                className="absolute inset-0 z-20 p-8 flex flex-col justify-center transition-colors duration-500 bg-white shadow-inner"
                            >
                                <p className="text-gray-700 italic mb-6 leading-relaxed relative z-10 text-sm font-medium">
                                    "We used to spend weeks filtering through unverified campus applications. Now, we just set our requirements and the system hands us a pipeline of vetted students ready for interviews."
                                </p>
                                <div className={`font-bold text-xs uppercase tracking-wider ${pageStyles[pageTheme].iconText}`}>
                                    Priya Reddy
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Testimonial 3 */}
                        <motion.div initial="initial" whileHover="hover" className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative border border-gray-200 overflow-hidden cursor-pointer group h-64 flex flex-col justify-end">
                            {/* Default Visible State */}
                            <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-300 group-hover:opacity-0 z-10 transition-colors duration-500 ${pageStyles[pageTheme].cardBg}`}>
                                <div className="w-16 h-16 rounded-full mb-4">
                                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80" alt="Dr. Manish Kumar" className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-1">Dr. Manish Kumar</h4>
                                <p className="text-sm font-medium text-gray-500 text-center">TPO Head, Global Institute</p>
                            </div>

                            {/* Hover Reveal State */}
                            <motion.div 
                                variants={{
                                    initial: { clipPath: 'circle(0% at 100% 0%)' },
                                    hover: { clipPath: 'circle(150% at 100% 0%)' }
                                }}
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                                className="absolute inset-0 z-20 p-8 flex flex-col justify-center transition-colors duration-500 bg-white shadow-inner"
                            >
                                <p className="text-gray-700 italic mb-6 leading-relaxed relative z-10 text-sm font-medium">
                                    "It completely modernized our placement cell. I can see exactly which companies are viewing our students' profiles and generate placement reports for the dean with one click."
                                </p>
                                <div className={`font-bold text-xs uppercase tracking-wider ${pageStyles[pageTheme].iconText}`}>
                                    Dr. Manish Kumar
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* CTA Banner */}

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className={`bg-gradient-to-r mt-16 mx-4 sm:mx-8 lg:mx-16 rounded-3xl overflow-hidden shadow-xl mb-20 relative transition-colors duration-700 ${pageStyles[pageTheme].ctaGradient}`}>
                <div className="px-8 py-16 md:p-16 flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="md:w-1/2 text-gray-900">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                            Start Connecting<br/>With Industry<br/>Today
                        </h2>
                        <p className="text-xl text-gray-700 font-medium mb-8">
                            Begin your industry connections
                        </p>
                        <Link to="/register" className={`inline-block text-white font-bold px-8 py-4 rounded-md shadow transition-colors duration-500 ${pageStyles[pageTheme].btnBg}`}>
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
                                <div className={`text-xs ${pageStyles[pageTheme].textLight} px-3 py-1 rounded transition-colors duration-500 ${pageStyles[pageTheme].bgDark}`}>+ Post a job</div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Good morning, Maria</h3>
                                <p className="text-xs text-gray-500 mb-4">Here is your job listings statistic report from July 19 - July 25.</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className={`${pageStyles[pageTheme].textLight} p-3 rounded-lg flex flex-col transition-colors duration-500 ${pageStyles[pageTheme].bgDark}`}>
                                        <span className="text-2xl font-bold">76</span>
                                        <span className="text-xs opacity-80">New candidates to review</span>
                                    </div>
                                    <div className="bg-teal-400 ${pageStyles[pageTheme].textLight} p-3 rounded-lg flex flex-col">
                                        <span className="text-2xl font-bold">3</span>
                                        <span className="text-xs opacity-80">Schedule for today</span>
                                    </div>
                                    <div className="bg-blue-500 ${pageStyles[pageTheme].textLight} p-3 rounded-lg flex flex-col">
                                        <span className="text-2xl font-bold">24</span>
                                        <span className="text-xs opacity-80">Messages received</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </motion.div>
    );
};

export default Home;
