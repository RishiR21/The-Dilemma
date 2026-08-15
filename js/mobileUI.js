/**
 * Mobile-Specific Controller & Touch Interaction Layer - The Dilemma
 * Dedicated solely to enhancing mobile gameplay:
 *  - Haptic touch feedback (Vibration API)
 *  - Swipe-down gesture to dismiss bottom-sheet modals
 *  - Virtual keyboard viewport compensation (VisualViewport API)
 *  - Mobile first-touch audio unlock
 */

class MobileUIController {
  constructor() {
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.touchStartY = 0;
    this.touchCurrentY = 0;
    this.activeModal = null;
  }

  init() {
    this.setupAudioUnlock();
    this.setupModalSwipeGestures();
    this.setupVirtualKeyboardHandler();
    this.setupHapticFeedback();
  }

  /* 📳 Tactical Mobile Haptic Feedback */
  triggerHaptic(type = 'light') {
    if (!('vibrate' in navigator)) return;
    try {
      if (type === 'light') {
        navigator.vibrate(10);
      } else if (type === 'medium') {
        navigator.vibrate(25);
      } else if (type === 'heavy') {
        navigator.vibrate([30, 40, 30]);
      } else if (type === 'success') {
        navigator.vibrate([15, 60, 25]);
      } else if (type === 'error') {
        navigator.vibrate([40, 80, 40]);
      }
    } catch (e) {}
  }

  /* 🎵 First-Touch Mobile Web Audio Unlock */
  setupAudioUnlock() {
    const unlock = () => {
      if (window.soundEngine) {
        window.soundEngine.ensureContext();
        if (window.soundEngine.isMusicEnabled && !window.soundEngine.isMuted && !window.soundEngine.musicTimer) {
          window.soundEngine.startAmbientMusic();
        }
      }
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('pointerdown', unlock);
    };

    document.addEventListener('touchstart', unlock, { once: true, passive: true });
    document.addEventListener('pointerdown', unlock, { once: true, passive: true });
  }

  /* 📱 Swipe-Down to Dismiss Bottom-Sheet Modals on Mobile */
  setupModalSwipeGestures() {
    const modals = document.querySelectorAll('.modal-overlay');

    modals.forEach(modal => {
      const modalBox = modal.querySelector('.modal-box');
      if (!modalBox) return;

      modalBox.addEventListener('touchstart', (e) => {
        // Only trigger swipe-to-dismiss if scrolled to the very top of the modal box
        if (modalBox.scrollTop <= 0) {
          this.touchStartY = e.touches[0].clientY;
          this.activeModal = modal;
        } else {
          this.activeModal = null;
        }
      }, { passive: true });

      modalBox.addEventListener('touchmove', (e) => {
        if (!this.activeModal) return;
        this.touchCurrentY = e.touches[0].clientY;
        const deltaY = this.touchCurrentY - this.touchStartY;

        if (deltaY > 0) {
          // Add drag resistance
          modalBox.style.transform = `translateY(${deltaY * 0.75}px)`;
        }
      }, { passive: true });

      modalBox.addEventListener('touchend', () => {
        if (!this.activeModal) return;
        const deltaY = this.touchCurrentY - this.touchStartY;

        if (deltaY > 90) {
          // Dismiss modal if swiped down far enough
          this.triggerHaptic('light');
          this.activeModal.classList.add('hidden');
        }

        modalBox.style.transform = '';
        this.activeModal = null;
        this.touchStartY = 0;
        this.touchCurrentY = 0;
      }, { passive: true });
    });
  }

  /* ⌨️ Virtual Keyboard Height Adaptation */
  setupVirtualKeyboardHandler() {
    if (!window.visualViewport) return;

    window.visualViewport.addEventListener('resize', () => {
      const isKeyboardOpen = window.visualViewport.height < window.innerHeight * 0.75;
      const gameplay = document.getElementById('screenGameplay');
      const chatInput = document.getElementById('chatInput');

      if (isKeyboardOpen && document.activeElement === chatInput && gameplay && !gameplay.classList.contains('hidden')) {
        const stream = document.getElementById('chatStream');
        if (stream) {
          stream.scrollTop = stream.scrollHeight;
        }
      }
    });
  }

  /* 🔘 Universal Touch Haptics Wiring */
  setupHapticFeedback() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, .golden-ball-container, .mode-card, .skin-card, .tier-card');
      if (!target) return;

      if (target.id === 'btnLockChoice') {
        this.triggerHaptic('heavy');
      } else if (target.classList.contains('golden-ball-container')) {
        this.triggerHaptic('medium');
      } else {
        this.triggerHaptic('light');
      }
    }, { passive: true });
  }
}

window.mobileUI = new MobileUIController();
document.addEventListener('DOMContentLoaded', () => {
  window.mobileUI.init();
});
