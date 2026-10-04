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
import { Bot, BookOpen, GraduationCap, Briefcase, Users, CheckCircle, BarChart, UserPlus, FileText, Pause, Play, ArrowRight, Cookie, X } from 'lucide-react';


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

const quickQueries = ["Jobs", "Placements", "Registration", "Login", "Support", "Resume/CV"];

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hi there! 👋 I'm your CareerSync AI Assistant. \n\nHow can I help you accelerate your career today? I can answer questions about placements, skill mapping, or employer connections." }
    ]);
    const chatEndRef = React.useRef(null);
    
    const chatBodyRef = React.useRef(null);
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isTyping]);
    
    const handleSendMessage = async (e, quickQuery = null) => {
        e.preventDefault();
        
        
        const userMsg = quickQuery || chatInput.trim();
        if (!userMsg) return;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        if (!quickQuery) setChatInput('');
        setIsTyping(true);
        
        try {
            // Local Specialized CareerSync AI (100% Reliable, Offline Mode)
            setTimeout(() => {
                let botResponse = "";
                const input = userMsg.toLowerCase();
                
                if (input.includes("job") || input.includes("jobs") || input.includes("placement") || input.includes("placements")) {
                    botResponse = "CareerSync connects students directly with top-tier companies. You can explore active hiring drives, apply for jobs, and use our AI to match your skills with specific placements! <br/><br/>👉 <a href='/jobs' class='text-blue-600 underline font-semibold hover:text-blue-800 transition-colors'>Browse Jobs & Placements</a>";
                } else if (input.includes("register") || input.includes("sign up") || input.includes("create account")) {
                    botResponse = "To register, simply click the link below to head to our registration page. You can register as a Student, University TPO, or Corporate Recruiter. <br/><br/>👉 <a href='/register' class='text-blue-600 underline font-semibold hover:text-blue-800 transition-colors'>Create an Account</a>";
                } else if (input.includes("login") || input.includes("log in") || input.includes("logged in")) {
                    botResponse = "You can access your dashboard by clicking the link below. Make sure to select your correct role (Student, Admin, or Recruiter) when logging in. <br/><br/>👉 <a href='/login' class='text-blue-600 underline font-semibold hover:text-blue-800 transition-colors'>Log In to Dashboard</a>";
                } else if (input.includes("help") || input.includes("helpline") || input.includes("contact") || input.includes("details") || input.includes("support") || input.includes("technical")) {
                    botResponse = "For technical support, you can reach our helpline at <b>+91-123-456-7890</b> or email us at <b>support@careersync.com</b>. We are available Monday to Friday, 9 AM - 6 PM.<br/><br/>👉 <a href='/support' class='text-blue-600 underline font-semibold hover:text-blue-800 transition-colors'>Visit Technical Support Page</a>";
                } else if (input.match(/\b(hi|hello|hey|greetings)\b/)) {
                    botResponse = "Hello! 👋 I am your specialized CareerSync Assistant. <br/><br/><b>CareerSync</b> is an advanced platform designed to bridge the gap between academia and industry. We provide a seamless ecosystem for <b>Students</b> to discover opportunities, <b>Universities</b> to manage placement drives, and <b>Recruiters</b> to hire top talent.<br/><br/>I can quickly assist you with questions regarding:<br/>• 💼 Jobs & Placements<br/>• 📝 Registration & Log In<br/>• 📞 Helpline & Support<br/><br/>How can I help you navigate the portal today?";
                } else {
                    botResponse = "I am a specialized CareerSync assistant. I am here to help you with <b>jobs, placements, registration, login, helpline details, or any other issue related to the portal</b>. Could you please rephrase your question regarding one of those topics?";
                }
                
                setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
                setIsTyping(false);
            }, 600);
        } catch (error) {
            console.error("Chat error:", error);
            setIsTyping(false);
        }
    };
    const [pageTheme, setPageTheme] = useState('indigo');
    const [showCookieConsent, setShowCookieConsent] = useState(() => {
        return localStorage.getItem('careerSyncCookieConsent') === null;
    });
    const [showPolicyModal, setShowPolicyModal] = useState(null);


    const handleCookieConsent = (type) => {
        localStorage.setItem('careerSyncCookieConsent', type);
        setShowCookieConsent(false);
    };

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
        window.dispatchEvent(new CustomEvent('pageThemeChange', { detail: { theme: pageTheme, isPaused } }));
    }, [pageTheme, isPaused]);

    const pageStyles = {
        blue: { bgDark: "bg-blue-500", cardBg: "bg-blue-50", iconBg: "bg-blue-100", iconText: "text-blue-600", borderHover: "hover:border-blue-200", btnBg: "bg-blue-600 hover:bg-blue-700", ctaGradient: "from-white via-blue-200 to-blue-500", textLight: "text-white", syncText: "text-blue-900" },
        indigo: { bgDark: "bg-indigo-500", cardBg: "bg-[#f3f0fc]", iconBg: "bg-indigo-100", iconText: "text-indigo-600", borderHover: "hover:border-indigo-100", btnBg: "bg-indigo-600 hover:bg-indigo-700", ctaGradient: "from-white via-indigo-200 to-indigo-500", textLight: "text-white", syncText: "text-indigo-900" },
        orange: { bgDark: "bg-orange-200", cardBg: "bg-[#fdfbf5]", iconBg: "bg-orange-100", iconText: "text-orange-600", borderHover: "hover:border-orange-200", btnBg: "bg-amber-800 hover:bg-amber-900", ctaGradient: "from-white via-orange-100 to-orange-200", textLight: "text-orange-900", syncText: "text-orange-900" }
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
        <>
        <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white"
        >
            {/* Hero Section */}
                        {/* Hero Section Slideshow */}
            <div id="tour-hero" className="relative w-full min-h-[calc(100vh-4rem)] flex items-center border-b border-gray-200 overflow-hidden bg-white">
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
                                    <h1 id="tour-hero-heading" className="text-xl md:text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl xl:text-[44px] mb-6">
                                        <span className="block md:whitespace-nowrap">{heroSlides[currentSlide].title1}</span>
                                        <span className="block text-gray-900 mt-2 md:whitespace-nowrap">{heroSlides[currentSlide].title2}</span>
                                    </h1>
                                    <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide mb-8 max-w-xl">
                                        {heroSlides[currentSlide].description}
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                                        <Link to={heroSlides[currentSlide].button1Link} className={`group relative overflow-hidden flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-md text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${heroSlides[currentSlide].btn1Color}`}>
                                            <span className="absolute inset-0 w-full h-full bg-black/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
                                            <span className="relative z-10">{heroSlides[currentSlide].button1}</span>
                                        </Link>
                                        <Link to={heroSlides[currentSlide].button2Link} className={`group relative overflow-hidden flex items-center justify-center px-6 py-2.5 border-2 text-sm font-bold rounded-md bg-white shadow transition-all duration-300 transform hover:-translate-y-1 ${heroSlides[currentSlide].btn2Color}`}>
                                            <span className="absolute inset-0 w-full h-full bg-gray-100 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
                                            <span className="relative z-10">{heroSlides[currentSlide].button2}</span>
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
                
                {/* AI Chatbot Window */}
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-80 md:w-96 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-50 flex flex-col"
                        >
                            {/* Chat Header */}
                            <div className={`p-4 flex justify-between items-center bg-gradient-to-r ${heroSlides[currentSlide].gradient}`}>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm">
                                        <Bot className={`w-4 h-4 ${['text-blue-600', 'text-indigo-600', 'text-orange-600'][currentSlide]}`} />
                                    </div>
                                    <span className="font-bold text-gray-900 tracking-tight">CareerSync AI</span>
                                </div>
                                <button onClick={() => { setIsChatOpen(false); setIsPaused(false); }} className="text-gray-800 hover:bg-black/10 p-1 rounded-full transition">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            
                            {/* Chat Body */}
                            <div ref={chatBodyRef} className="h-72 p-4 bg-gray-50 overflow-y-auto flex flex-col space-y-4">
                                <div className="text-xs text-center text-gray-400 font-medium my-1">Today</div>
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[85%] ${msg.sender === 'user' ? 'bg-gray-800 text-white self-end rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-700 self-start rounded-tl-sm'}`}>
                                        {msg.sender === 'user' ? (
                                            msg.text.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    {i !== msg.text.split('\n').length - 1 && <br />}
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                        )}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm self-start flex items-center space-x-1">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                            
                            {/* Quick Suggestion Chips */}
                            <div className="px-3 pb-2 pt-2 border-t border-gray-100 bg-gray-50 flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {quickQueries.map((query, i) => (
                                    <button 
                                        key={i}
                                        type="button"
                                        disabled={isTyping}
                                        onClick={() => handleSendMessage(null, query)}
                                        className="text-xs px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors flex-shrink-0 disabled:opacity-50"
                                    >
                                        {query}
                                    </button>
                                ))}
                            </div>
                            {/* Chat Input */}
                            <form onSubmit={(e) => handleSendMessage(e)} className="p-3 border-t border-gray-100 bg-white flex items-center space-x-2">
                                <input 
                                    type="text" 
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Ask me anything..." 
                                    className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:ring-0 rounded-full px-4 py-2 text-sm transition outline-none" 
                                />
                                <button type="submit" disabled={!chatInput.trim() || isTyping} className={`p-2 rounded-full text-white shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${['bg-blue-600 hover:bg-blue-700', 'bg-indigo-600 hover:bg-indigo-700', 'bg-amber-800 hover:bg-amber-900'][currentSlide]}`}>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hero Chatbot Icon (Bottom Right) */}
                <AnimatePresence>
                {!isChatOpen && (
                    <motion.button 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className={`absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-4 rounded-full bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-2xl border-2 border-transparent hover:border-gray-100 transition-all duration-300 hover:scale-110 flex items-center justify-center group`}
                        onClick={() => {
                            setIsChatOpen(true);
                            setIsPaused(true);
                        }}
                    >
                        <span className="absolute right-full mr-4 bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                            CareerSync AI Assistant
                        </span>
                        <Bot className={`w-7 h-7 transition-colors duration-500 ${['text-blue-600', 'text-indigo-600', 'text-orange-600'][currentSlide]}`} />
                    </motion.button>
                )}
                </AnimatePresence>
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

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="tour-features" className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Timeline Line */}
                    <div className="hidden md:flex justify-between items-center relative mb-12 px-10">
                        <div className={`absolute left-0 right-0 h-1 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} top-1/2 transform -translate-y-1/2 z-0`}></div>
                        
                        <div className={`relative z-10 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>01</div>
                        <div className={`relative z-10 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>02</div>
                        <div className={`relative z-10 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>03</div>
                        <div className={`relative z-10 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>04</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Driven Skill Mapping</h3>
                            <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide">
                                Students can analyze their resumes instantly to identify skill gaps and receive personalized learning paths to become industry-ready.
                            </p>
                        </div>
                        
                        {/* Card 2 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">TPOal Verification</h3>
                            <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide">
                                TPOs can securely verify student profiles and academic records, creating a trusted and highly credible talent pool for recruiters.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <BarChart className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Job Matching</h3>
                            <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide">
                                Recruiters use our advanced NLP algorithms to automatically match their job requirements with the most qualified campus talent.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Analytics</h3>
                            <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide">
                                Comprehensive real-time dashboards allow TPOs to track hiring pipelines, placement rates, and ongoing recruitment drives.
                            </p>
                        </div>
                    </div>

                    {/* Second Timeline Line */}
                    <div className="hidden md:flex justify-between items-center relative mb-12 mt-16 px-10">
                        <div className={`absolute left-0 right-0 h-1 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} top-1/2 transform -translate-y-1/2 z-0`}></div>
                        
                        <div className={`relative z-10 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>05</div>
                        <div className={`relative z-10 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>06</div>
                        <div className={`relative z-10 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>07</div>
                        <div className={`relative z-10 transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].bgDark : 'bg-blue-900'} ${pageStyles[pageTheme].textLight} rounded-full h-10 w-10 flex items-center justify-center font-bold`}>08</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Card 5 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Building</h3>
                            <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide">
                                Automatically generate ATS-friendly professional resumes based on your verified skills, projects, and academic records.
                            </p>
                        </div>
                        
                        {/* Card 6 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mock Interviews</h3>
                            <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide">
                                Practice your technical and behavioral skills with our AI interviewer to gain confidence before real industry interviews.
                            </p>
                        </div>

                        {/* Card 7 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">One-Click Apply</h3>
                            <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide">
                                Apply to top-tier verified internships and full-time positions with a single click, directly from your personalized dashboard.
                            </p>
                        </div>

                        {/* Card 8 */}
                        <div className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}>
                            <div className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText} rounded-lg flex items-center justify-center mb-6`}>
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni Mentorship</h3>
                            <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide">
                                Connect with successfully placed alumni from your TPO for 1-on-1 career guidance and industry referrals.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Our Partners Section (Infinite Marquee) */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="tour-marquee" className="bg-white py-12 border-b border-gray-100 overflow-hidden relative flex flex-col items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center z-10">
                    <p id="tour-marquee-container" className="text-sm font-bold tracking-widest text-gray-400 uppercase">Trusted by industry leaders & top universities</p>
                </div>
                
                {/* Gradient Masks for smooth fade on edges */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex overflow-hidden group w-full">
                    <div className="animate-marquee group-hover:pause flex items-center space-x-16 px-8">
                        {[...Array(2)].map((_, i) => (
                            <React.Fragment key={i}>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" className="w-6 h-6 object-cover object-left" alt="Microsoft" />
                                    <span className="text-lg md:text-xl font-semibold tracking-tight text-[#737373]">Microsoft</span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <GraduationCap className="w-8 h-8 text-blue-900" />
                                    <span className="text-xl md:text-2xl font-bold font-serif text-blue-900">IIT Bombay</span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-6 h-6 object-contain" alt="Google" />
                                    <span className="text-xl md:text-2xl font-medium tracking-tighter"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <GraduationCap className="w-8 h-8 text-red-800" />
                                    <span className="text-xl md:text-2xl font-black tracking-tight text-red-800">BITS Pilani</span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <span className="text-2xl font-black text-[#a100ff]">&gt;</span>
                                    <span className="text-xl md:text-2xl font-bold tracking-tight text-[#000000]">accenture</span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <GraduationCap className="w-8 h-8 text-indigo-900" />
                                    <span className="text-xl md:text-2xl font-bold font-sans text-indigo-900">NIT Trichy</span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" className="h-6 md:h-8 object-contain" alt="Wipro" />
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <GraduationCap className="w-8 h-8 text-teal-800" />
                                    <span className="text-xl md:text-2xl font-bold font-serif text-teal-800">VIT Vellore</span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <span className="text-xl md:text-2xl font-semibold tracking-wide text-[#007cc3]">Infosys</span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <GraduationCap className="w-8 h-8 text-gray-800" />
                                    <span className="text-xl md:text-2xl font-bold font-serif text-gray-800">IIT Delhi</span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-6 md:h-7 pt-1 object-contain" alt="Amazon" />
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <GraduationCap className="w-8 h-8 text-blue-700" />
                                    <span className="text-xl md:text-2xl font-black tracking-tighter text-blue-700">SRM University</span>
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" className="h-7 md:h-8 object-contain" alt="IBM" />
                                </div>
                                <div className="flex items-center space-x-3 transition-transform hover:scale-110 cursor-pointer">
                                    <GraduationCap className="w-8 h-8 text-orange-900" />
                                    <span className="text-xl md:text-2xl font-bold font-sans text-orange-900">DTU Delhi</span>
                                </div>
                              </React.Fragment>
                        ))}
                    </div>
                </div>
            </motion.div>

            
            {/* Success Stories / Testimonials */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="tour-testimonials" className="bg-gray-50 py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 id="tour-testimonials-heading" className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            Success Stories
                        </h2>
                        <p className={`mt-4 text-sm font-normal italic leading-relaxed tracking-wide max-w-2xl mx-auto transition-colors duration-500 ${isPaused ? pageStyles[pageTheme].syncText : 'text-blue-900'}`}>
                            Don't just take our word for it. Discover how we're helping graduates land their dream roles and companies hire their next top performers.
                        </p>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <motion.div initial="initial" whileHover="hover" className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative border border-gray-200 overflow-hidden cursor-pointer group h-64 flex flex-col justify-end">
                            {/* Default Visible State (Minimal & Professional) */}
                            <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-300 group-hover:opacity-0 z-10 transition-colors duration-500 ${pageStyles[pageTheme].cardBg}`}>
                                <div className="w-24 h-24 rounded-full mb-4">
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80" alt="Aryan Sharma" className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-1">Aryan Sharma</h4>
                                <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide text-center">Placed at TechCorp</p>
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
                                <div className="w-24 h-24 rounded-full mb-4">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2.2&w=150&h=150&q=80" alt="Priya Reddy" className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-1">Priya Reddy</h4>
                                <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide text-center">Talent Acquisition, InnovateInc</p>
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
                                <div className="w-24 h-24 rounded-full mb-4">
                                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80" alt="Dr. Manish Kumar" className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-1">Dr. Manish Kumar</h4>
                                <p className="text-sm text-gray-500 font-normal italic leading-relaxed tracking-wide text-center">TPO Head, Global Institute</p>
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
                        <h2 id="tour-cta-heading" className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                            Start Connecting<br/>With Industry<br/>Today
                        </h2>
                        <p className="text-lg text-gray-700 font-medium mb-8">
                            Begin your industry connections
                        </p>
                        <Link to="/register" className={`group relative overflow-hidden inline-flex items-center text-white font-normal px-6 py-3 text-sm md:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${pageStyles[pageTheme].btnBg}`}>
                            <span className="absolute inset-0 w-full h-full bg-black/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
                            <span className="relative z-10">Get Started Now</span>
                            <ArrowRight className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0 relative">
                        {/* Mockup Dashboard Image - Using standard HTML element styling to emulate the screenshot */}
                        <div className="bg-white rounded-lg shadow-2xl p-4 transform md:rotate-[-2deg] transition-transform hover:rotate-0">
                            <div className="flex justify-between items-center border-b pb-4 mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-500 ${pageStyles[pageTheme].bgDark}`}>
                                        <Briefcase className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="font-bold text-gray-800">CareerSync Recruiter</div>
                                </div>
                                <div className={`text-xs ${pageStyles[pageTheme].textLight} px-3 py-1 rounded transition-colors duration-500 ${pageStyles[pageTheme].bgDark}`}>+ Post a job</div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Good morning, HR Manager</h3>
                                <p className="text-xs text-gray-500 mb-4">Here is your AI skill-match applicant report for this week.</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className={`${pageStyles[pageTheme].textLight} p-3 rounded-lg flex flex-col transition-colors duration-500 ${pageStyles[pageTheme].bgDark}`}>
                                        <span className="text-2xl font-bold">142</span>
                                        <span className="text-xs opacity-80">Verified Student Matches</span>
                                    </div>
                                    <div className="bg-teal-500 text-white p-3 rounded-lg flex flex-col">
                                        <span className="text-2xl font-bold">12</span>
                                        <span className="text-xs opacity-80">Interviews Scheduled</span>
                                    </div>
                                    <div className="bg-blue-600 text-white p-3 rounded-lg flex flex-col">
                                        <span className="text-2xl font-bold">5</span>
                                        <span className="text-xs opacity-80">Offers Accepted</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </motion.div>

        {/* Professional Cookie Consent Banner (Horizontal) */}
        <AnimatePresence>
            {showCookieConsent && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-48px)] max-w-4xl bg-white border border-gray-200 shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Cookie className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                            <h3 className="text-gray-900 font-bold text-sm tracking-tight m-0">We value your privacy</h3>
                            <p className="text-gray-500 text-xs leading-relaxed m-0 mt-1 max-w-3xl pr-4">
                                We use cookies and similar technologies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept all", you consent to our use of these technologies. You can learn more about how we protect your data in our <a href="#" onClick={(e) => { e.preventDefault(); setShowPolicyModal('privacy'); }} className="text-gray-900 underline font-medium hover:text-black">Privacy Policy</a> and <a href="#" onClick={(e) => { e.preventDefault(); setShowPolicyModal('terms'); }} className="text-gray-900 underline font-medium hover:text-black">Terms of Service</a>.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                            onClick={() => handleCookieConsent('essential')}
                            className="flex-1 md:flex-none px-6 py-2.5 bg-white hover:bg-gray-100 hover:text-black hover:border-gray-400 hover:shadow-md text-gray-700 border border-gray-300 text-xs font-semibold rounded-lg transition-all shadow-sm active:scale-95"
                        >
                            Reject all
                        </button>
                        <button 
                            onClick={() => handleCookieConsent('all')}
                            className="flex-1 md:flex-none px-6 py-2.5 bg-gray-900 hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 text-white text-xs font-semibold rounded-lg transition-all shadow-sm active:scale-95"
                        >
                            Accept all
                        </button>
                        <button onClick={() => setShowCookieConsent(false)} className="hidden md:flex text-gray-400 hover:text-gray-600 transition-colors p-1 ml-2">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Policy Modals */}
        <AnimatePresence>
            {showPolicyModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-2xl bg-white border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-2xl p-6 md:p-8 max-h-[80vh] overflow-y-auto"
                    >
                        <button onClick={() => setShowPolicyModal(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full p-2">
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-gray-900 font-bold text-xl tracking-tight mb-4">
                            {showPolicyModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                        </h3>
                        <div className="text-gray-500 text-sm leading-relaxed space-y-4">
                            {showPolicyModal === 'privacy' ? (
                                <>
                                    <p>At CareerSync, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal data when you use our platform.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">1. Information We Collect</h4>
                                    <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, academic records, and resume data.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">2. How We Use Your Data</h4>
                                    <p>We use the information we collect to provide, maintain, and improve our services. We may also use the information to connect students with potential recruiters and academic faculty.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">3. Data Security</h4>
                                    <p>We implement appropriate technical and organizational measures to protect the personal data that we collect and process about you. The measures we use are designed to provide a level of security appropriate to the risk of processing your personal information.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">4. Your Data Rights</h4>
                                    <p>Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, update, or request deletion of your data. You can manage these preferences directly from your account dashboard.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">5. Third-Party Services</h4>
                                    <p>We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, or assist us in analyzing how our service is used. These third parties have access to your personal data only to perform these tasks on our behalf.</p>
                                </>
                            ) : (
                                <>
                                    <p>Welcome to CareerSync. By accessing or using our platform, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">1. User Responsibilities</h4>
                                    <p>You must provide accurate and complete information when creating an account. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">2. Acceptable Use</h4>
                                    <p>You agree not to engage in any of the following prohibited activities: copying, distributing, or disclosing any part of the service in any medium; using any automated system to access the service; attempting to interfere with the servers running the service.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">3. Termination</h4>
                                    <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">4. Intellectual Property</h4>
                                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of CareerSync and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
                                    <h4 className="font-bold text-gray-900 text-sm mt-6 mb-2">5. Limitation of Liability</h4>
                                    <p>In no event shall CareerSync, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your access to or use of the Service.</p>
                                </>
                            )}
                        </div>
                        <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end">
                            <button onClick={() => setShowPolicyModal(null)} className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-all shadow-sm active:scale-95">
                                I Understand
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        </>
    );
};

export default Home;
