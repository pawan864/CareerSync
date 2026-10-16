import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ArrowLeft, X, ShieldAlert } from 'lucide-react';

/**
 * AndroidExitGesture
 * Detects edge swipe (pull from left edge) on Android & mobile touch devices
 * and presents an exit confirmation dialog with "Exit App" and "Back" options.
 */
const AndroidExitGesture = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1 for edge indicator
  const [hasExited, setHasExited] = useState(false);

  const touchStartRef = useRef({ x: 0, y: 0, isEdgeSwipe: false, active: false });

  useEffect(() => {
    // Only bind gestures on touch-capable devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];

      // Left edge zone: within 35px from left edge of screen
      if (touch.clientX <= 35) {
        // Avoid intercepting if an interactive modal or drawer is currently active
        const isDrawerOpen = document.body.style.overflow === 'hidden';
        if (isDrawerOpen) return;

        touchStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          isEdgeSwipe: true,
          active: true
        };
      } else {
        touchStartRef.current.isEdgeSwipe = false;
        touchStartRef.current.active = false;
      }
    };

    const handleTouchMove = (e) => {
      if (!touchStartRef.current.isEdgeSwipe || !touchStartRef.current.active) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

      // If user is predominantly scrolling vertically, cancel the edge swipe
      if (deltaY > 50 && deltaX < 40) {
        touchStartRef.current.isEdgeSwipe = false;
        touchStartRef.current.active = false;
        setPullProgress(0);
        return;
      }

      if (deltaX > 0) {
        // Progress between 0 and 1 up to 80px pull
        const progress = Math.min(deltaX / 80, 1);
        setPullProgress(progress);
      }
    };

    const handleTouchEnd = (e) => {
      if (!touchStartRef.current.isEdgeSwipe || !touchStartRef.current.active) {
        setPullProgress(0);
        return;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

      // Threshold: pulled at least 65px horizontally with low vertical deflection
      if (deltaX >= 65 && deltaY < 90) {
        setShowExitModal(true);
      }

      touchStartRef.current.isEdgeSwipe = false;
      touchStartRef.current.active = false;
      setPullProgress(0);
    };

    const handleTouchCancel = () => {
      touchStartRef.current.isEdgeSwipe = false;
      touchStartRef.current.active = false;
      setPullProgress(0);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, []);

  const handleExitApp = () => {
    // Attempt standard browser window close
    try {
      window.open('', '_self', '');
      window.close();
    } catch {
      // Ignored if blocked by browser policy
    }

    // Modern mobile browsers may restrict script-initiated window.close()
    // If not closed, provide graceful exit feedback
    setHasExited(true);
  };

  const handleBack = () => {
    setShowExitModal(false);
    setHasExited(false);
  };

  return (
    <>
      {/* Android Native-Style Left Edge Pull Indicator */}
      {pullProgress > 0 && !showExitModal && (
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[998] pointer-events-none transition-transform duration-75"
          style={{
            transform: `translateY(-50%) translateX(${pullProgress * 22}px)`,
            opacity: pullProgress
          }}
        >
          <div className="w-10 h-10 rounded-r-full bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/20">
            <ArrowLeft className="w-5 h-5 -ml-1 text-white animate-pulse" />
          </div>
        </div>
      )}

      {/* Exit Confirmation Bottom-Sheet / Modal */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBack}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
            />

            {/* Modal Card / Bottom Sheet */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10 border-t sm:border border-slate-200"
            >
              {/* Android Drag Pill Indicator (Mobile) */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

              {!hasExited ? (
                <>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                      <LogOut className="w-6 h-6 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        Exit Application?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                        Are you sure you want to exit CareerSync, or would you like to continue browsing?
                      </p>
                    </div>
                  </div>

                  {/* Two Action Options: Exit App & Back */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-2"
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
                </>
              ) : (
                /* Fallback screen if mobile browser sandbox prevents window.close() */
                <div className="text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Session Safely Closed
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    You can now close this tab or swipe up to switch apps on your Android device.
                  </p>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="mt-5 w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Return to CareerSync
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AndroidExitGesture;
