import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const NotificationTicker = () => {
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [tickerTheme, setTickerTheme] = useState('indigo');

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleSlideChange = (e) => {
      const slideThemes = ['blue', 'indigo', 'orange'];
      setTickerTheme(slideThemes[e.detail.slide] || 'indigo');
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Initialize from localStorage in case it's set
    const savedTheme = localStorage.getItem('globalTheme');
    if (savedTheme) {
      setTickerTheme(savedTheme);
    }

    window.addEventListener('heroSlideChange', handleSlideChange);
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('heroSlideChange', handleSlideChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const themeStyles = {
    blue: { bg: '#e0f2fe', border: '#1e3a8a', btn: '#ffb300' },
    indigo: { bg: '#e0f2fe', border: '#7b1fa2', btn: '#ffb300' },
    orange: { bg: '#e0f2fe', border: '#c2410c', btn: '#047857' }
  };

  const currentTheme = themeStyles[tickerTheme] || themeStyles.indigo;

  const content = (
    <div className="flex items-center px-4">
      <Bell className="w-4 h-4 mr-2 animate-ring" fill="#ef6c00" stroke="#ef6c00" /> Registration for the upcoming <span className="font-semibold mx-1" style={{ color: '#ef6c00' }}>Virtual Career Fair</span> is now open! 
      <span className="mx-4 text-gray-500 font-bold">|</span> 
      Top recruiters like <span className="font-semibold mx-1" style={{ color: '#1b5e20' }}>TCS, Infosys &amp; Wipro</span> are actively hiring for the 2026 Batch 
      <span className="mx-4 text-gray-500 font-bold">|</span> 
      Need help navigating? &#128073; <button onClick={() => setIsManualOpen(true)} className="font-semibold mx-1 hover:underline cursor-pointer" style={{ color: '#ef6c00' }}>View User Manual</button> 
      <span className="mx-4 text-gray-500 font-bold">|</span> 
      Take the new <a href="/skill-gap" className="font-semibold mx-1 hover:underline" style={{ color: '#1b5e20' }}>Skill-Gap Assessment</a> to boost your profile 
      <span className="mx-4 text-gray-500 font-bold">|</span> 
      Update your resume to get personalized job recommendations
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes ring {
          0% { transform: rotate(0); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(5deg); }
          60% { transform: rotate(-5deg); }
          70% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }
        .animate-ring { animation: ring 1.5s ease-in-out infinite; transform-origin: top center; }
      `}</style>
      <div className="flex items-center overflow-hidden h-8 w-full fixed top-16 left-0 z-40 border-t-[3px] transition-colors duration-500" style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.border }}>
        
        {/* NOTIFICATIONS Badge */}
        <div className="z-20 h-full flex items-center justify-center pl-2 pr-4 bg-transparent shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
          <div className="text-white font-bold text-xs sm:text-[13px] px-3 py-1 rounded shadow cursor-pointer transition-all hover:scale-105 hover:shadow-lg" style={{ backgroundColor: currentTheme.btn, color: tickerTheme === 'orange' ? '#ffffff' : '#000000' }}>
            NOTIFICATIONS <span className="ml-1">»</span>
          </div>
        </div>
        
        {/* Scrolling Text */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center group">
          <div className="animate-marquee whitespace-nowrap text-[13.5px] font-medium flex items-center h-full group-hover:pause" style={{ color: '#333333' }}>
            {content}
            <span className="mx-6 text-gray-400 font-bold">|</span>
            {content}
            <span className="mx-6 text-gray-400 font-bold">|</span>
            {content}
            <span className="mx-6 text-gray-400 font-bold">|</span>
            {content}
          </div>
        </div>
      </div>

      {isManualOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden relative">
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">CareerSync User Manual</h2>
              <button 
                onClick={() => setIsManualOpen(false)}
                className="text-gray-500 hover:text-red-500 hover:bg-gray-200 p-2 rounded-full transition-colors font-bold text-xl leading-none h-8 w-8 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 bg-gray-100 relative">
              <object 
                data="/CareerSync_User_Manual.pdf#toolbar=0&navpanes=0" 
                type="application/pdf" 
                className="absolute inset-0 w-full h-full"
              >
                <iframe 
                  src="/CareerSync_User_Manual.pdf#toolbar=0&navpanes=0" 
                  title="CareerSync User Manual"
                  className="absolute inset-0 w-full h-full border-none"
                >
                  <p className="p-4 text-center">Your browser does not support viewing PDFs.</p>
                </iframe>
              </object>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationTicker;








