import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ArrowLeft, ShieldAlert, ChevronRight } from 'lucide-react';

/**
 * AndroidExitGesture
 * Handles Android edge pull / back swipe gesture reliably:
 * 1. Touch & Pointer drag from left side (0-100px from edge).
 * 2. Android OS native edge swipe back gesture (intercepts popstate).
 * 3. Left-edge interactive pull handle on mobile screens.
 */
const AndroidExitGesture = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const [hasExited, setHasExited] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0, active: false });

  // 1. Android OS Native Edge-Swipe (Back Gesture) Interceptor
  useEffect(() => {
    // Push guard state on mount so Android native back gesture triggers popstate
    try {
      window.history.pushState({ careersync_guard: true }, '');
    } catch {
      // Ignore if history API is restricted
    }

    const handlePopState = () => {
      // When user pulls from left edge on Android (system back gesture), trigger modal
      setShowExitModal(true);
      // Re-push guard state to stay on page if user chooses "Back"
      try {
        window.history.pushState({ careersync_guard: true }, '');
      } catch {
        // Ignore
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 2. Direct Touch & Pointer Drag from Left Side
  useEffect(() => {
    const handleStart = (clientX, clientY) => {
      // Left zone: anywhere within the first 90px of screen
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

      // If user is scrolling vertically, cancel horizontal edge pull
      if (deltaY > 60 && deltaX < 35) {
        dragStartRef.current.active = false;
        setPullProgress(0);
        return;
      }

      if (deltaX > 0) {
        const progress = Math.min(deltaX / 60, 1);
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

      // Trigger if pulled at least 45px rightward
      if (deltaX >= 45 && deltaY < 100) {
        setShowExitModal(true);
      }

      dragStartRef.current.active = false;
      setPullProgress(0);
    };

    // Touch listeners
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = (e) => {
      if (e.changedTouches.length > 0) {
        handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }
    };

    // Pointer listeners (works on Android Chrome, desktop DevTools emulation, and touchpads)
    const onPointerDown = (e) => {
      if (e.isPrimary) {
        handleStart(e.clientX, e.clientY);
      }
    };

    const onPointerMove = (e) => {
      if (e.isPrimary) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const onPointerUp = (e) => {
      if (e.isPrimary) {
        handleEnd(e.clientX, e.clientY);
      }
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
  }, []);

  const handleExitApp = () => {
    try {
      window.open('', '_self', '');
      window.close();
    } catch {
      // Ignored
    }

    setTimeout(() => {
      try {
        window.history.go(-2);
      } catch {
        window.location.href = 'about:blank';
      }
    }, 150);

    setHasExited(true);
  };

  const handleBack = () => {
    setShowExitModal(false);
    setHasExited(false);
  };

  return (
    <>
      {/* 3. Interactive Left-Edge Pull Handle on Mobile */}
      <div
        onClick={() => setShowExitModal(true)}
        className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-[45] w-3 h-20 bg-slate-400/20 hover:bg-blue-500/40 active:bg-blue-600/60 rounded-r-md cursor-pointer flex items-center justify-center transition-all touch-none select-none"
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBack}
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
