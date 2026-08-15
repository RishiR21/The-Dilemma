/**
 * Sound & Tension Engine - The Dilemma (Theme-Adaptive Soundscape & Procedural Ambient Music)
 * Web Audio API synthesizer that produces real-time heartbeat acceleration,
 * sub-bass tension drones, theme-adaptive chip/key/bolt clicks, order fill pings,
 * and 5 PROPRIETARY GENERATIVE AMBIENT MUSIC SOUNDTRACKS for each unique theme.
 */

class TensionSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicEnabled = true;
    this.isHostVoiceEnabled = false;

    // SFX Oscillators
    this.heartbeatTimer = null;
    this.tensionDroneOsc = null;
    this.tensionDroneGain = null;
    this.currentBpm = 60;
    this.theme = 'trading_desk';
    this.hasInteracted = false;

    // Generative Ambient Music Engine
    this.musicTimer = null;
    this.musicMasterGain = null;
    this.musicActiveNodes = [];
    this.musicStep = 0;
  }

  setTheme(themeId) {
    if (this.theme === themeId) return;
    this.theme = themeId;
    if (this.isMusicEnabled && !this.isMuted) {
      this.restartAmbientMusic();
    }
  }

  init() {
    if (this.ctx && this.ctx.state !== 'closed') {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.hasInteracted = true;
      this.setupMusicBus();
      if (this.isMusicEnabled && !this.isMuted) {
        this.startAmbientMusic();
      }
    } catch (e) {
      console.warn('Web Audio API not supported on this browser', e);
    }
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.setupMusicBus();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (!this.musicMasterGain && this.ctx) {
      this.setupMusicBus();
    }
  }

  setupMusicBus() {
    if (!this.ctx) return;
    try {
      this.musicMasterGain = this.ctx.createGain();
      this.musicMasterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.musicMasterGain.connect(this.ctx.destination);
    } catch (e) {}
  }

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopHeartbeat();
      this.stopTensionDrone();
      if (this.musicMasterGain && this.ctx) {
        this.musicMasterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      }
    } else {
      if (this.musicMasterGain && this.ctx) {
        this.musicMasterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      }
      if (this.isMusicEnabled) {
        this.startAmbientMusic();
      }
    }
    return this.isMuted;
  }

  toggleMusic() {
    this.ensureContext();
    this.isMusicEnabled = !this.isMusicEnabled;
    if (this.isMusicEnabled) {
      if (this.musicMasterGain && this.ctx) {
        this.musicMasterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      }
      this.startAmbientMusic();
    } else {
      this.stopAmbientMusic();
    }
    return this.isMusicEnabled;
  }

  toggleHostVoice() {
    this.isHostVoiceEnabled = !this.isHostVoiceEnabled;
    return this.isHostVoiceEnabled;
  }

  /* ==========================================================================
     PROCEDURAL GENERATIVE AMBIENT MUSIC ENGINE
     5 Unique Soundscapes Crafted in Real-Time via Web Audio API Synthesis
     ========================================================================== */

  startAmbientMusic() {
    if (!this.isMusicEnabled || this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    if (this.musicTimer) return; // Already running

    this.scheduleMusicBar();
  }

  stopAmbientMusic() {
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    this.musicActiveNodes.forEach(node => {
      try {
        node.stop();
      } catch (e) {}
    });
    this.musicActiveNodes = [];
  }

  restartAmbientMusic() {
    this.stopAmbientMusic();
    this.startAmbientMusic();
  }

  scheduleMusicBar() {
    if (!this.isMusicEnabled || this.isMuted || !this.ctx) return;

    const t = this.ctx.currentTime;
    let nextBarDelay = 3200; // ~3.2s per bar for smooth, rich atmospheric flow

    if (this.theme === 'poker_tournament') {
      // ♠️ HIGH STAKES ARENA: VEGAS JAZZ LOUNGE (Warm Rhodes & Upright Bass)
      nextBarDelay = 3000;
      const chords = [
        [174.61, 261.63, 311.13, 392.00], // Fm9
        [116.54, 233.08, 277.18, 349.23], // Bbm9
        [155.56, 233.08, 311.13, 392.00], // Eb13
        [130.81, 196.00, 246.94, 329.63]  // C7#9
      ];
      const bassNotes = [87.31, 116.54, 77.78, 65.41]; // F, Bb, Eb, C

      const chordIdx = this.musicStep % chords.length;
      const chord = chords[chordIdx];
      const bass = bassNotes[chordIdx];

      // Warm Acoustic Upright Bass
      this.playSynthNote(bass, t, 2.6, 'triangle', 0.24, 450);

      // Smooth Electric Piano Chord
      chord.forEach((freq, idx) => {
        this.playSynthNote(freq, t + idx * 0.12, 2.4, 'sine', 0.15, 1400);
      });

    } else if (this.theme === 'trading_desk') {
      // 📊 TRADING FLOOR: WALL STREET CYBER AMBIENT (Lush Rhodes Pads & Deep Sub-Bass)
      nextBarDelay = 3200;
      const bassFreqs = [73.42, 65.41, 87.31, 55.00]; // D2, C2, F2, A1
      const padChords = [
        [146.83, 220.00, 261.63, 329.63], // Dm9 (D3, A3, C4, E4)
        [130.81, 196.00, 246.94, 329.63], // Cmaj7 (C3, G3, B3, E4)
        [174.61, 220.00, 261.63, 349.23], // Fmaj7 (F3, A3, C4, F4)
        [110.00, 164.81, 220.00, 261.63]  // Am7 (A2, E3, A3, C4)
      ];

      const barIdx = this.musicStep % bassFreqs.length;
      const bass = bassFreqs[barIdx];
      const pad = padChords[barIdx];

      // Deep Warm Sub-Bass Pulse (Lowpass 220Hz)
      this.playSynthNote(bass, t, 2.8, 'sine', 0.22, 220);

      // Lush Analog Rhodes Pad Chords (Lowpass 650Hz)
      pad.forEach((freq, idx) => {
        this.playSynthNote(freq, t + idx * 0.15, 2.6, 'triangle', 0.12, 650);
      });

      // Subtle Liquid Arpeggio
      if (this.musicStep % 2 === 0) {
        this.playSynthNote(pad[3] * 1.5, t + 1.2, 1.2, 'sine', 0.06, 1200);
      }

    } else if (this.theme === 'hotel_lobby') {
      // 🛎️ HOTEL ROOM: ART DECO CONTINENTAL SALON (3/4 Elegant Waltz)
      nextBarDelay = 3200;
      const chords = [
        [196.00, 246.94, 293.66, 369.99], // Gmaj7
        [123.47, 185.00, 220.00, 277.18], // Bm7
        [130.81, 164.81, 196.00, 246.94], // Cmaj7
        [146.83, 220.00, 277.18, 329.63]  // D7
      ];
      const bassNotes = [98.00, 123.47, 130.81, 146.83];

      const idx = this.musicStep % chords.length;
      this.playSynthNote(bassNotes[idx], t, 2.6, 'sine', 0.22, 400);

      // Elegant Waltz Cadence (Beat 1, Beat 2, Beat 3)
      chords[idx].forEach((f) => {
        this.playSynthNote(f, t + 0.3, 1.2, 'triangle', 0.14, 1200);
        this.playSynthNote(f, t + 1.1, 1.2, 'triangle', 0.12, 1200);
      });

    } else if (this.theme === 'bank_vault') {
      // 🔒 CASH VAULT: SUBTERRANEAN HEIST SOUNDSCAPE (Deep 45Hz Sub & Heist Chords)
      nextBarDelay = 3200;
      const chords = [
        [130.81, 155.56, 196.00, 293.66], // Cm9
        [103.83, 155.56, 207.65, 261.63], // Abmaj7
        [87.31, 130.81, 174.61, 261.63],  // Fm9
        [98.00, 146.83, 196.00, 293.66]   // Gsus4
      ];
      const bassNotes = [65.41, 51.91, 43.65, 49.00];

      const idx = this.musicStep % chords.length;
      const chord = chords[idx];
      const bass = bassNotes[idx];

      // Velvet Sub Bass (Lowpass 240Hz)
      this.playSynthNote(bass, t, 2.8, 'triangle', 0.24, 240);

      // Rhodes Heist Chords (Lowpass 750Hz)
      chord.forEach((freq, cIdx) => {
        this.playSynthNote(freq, t + 0.2 + (cIdx * 0.14), 2.2, 'sine', 0.14, 750);
      });

    } else {
      // 🎯 BLACK OPS: STEALTH COVERT AMBIENCE (Deep Drone & Espionage Pad Swell)
      nextBarDelay = 3200;
      const chords = [
        [146.83, 174.61, 220.00, 293.66], // Dm7
        [116.54, 174.61, 233.08, 293.66], // Bbmaj7
        [98.00, 146.83, 196.00, 293.66],  // Gm7
        [110.00, 164.81, 220.00, 277.18]  // A7sus4
      ];
      const bassNotes = [73.42, 58.27, 49.00, 55.00];

      const idx = this.musicStep % chords.length;
      const chord = chords[idx];
      const bass = bassNotes[idx];

      // Deep Stealth Drone (Lowpass 300Hz)
      this.playSynthNote(bass, t, 2.8, 'triangle', 0.22, 300);

      // Muffled Sonar Sub-Thump
      this.playSynthNote(48.0, t, 0.4, 'sine', 0.20, 120);

      // Espionage Pad Swell (Lowpass 650Hz)
      chord.forEach((freq, cIdx) => {
        this.playSynthNote(freq, t + 0.25 + (cIdx * 0.12), 2.2, 'triangle', 0.11, 650);
      });
    }

    this.musicStep++;

    this.musicTimer = setTimeout(() => {
      this.scheduleMusicBar();
    }, nextBarDelay);
  }

  playSynthNote(freq, startTime, duration, type, gainVal, filterFreq = 2500) {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicMasterGain || this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);

      this.musicActiveNodes.push(osc);
      setTimeout(() => {
        const i = this.musicActiveNodes.indexOf(osc);
        if (i > -1) this.musicActiveNodes.splice(i, 1);
      }, duration * 1000 + 200);
    } catch (e) {}
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
      gain.gain.setValueAtTime(0.35, t);
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
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } else if (this.theme === 'bank_vault') {
      // Soft subterranean vault mechanical latch (Warm low-frequency thud)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.06);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    } else if (this.theme === 'military_intelligence') {
      // Muted tactical covert toggle (Soft low-register click)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.04);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    } else {
      // Trading Terminal mechanical keystroke
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.exponentialRampToValueAtTime(250, t + 0.03);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    }
  }

  playExitSound() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.18);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.18);
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

    gain.gain.setValueAtTime(0.08, t);
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
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.2);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.2);
      gain.gain.setValueAtTime(0.25, t);
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
    this.tensionDroneOsc.frequency.setValueAtTime(55, t);

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
     REVEAL COUNTDOWN & OUTCOME AUDIO
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

    const notes = [523.25, 659.25, 783.99, 1046.50];
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
