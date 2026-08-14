/**
 * Sound & Tension Engine - The Dilemma (Theme-Adaptive Soundscape)
 * Web Audio API synthesizer that produces real-time heartbeat acceleration,
 * sub-bass tension drones, theme-adaptive chip/key/bolt clicks, order fill pings,
 * and Web Speech API Announcer commentary tailored to active theme.
 */

class TensionSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isHostVoiceEnabled = true;
    this.heartbeatOsc = null;
    this.heartbeatGain = null;
    this.heartbeatTimer = null;
    this.tensionDroneOsc = null;
    this.tensionDroneGain = null;
    this.currentBpm = 60;
    this.theme = 'trading_desk';
    this.hasInteracted = false;
  }

  setTheme(themeId) {
    this.theme = themeId;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.hasInteracted = true;
    } catch (e) {
      console.warn('Web Audio API not supported on this browser', e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopHeartbeat();
      this.stopTensionDrone();
    }
    return this.isMuted;
  }

  toggleHostVoice() {
    this.isHostVoiceEnabled = !this.isHostVoiceEnabled;
    return this.isHostVoiceEnabled;
  }

  /* ==========================================================================
     THEME-ADAPTIVE CLICK & SELECTION FX
     ========================================================================== */

  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    if (this.theme === 'poker_tournament') {
      // Crisp ceramic clay poker chip clack
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    } else if (this.theme === 'hotel_lobby') {
      // Delicate brass desk bell ding
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, t);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } else if (this.theme === 'bank_vault') {
      // Heavy metallic vault bolt lock
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.08);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } else {
      // Trading Terminal mechanical keystroke
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.exponentialRampToValueAtTime(250, t + 0.03);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    }
  }

  playBallHover() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(650, t + 0.06);

    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  playBallSelect(isSteal = false) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (isSteal) {
      // Ominous minor interval / danger surge
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.2);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    } else {
      // Crisp synergistic chord
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.2);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  /* ==========================================================================
     SUB-BASS TENSION DRONE
     ========================================================================== */

  startTensionDrone() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;
    this.stopTensionDrone();

    const t = this.ctx.currentTime;
    this.tensionDroneOsc = this.ctx.createOscillator();
    this.tensionDroneGain = this.ctx.createGain();

    this.tensionDroneOsc.type = 'sine';
    this.tensionDroneOsc.frequency.setValueAtTime(55, t); // Low A1 sub drone

    this.tensionDroneGain.gain.setValueAtTime(0.001, t);
    this.tensionDroneGain.gain.linearRampToValueAtTime(0.12, t + 2);

    this.tensionDroneOsc.connect(this.tensionDroneGain);
    this.tensionDroneGain.connect(this.ctx.destination);
    this.tensionDroneOsc.start(t);
  }

  stopTensionDrone() {
    if (this.tensionDroneOsc && this.ctx) {
      try {
        const t = this.ctx.currentTime;
        this.tensionDroneGain.gain.linearRampToValueAtTime(0.001, t + 0.5);
        this.tensionDroneOsc.stop(t + 0.5);
      } catch (e) {}
      this.tensionDroneOsc = null;
    }
  }

  /* ==========================================================================
     DYNAMIC ACCELERATING HEARTBEAT
     ========================================================================== */

  startHeartbeat(startBpm = 60) {
    this.currentBpm = startBpm;
    this.stopHeartbeat();
    this.scheduleHeartbeatTick();
  }

  setHeartbeatBpm(bpm) {
    this.currentBpm = Math.min(Math.max(bpm, 50), 190);
  }

  scheduleHeartbeatTick() {
    if (this.isMuted) return;
    const intervalMs = (60 / this.currentBpm) * 1000;

    this.playHeartbeatThump();

    this.heartbeatTimer = setTimeout(() => {
      this.scheduleHeartbeatTick();
    }, intervalMs);
  }

  playHeartbeatThump() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(75, t);
    osc1.frequency.exponentialRampToValueAtTime(35, t + 0.08);

    gain1.gain.setValueAtTime(0.3, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.08);

    // Second thump of lub-dub
    setTimeout(() => {
      if (!this.ctx) return;
      const t2 = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(65, t2);
      osc2.frequency.exponentialRampToValueAtTime(30, t2 + 0.09);

      gain2.gain.setValueAtTime(0.22, t2);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.09);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t2);
      osc2.stop(t2 + 0.09);
    }, 120);
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /* ==========================================================================
     REVEAL COUNTDOWN & OUTCOME AUDIO JINGLES
     ========================================================================== */

  playCountdownTick(count) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const pitch = 300 + (4 - count) * 150;
    osc.frequency.setValueAtTime(pitch, t);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  playRevealSting() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.linearRampToValueAtTime(440, t + 0.35);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  playSplitVictory() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      }, idx * 100);
    });
  }

  playStealHeist(isUserWinner = true) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = isUserWinner 
      ? [330, 440, 550, 880] 
      : [440, 392, 349, 220]; 

    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      }, idx * 90);
    });
  }

  playMutualDestruction() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.7);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.7);
  }

  /* ==========================================================================
     HOST COMMENTARY SPEECH SYNTHESIS
     ========================================================================== */

  speakHost(text, force = false) {
    if (!this.isHostVoiceEnabled || !('speechSynthesis' in window)) return;
    if (this.isMuted && !force) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const britishOrAmerican = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
    if (britishOrAmerican) {
      utterance.voice = britishOrAmerican;
    }

    window.speechSynthesis.speak(utterance);
  }
}

window.soundEngine = new TensionSoundEngine();
