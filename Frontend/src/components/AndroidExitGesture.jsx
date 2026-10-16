import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ArrowLeft, X, ChevronRight } from 'lucide-react';

/**
 * AndroidExitGesture
 * Active across the COMPLETE WEBSITE on Android / Mobile Touch devices ONLY.
 * - Desktop is 100% excluded (no listeners, no handles, no modals).
 * - On Android: pulling from the left edge on ANY page shows "Exit App" and "Back" options.
 * - "Exit App" exits the application.
 * - "Back" navigates back in browser history.
 * - (X) or backdrop cancels and stays on current page.
 */
const AndroidExitGesture = () => {
  const [isAndroidDevice, setIsAndroidDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent || '';
    const isAndroidUA = /Android/i.test(ua);
    const isMobileTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 1024;
    return isAndroidUA || isMobileTouch;
  });

  const [showExitModal, setShowExitModal] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);

  const dragStartRef = useRef({ x: 0, y: 0, active: false });

  // Keep Android detection updated on viewport resize/orientation change
  useEffect(() => {
    const handleDeviceCheck = () => {
      const ua = navigator.userAgent || '';
      const isAndroidUA = /Android/i.test(ua);
      const isMobileTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 1024;
      setIsAndroidDevice(isAndroidUA || isMobileTouch);
    };

    window.addEventListener('resize', handleDeviceCheck);
    return () => window.removeEventListener('resize', handleDeviceCheck);
  }, []);

  // Touch & Pointer Drag from Left Edge (Active across ALL pages on Android)
  useEffect(() => {
    if (!isAndroidDevice) return;

    const handleStart = (clientX, clientY) => {
      // Left edge zone: within first 90px of screen
      if (clientX <= 90) {
        dragStartRef.current = {
          x: clientX,
          y: clientY,
          active: true
        };
      } else {
        dragStartRef.current.active = false;
      }
    };

    const handleMove = (clientX, clientY) => {
      if (!dragStartRef.current.active) return;
      const deltaX = clientX - dragStartRef.current.x;
      const deltaY = Math.abs(clientY - dragStartRef.current.y);

      // Cancel horizontal pull if scrolling vertically
      if (deltaY > 60 && deltaX < 35) {
        dragStartRef.current.active = false;
        setPullProgress(0);
        return;
      }

      if (deltaX > 0) {
        const progress = Math.min(deltaX / 55, 1);
        setPullProgress(progress);
      }
    };

    const handleEnd = (clientX, clientY) => {
      if (!dragStartRef.current.active) {
        setPullProgress(0);
        return;
      }

      const deltaX = clientX - dragStartRef.current.x;
      const deltaY = Math.abs(clientY - dragStartRef.current.y);

      // Trigger modal if pulled at least 40px rightward from left edge
      if (deltaX >= 40 && deltaY < 100) {
        setShowExitModal(true);
      }

      dragStartRef.current.active = false;
      setPullProgress(0);
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = (e) => {
      if (e.changedTouches.length > 0) handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    };

    const onPointerDown = (e) => {
      if (e.isPrimary) handleStart(e.clientX, e.clientY);
    };
    const onPointerMove = (e) => {
      if (e.isPrimary) handleMove(e.clientX, e.clientY);
    };
    const onPointerUp = (e) => {
      if (e.isPrimary) handleEnd(e.clientX, e.clientY);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isAndroidDevice]);

  // Action 1: Exit App
  const handleExitApp = () => {
    setShowExitModal(false);

    // Try native App exit if Capacitor / Cordova environment
    if (window.navigator?.app?.exitApp) {
      window.navigator.app.exitApp();
      return;
    }

    // Standard window close
    try {
      window.open('', '_self', '');
      window.close();
    } catch {
      // Ignore
    }

    // Immediate exit navigation fallback for mobile browsers
    setTimeout(() => {
      try {
        window.location.replace('about:blank');
      } catch {
        window.location.href = 'about:blank';
      }
    }, 100);
  };

  // Action 2: Back (navigates back in browser history)
  const handleBack = () => {
    setShowExitModal(false);
    if (window.history.length > 1) {
      window.history.back();
    } else {
      handleExitApp();
    }
  };

  // Action 3: Cancel / Stay on current page
  const handleCancel = () => {
    setShowExitModal(false);
  };

  // Strictly disabled on desktop devices
  if (!isAndroidDevice) {
    return null;
  }

  return (
    <>
      {/* Interactive Left-Edge Pull Handle on Android / Mobile */}
      <div
        onClick={() => setShowExitModal(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[45] w-3 h-20 bg-slate-400/20 hover:bg-blue-500/40 active:bg-blue-600/60 rounded-r-md cursor-pointer flex items-center justify-center transition-all touch-none select-none"
        title="Pull or tap to exit"
      >
        <ChevronRight className="w-2.5 h-2.5 text-slate-500/50" />
      </div>

      {/* Dynamic Pull Indicator when dragging */}
      {pullProgress > 0 && !showExitModal && (
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[998] pointer-events-none transition-transform duration-75"
          style={{
            transform: `translateY(-50%) translateX(${pullProgress * 28}px)`,
            opacity: pullProgress
          }}
        >
          <div className="w-11 h-11 rounded-r-full bg-slate-900/90 backdrop-blur-md text-white flex items-center justify-center shadow-2xl border border-white/20">
            <ArrowLeft className="w-5 h-5 -ml-1 text-white animate-pulse" />
          </div>
        </div>
      )}

      {/* Exit Confirmation Bottom-Sheet / Modal */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop: Clicking closes modal and stays on current page */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs"
            />

            {/* Modal Card / Bottom Sheet */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10 border-t sm:border border-slate-200"
            >
              {/* Close (X) icon at top right */}
              <button
                type="button"
                onClick={handleCancel}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Cancel & Stay"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Android Drag Pill Indicator (Mobile) */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

              <div className="flex items-start gap-4 pr-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                  <LogOut className="w-6 h-6 text-rose-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    Exit Application?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    Would you like to exit the app or navigate back to your previous page?
                  </p>
                </div>
              </div>

              {/* Two Action Options: Back & Exit App */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleExitApp}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 transition-colors shadow-sm shadow-rose-600/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Exit App</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AndroidExitGesture;
