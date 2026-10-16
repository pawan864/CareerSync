import api from '../services/api';
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  ChevronRight, 
  Building2, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  CheckCheck, 
  Clock, 
  Radio, 
  Calendar, 
  Megaphone, 
  Briefcase, 
  History, 
  Search, 
  Filter, 
  RotateCcw, 
  ExternalLink, 
  MousePointerClick 
} from 'lucide-react';

const NotificationTicker = () => {
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tickerTheme, setTickerTheme] = useState('indigo');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'drives' | 'notices'
  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('careersync_read_notices') || '[]');
    } catch {
      return [];
    }
  });

  // History filtering state
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [historySubjectCategory, setHistorySubjectCategory] = useState('all');
  const [historyDateFilter, setHistoryDateFilter] = useState('all'); // 'all' | 'today' | 'week' | 'month' | 'custom'
  const [historyCustomDate, setHistoryCustomDate] = useState('');
  const [expandedIds, setExpandedIds] = useState([]);

  // Accordion expansion: Opening a new card automatically closes any previously expanded card
  const toggleExpand = (id) => {
    setExpandedIds(prev => 
      prev.includes(id) ? [] : [id]
    );
  };

  const fetchNotices = async () => {
    try {
      const res = await api.get('/notifications?all=true');
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load notices from server:', err);
    }
  };

  useEffect(() => {
    fetchNotices();

    // Real-time synchronization
    const timer = setInterval(fetchNotices, 3000); // Polling every 3s
    const handleUpdate = () => fetchNotices();
    const handleStorage = (e) => {
      if (e.key === 'careersync_notice_sync_time') fetchNotices();
    };

    window.addEventListener('careersync_notifications_updated', handleUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      clearInterval(timer);
      window.removeEventListener('careersync_notifications_updated', handleUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Re-fetch when drawer is opened to show latest Admin updates immediately
  useEffect(() => {
    if (isDrawerOpen) {
      fetchNotices();
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleSlideChange = (e) => {
      const slideThemes = ['blue', 'indigo', 'orange'];
      setTickerTheme(slideThemes[e.detail.slide] || 'indigo');
    };

    const savedTheme = localStorage.getItem('globalTheme');
    if (savedTheme) {
      setTickerTheme(savedTheme);
    }

    window.addEventListener('heroSlideChange', handleSlideChange);
    return () => {
      window.removeEventListener('heroSlideChange', handleSlideChange);
    };
  }, []);

  // Prevent background body scroll when drawer or modal is open (essential for Android)
  useEffect(() => {
    if (isDrawerOpen || isManualOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isDrawerOpen, isManualOpen]);

  const themeStyles = {
    blue: { bg: '#e0f2fe', border: '#1e3a8a', btn: '#ffb300' },
    indigo: { bg: '#e0f2fe', border: '#7b1fa2', btn: '#ffb300' },
    orange: { bg: '#e0f2fe', border: '#c2410c', btn: '#047857' }
  };

  const currentTheme = themeStyles[tickerTheme] || themeStyles.indigo;

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n._id);
    setReadIds(allIds);
    localStorage.setItem('careersync_read_notices', JSON.stringify(allIds));
  };

  const markSingleAsRead = (id) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem('careersync_read_notices', JSON.stringify(updated));
    }
  };

  const unreadCount = notifications.filter(n => !readIds.includes(n._id)).length;

  const matchesHistoryDate = (itemDateStr) => {
    if (!itemDateStr || historyDateFilter === 'all') return true;
    try {
      const itemDate = new Date(itemDateStr);
      if (isNaN(itemDate.getTime())) return true;
      const now = new Date();

      if (historyDateFilter === 'today') {
        const isSameCalendarDay = itemDate.toDateString() === now.toDateString();
        const diffMs = now.getTime() - itemDate.getTime();
        // Matches same calendar date OR posted within past 24 hours (with tolerance for small clock skew)
        const isPast24Hours = diffMs <= 24 * 60 * 60 * 1000 && diffMs >= -3600000;
        return isSameCalendarDay || isPast24Hours;
      }
      if (historyDateFilter === 'yesterday') {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        return itemDate.toDateString() === yesterday.toDateString();
      }
      if (historyDateFilter === 'week') {
        const diffMs = now.getTime() - itemDate.getTime();
        return diffMs <= 7 * 24 * 60 * 60 * 1000 && diffMs >= -3600000;
      }
      if (historyDateFilter === 'month') {
        const diffMs = now.getTime() - itemDate.getTime();
        return diffMs <= 30 * 24 * 60 * 60 * 1000 && diffMs >= -3600000;
      }
      if (historyDateFilter === 'custom' && historyCustomDate) {
        const y = itemDate.getFullYear();
        const m = String(itemDate.getMonth() + 1).padStart(2, '0');
        const d = String(itemDate.getDate()).padStart(2, '0');
        const localYmd = `${y}-${m}-${d}`;
        const isoYmd = itemDate.toISOString().slice(0, 10);
        return localYmd === historyCustomDate || isoYmd === historyCustomDate;
      }
    } catch {
      return true;
    }
    return true;
  };

  const matchesHistorySubject = (item) => {
    if (historySubjectCategory !== 'all') {
      if (historySubjectCategory === 'notices') {
        if (item.category !== 'notices' && item.category !== 'academic') return false;
      } else if (item.category !== historySubjectCategory) {
        return false;
      }
    }

    if (historySearchQuery && historySearchQuery.trim()) {
      const q = historySearchQuery.toLowerCase().trim();
      const inTitle = item.title?.toLowerCase().includes(q);
      const inRole = item.senderRole?.toLowerCase().includes(q);
      const inSender = item.sender?.toLowerCase().includes(q);
      const inDesc = item.description?.toLowerCase().includes(q);
      return Boolean(inTitle || inRole || inSender || inDesc);
    }

    return true;
  };

  const filteredNotifications = notifications.filter(item => {
    if (activeTab === 'history') {
      return matchesHistoryDate(item.createdAt) && matchesHistorySubject(item);
    }
    if (item.isActive === false) return false;
    if (activeTab === 'drives') return item.category === 'drives';
    if (activeTab === 'notices') return item.category === 'notices' || item.category === 'academic';
    return true;
  });

  const formatFullDateTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Official Circular';
    }
  };

  // Ticker items configured by Admin (isTicker: true) - Memoized for Android 60fps performance
  const tickerItems = useMemo(() => {
    return notifications.filter(n => n.isTicker !== false && n.isActive !== false);
  }, [notifications]);

  const formatRelativeTime = (dateStr) => {
    if (!dateStr) return 'Recent';
    try {
      const d = new Date(dateStr);
      const diffMs = Date.now() - d.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    } catch {
      return 'Official Notice';
    }
  };

  const isExternalUrl = (url) => {
    if (!url) return false;
    return /^(https?:\/\/|www\.)/i.test(url.trim());
  };

  const getCleanActionUrl = (url) => {
    if (!url) return '/login';
    const trimmed = url.trim();
    if (/^www\./i.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  // Moving ticker icon: Only Bell icon symbol is kept (on 1 or 2 items), all other icons removed
  const getTickerIcon = (item, idx) => {
    // Keep Bell icon for only 1 or 2 items (first item or urgent/high priority item at index <= 1)
    if (idx === 0 || (item.priority === 'high' && idx === 1)) {
      return <Bell className="w-3.5 h-3.5 mr-1.5 shrink-0 animate-ring text-amber-600 fill-amber-500/20" />;
    }
    // All other icons removed from moving ticker
    return null;
  };

  const getDrawerIcon = (item, idx) => {
    // Keep Bell for only 1 or 2 items (e.g. urgent announcement at top)
    if ((idx === 0 && item.priority === 'high') || idx === 0) {
      return <Bell className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
    }
    if (item.category === 'drives') {
      return <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />;
    }
    if (item.category === 'events') {
      return <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
    }
    if (item.category === 'academic') {
      return <GraduationCap className="w-3.5 h-3.5 text-purple-600 shrink-0" />;
    }
    if (item.isManual) {
      return <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
    }
    return <Megaphone className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
  };

  // Distinct color scheme for bracketed ticker tags ([Circular], [Event], [Assessment], etc.)
  const getTickerTagColor = (item, idx = 0) => {
    const role = (item?.senderRole || '').toLowerCase();
    const cat = (item?.category || '').toLowerCase();

    // 1. Keyword / category-based vibrant colors
    if (role.includes('event') || cat === 'events') {
      return 'text-emerald-700'; // Forest / Emerald Green for Events
    }
    if (role.includes('eval') || role.includes('assessment') || role.includes('academic') || cat === 'academic') {
      return 'text-purple-700'; // Royal Purple for Assessment / Evaluation
    }
    if (role.includes('drive') || role.includes('placement') || role.includes('job') || cat === 'drives') {
      return 'text-blue-700'; // Deep Blue for Drives & Placements
    }
    if (role.includes('circular')) {
      return 'text-indigo-700'; // Indigo for Official Circulars
    }
    if (role.includes('notice') || role.includes('admin') || cat === 'notices') {
      return 'text-amber-800'; // Amber-Bronze for Notices & Admin
    }
    if (role.includes('registry') || role.includes('document') || role.includes('student')) {
      return 'text-teal-700'; // Teal for Registry & Documentation
    }

    // 2. Fallback rotation across distinct colors if custom or unmapped
    const colorPalette = [
      'text-blue-700',
      'text-emerald-700',
      'text-purple-700',
      'text-indigo-700',
      'text-amber-800',
      'text-teal-700',
      'text-rose-700'
    ];
    return colorPalette[idx % colorPalette.length];
  };

  // Memoized ticker content for 60fps/120fps hardware acceleration on Android mobile
  const renderedTickerItems = useMemo(() => {
    if (tickerItems.length === 0) {
      return (
        <div className="flex items-center px-2 shrink-0 text-slate-700">
          <Bell className="w-3.5 h-3.5 mr-1.5 animate-ring text-amber-600 fill-amber-500/20" />
          <span className="font-bold text-indigo-700 mr-1.5">[Official Portal]</span>
          <span>CareerSync Campus Recruitment &amp; Placement Network Active</span>
          <span className="mx-2.5 sm:mx-3 text-gray-400 font-bold shrink-0">|</span>
        </div>
      );
    }

    return (
      <div className="flex items-center px-1 shrink-0">
        {tickerItems.map((item, idx) => (
          <React.Fragment key={item._id || idx}>
            {getTickerIcon(item, idx)}
            <span className={`font-bold mr-1.5 shrink-0 ${getTickerTagColor(item, idx)}`}>
              [{item.senderRole || 'Circular'}]
            </span>
            <span className="text-gray-900 shrink-0">{item.title}</span>
            <span className="mx-2.5 sm:mx-3 text-gray-400 font-bold shrink-0">|</span>
          </React.Fragment>
        ))}
      </div>
    );
  }, [tickerItems]);

  // Backward compatibility alias to prevent any ReferenceError during hot-reload
  const renderTickerItems = () => renderedTickerItems;

  return (
    <>
      <style>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0); }
          15% { transform: rotate(14deg); }
          30% { transform: rotate(-14deg); }
          45% { transform: rotate(10deg); }
          60% { transform: rotate(-10deg); }
          75% { transform: rotate(4deg); }
        }
        .animate-ring { animation: ring 2s ease-in-out infinite; transform-origin: top center; }
        
        @keyframes tickerMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-ticker-marquee {
          animation: tickerMarquee 15s linear infinite;
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .ticker-scroller {
          contain: layout paint;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        .ticker-scroller:hover .animate-ticker-marquee,
        .animate-ticker-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes tickerBtnFlip {
          0%, 42% {
            transform: rotateX(0deg);
          }
          50%, 92% {
            transform: rotateX(180deg);
          }
          100% {
            transform: rotateX(360deg);
          }
        }
        .animate-ticker-btn-flip {
          animation: tickerBtnFlip 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .ticker-btn-card:hover .animate-ticker-btn-flip {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top Banner Ticker */}
      <div 
        className="flex items-center overflow-hidden h-8 w-full fixed top-16 left-0 z-40 border-t-[3px] transition-colors duration-500 select-none [transform:translateZ(0)] [contain:paint]" 
        style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.border }}
      >
        {/* Left Notification Badge / 3D Flipping Trigger Button */}
        <div className="z-20 h-full flex items-center justify-center pl-2 sm:pl-3 pr-2.5 bg-transparent shrink-0 ticker-btn-card [perspective:800px]">
          <button 
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="group relative w-[122px] sm:w-[132px] h-[24px] sm:h-[26px] [transform-style:preserve-3d] cursor-pointer active:scale-95 transition-transform animate-ticker-btn-flip"
            title="Open Notification Center"
          >
            {/* Front Face: Notifications */}
            <div 
              className="absolute inset-0 flex items-center justify-center rounded shadow-xs [backface-visibility:hidden] -webkit-backface-visibility-hidden"
              style={{ 
                backgroundColor: currentTheme.btn, 
                color: tickerTheme === 'orange' ? '#ffffff' : '#0f172a' 
              }}
            >
              <div className="relative flex items-center mr-1.5">
                <Bell className="w-3.5 h-3.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600 ring-1 ring-white animate-pulse" />
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-bold">Notifications</span> 
              <span className="ml-1 text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">»</span>
            </div>

            {/* Back Face: Click Here */}
            <div 
              className="absolute inset-0 flex items-center justify-center rounded shadow-xs [backface-visibility:hidden] -webkit-backface-visibility-hidden [transform:rotateX(180deg)]"
              style={{ 
                backgroundColor: tickerTheme === 'orange' ? '#0f172a' : '#1e3a8a', 
                color: '#ffffff' 
              }}
            >
              <MousePointerClick className="w-3.5 h-3.5 mr-1 text-amber-300 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold text-white">Click Here</span> 
              <span className="ml-1 text-[10px] text-amber-300 font-bold group-hover:translate-x-0.5 transition-transform">»</span>
            </div>
          </button>
        </div>
        
        {/* Marquee Scroller */}
        <div 
          className="ticker-scroller flex-1 overflow-hidden relative h-full flex items-center cursor-pointer" 
          onClick={() => setIsDrawerOpen(true)}
          title="Click to view all notices"
        >
          <div className="animate-ticker-marquee whitespace-nowrap text-xs sm:text-[13px] font-medium flex items-center h-full text-gray-800 select-none">
            <div className="flex items-center shrink-0">
              {renderedTickerItems}
              {renderedTickerItems}
            </div>
            <div className="flex items-center shrink-0">
              {renderedTickerItems}
              {renderedTickerItems}
            </div>
          </div>
        </div>
      </div>

      {/* Human-Designed Professional Notification Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[120] overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
            />

            {/* Side Sheet (Slide in from Left, Full height, 100% on Android / 420px max on tablet/desktop) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute inset-y-0 left-0 w-full sm:w-[420px] max-w-[100vw] h-full h-[100dvh] max-h-[100dvh] bg-white shadow-2xl flex flex-col z-10 border-r border-slate-200"
            >
              {/* Header: Clean, Authentic Institutional Style */}
              <div className="px-4 sm:px-5 pt-4 pb-3.5 border-b border-slate-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-none">
                          Notification Center
                        </h3>
                        {unreadCount > 0 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-1">
                        Live announcements managed by Admin Console
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab(activeTab === 'history' ? 'all' : 'history')}
                      className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                        activeTab === 'history' 
                          ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/30' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                      }`}
                      title={activeTab === 'history' ? 'Back to Live Circulars' : 'View Past Announcements History'}
                      aria-label="Toggle History"
                    >
                      <History className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold">History</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsDrawerOpen(false)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label="Close panel"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Subheader Filter Tabs & Quick Action */}
                <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-slate-100 gap-2">
                  <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
                    {[
                      { key: 'all', label: 'All' },
                      { key: 'drives', label: 'Drives' },
                      { key: 'notices', label: 'Circulars' },
                      { key: 'history', label: 'History', hasIcon: true }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                          activeTab === tab.key 
                            ? 'bg-slate-900 text-white' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {tab.hasIcon && <History className="w-3 h-3 text-amber-400" />}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="inline-flex items-center text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer shrink-0"
                    >
                      <CheckCheck className="w-3.5 h-3.5 mr-1 text-blue-600" />
                      <span className="hidden xs:inline">Mark all read</span>
                      <span className="xs:hidden">All read</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Notification Feed (Scrollable, mobile-optimized padding) */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-2.5 slim-scrollbar">
                {activeTab === 'history' && (
                  <div className="mb-3 p-3 rounded-xl bg-slate-50 border border-slate-200/90 shadow-xs space-y-2.5">
                    {/* Header line of filter */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                        <History className="w-4 h-4 text-blue-600" />
                        <span>Filter Past Circulars</span>
                      </div>
                      {(historySearchQuery || historySubjectCategory !== 'all' || historyDateFilter !== 'all' || historyCustomDate) && (
                        <button
                          type="button"
                          onClick={() => {
                            setHistorySearchQuery('');
                            setHistorySubjectCategory('all');
                            setHistoryDateFilter('all');
                            setHistoryCustomDate('');
                          }}
                          className="text-[10px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer bg-rose-50 px-2 py-0.5 rounded border border-rose-200"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>Clear Filters</span>
                        </button>
                      )}
                    </div>

                    {/* Search by Subject / Keyword */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        value={historySearchQuery}
                        onChange={(e) => setHistorySearchQuery(e.target.value)}
                        placeholder="Search by subject, title, or keywords..."
                        className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      {historySearchQuery && (
                        <button
                          type="button"
                          onClick={() => setHistorySearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Filter by Subject & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Subject / Category Filter */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                          <Filter className="w-2.5 h-2.5 text-blue-600" />
                          <span>Subject</span>
                        </label>
                        <select
                          value={historySubjectCategory}
                          onChange={(e) => setHistorySubjectCategory(e.target.value)}
                          className="w-full py-1.5 px-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          <option value="all">All Subjects</option>
                          <option value="drives">Recruitment Drives</option>
                          <option value="events">Events &amp; Fairs</option>
                          <option value="notices">Official Circulars</option>
                          <option value="academic">Academic &amp; Assessments</option>
                        </select>
                      </div>

                      {/* Date Filter */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5 text-blue-600" />
                          <span>Date</span>
                        </label>
                        <select
                          value={historyDateFilter}
                          onChange={(e) => {
                            setHistoryDateFilter(e.target.value);
                            if (e.target.value !== 'custom') setHistoryCustomDate('');
                          }}
                          className="w-full py-1.5 px-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          <option value="all">All Time</option>
                          <option value="today">Today (Past 24h)</option>
                          <option value="yesterday">Yesterday</option>
                          <option value="week">Past 7 Days</option>
                          <option value="month">Past 30 Days</option>
                          <option value="custom">Choose Specific Date</option>
                        </select>
                      </div>
                    </div>

                    {/* Custom Calendar Date Picker */}
                    {historyDateFilter === 'custom' && (
                      <div className="pt-1">
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">
                          Select Date to Filter:
                        </label>
                        <input
                          type="date"
                          value={historyCustomDate}
                          onChange={(e) => setHistoryCustomDate(e.target.value)}
                          className="w-full py-1.5 px-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                        />
                      </div>
                    )}

                    {/* Result count & status */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60 text-[10px] text-slate-500">
                      <span>
                        Found <strong className="text-slate-900">{filteredNotifications.length}</strong> matching circular(s)
                      </span>
                      <span className="font-medium text-slate-400">Chronological Archive</span>
                    </div>
                  </div>
                )}

                {filteredNotifications.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <p className="text-xs font-medium">No announcements match the selected filter.</p>
                    {activeTab === 'history' && (
                      <button
                        type="button"
                        onClick={() => {
                          setHistorySearchQuery('');
                          setHistorySubjectCategory('all');
                          setHistoryDateFilter('all');
                          setHistoryCustomDate('');
                        }}
                        className="mt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        Reset filters to view all past records
                      </button>
                    )}
                  </div>
                ) : (
                  filteredNotifications.map((item, idx) => {
                    const isUnread = !readIds.includes(item._id);
                    const isExpanded = expandedIds.includes(item._id);
                    const descText = item.description || '';
                    const isLong = descText.length > 110;
                    return (
                      <div 
                        key={item._id} 
                        onClick={() => {
                          markSingleAsRead(item._id);
                          if (isLong) {
                            toggleExpand(item._id);
                          }
                        }}
                        className={`group p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                          isExpanded
                            ? 'border-2 border-blue-500 bg-blue-50/40 shadow-md ring-2 ring-blue-500/20 hover:shadow-lg hover:border-blue-600'
                            : isUnread 
                              ? 'bg-blue-50/40 hover:bg-blue-50/80 border border-blue-200/90 hover:border-blue-400 shadow-xs hover:shadow-md hover:-translate-y-0.5' 
                              : 'bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Top metadata line */}
                        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-[11px] mb-1">
                          <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors flex items-center gap-1.5 min-w-0 max-w-[200px] sm:max-w-none">
                            {getDrawerIcon(item, idx)}
                            <span className="truncate">{item.sender || 'Training & Placement Office'}</span>
                          </span>
                          
                          <div 
                            className="flex items-center gap-1 text-slate-500 text-[10px] shrink-0 ml-auto sm:ml-0"
                            title={`Broadcast: ${formatFullDateTime(item.createdAt)} (${formatRelativeTime(item.createdAt)})`}
                          >
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="font-medium text-slate-600">{formatFullDateTime(item.createdAt)}</span>
                            {isUnread && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-0.5 shrink-0" />
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mt-1 break-words">
                          {item.title}
                        </h4>

                        {/* Description */}
                        <p className={`text-xs text-slate-600 mt-1 leading-relaxed break-words ${isExpanded ? 'whitespace-pre-line' : ''}`}>
                          {isLong ? (
                            isExpanded ? (
                              <span>
                                {descText}{' '}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpand(item._id);
                                  }}
                                  className="text-blue-600 font-bold ml-1 hover:underline cursor-pointer inline-flex items-center text-[11px] py-0.5"
                                >
                                  Show less
                                </button>
                              </span>
                            ) : (
                              <span>
                                {descText.slice(0, 110).trim()}....{' '}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markSingleAsRead(item._id);
                                    toggleExpand(item._id);
                                  }}
                                  className="text-blue-600 font-bold hover:underline cursor-pointer inline-flex items-center text-[11px] py-0.5"
                                >
                                  Read more
                                </button>
                              </span>
                            )
                          ) : (
                            descText
                          )}
                        </p>

                        {/* Action footer */}
                        <div className="mt-2.5 pt-1.5 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="text-[10px] font-medium text-slate-400 truncate max-w-[150px] sm:max-w-none">
                              {item.senderRole || 'Official Circular'}
                            </span>
                            {item.isTicker && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 shrink-0" title="Live on homepage marquee ticker">
                                <Radio className="w-2.5 h-2.5 text-amber-500 animate-pulse" />
                                <span>Broadcast</span>
                              </span>
                            )}
                          </div>

                          {item.isManual ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsDrawerOpen(false);
                                setIsManualOpen(true);
                              }}
                              className="inline-flex items-center text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors py-1 px-1 -my-1 rounded active:bg-slate-100 shrink-0 cursor-pointer"
                            >
                              <span>{item.actionText || 'Open Manual (PDF)'}</span>
                              <ChevronRight className="w-3.5 h-3.5 ml-0.5 shrink-0" />
                            </button>
                          ) : (item.actionText && item.actionUrl && item.actionUrl.trim() !== '' && item.actionUrl !== 'none' ? (
                            <a
                              href={getCleanActionUrl(item.actionUrl)}
                              target={isExternalUrl(item.actionUrl) ? "_blank" : undefined}
                              rel={isExternalUrl(item.actionUrl) ? "noopener noreferrer" : undefined}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors py-1 px-1 -my-1 rounded active:bg-blue-50 shrink-0"
                            >
                              <span className="truncate max-w-[170px] sm:max-w-none">{item.actionText}</span>
                              {isExternalUrl(item.actionUrl) ? (
                                <ExternalLink className="w-3 h-3 ml-1 shrink-0" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 ml-0.5 shrink-0" />
                              )}
                            </a>
                          ) : null)}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Drawer Footer (Android Friendly - Large tap target) */}
              <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsManualOpen(true);
                  }}
                  className="flex-1 py-2 px-3 text-center rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>User Manual</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 py-2 px-3 text-center rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Official PDF User Manual Modal */}
      {isManualOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90dvh] sm:h-[85vh] flex flex-col overflow-hidden relative">
            <div className="flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-4 border-b bg-slate-50 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800 shrink-0" />
                <h2 className="text-xs sm:text-lg font-bold text-slate-900 truncate">CareerSync User Manual &amp; Policies</h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/CareerSync_User_Manual.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded bg-blue-50 border border-blue-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in Tab</span>
                </a>
                <button 
                  type="button"
                  onClick={() => setIsManualOpen(false)}
                  className="text-slate-400 hover:text-slate-800 hover:bg-slate-200 p-1.5 rounded-md transition-colors font-bold text-xl leading-none h-7 w-7 flex items-center justify-center cursor-pointer"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 relative">
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
                  <p className="p-4 text-center text-xs text-slate-600">Your browser does not support viewing PDFs directly.</p>
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
