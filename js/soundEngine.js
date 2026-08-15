/**
 * High-Fidelity Procedural Sound & Tension Engine - The Dilemma
 * Web Audio API procedural synthesizer featuring:
 * - Studio Master FX Chain (DynamicsCompressor + Stereo Delay Space + Dynamic Filter)
 * - Continuous Analog Background Drone Beds for seamless theme immersion
 * - 5 Distinct Cinematic Procedural Soundtracks (Trading Floor, High Stakes Arena, Hotel Room, Cash Vault, Black Ops)
 * - Dynamic Real-Time Deal Room Tension & Heartbeat Escalation
 * - High-Impact Game Theory Reveal & Outcome Crescendos
 */

class TensionSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicEnabled = true;
    this.isHostVoiceEnabled = false;

    // Master Audio Chain
    this.masterCompressor = null;
    this.masterFilter = null;
    this.spatialDelay = null;
    this.delayGain = null;
    this.musicMasterGain = null;
    this.sfxMasterGain = null;

    // Continuous Drone Bed
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;

    // Heartbeat & SFX state
    this.heartbeatTimer = null;
    this.currentBpm = 60;
    this.theme = 'trading_desk';
    this.hasInteracted = false;

    // Procedural Music Step & Active Voice Tracking
    this.musicTimer = null;
    this.musicActiveNodes = [];
    this.musicStep = 0;
    this.currentTensionRatio = 0.0; // 0.0 (calm) -> 1.0 (climax)
  }

  setTheme(themeId) {
    if (this.theme === themeId) return;
    this.theme = themeId;
    this.updateDroneTheme();
    if (this.isMusicEnabled && !this.isMuted) {
      this.restartAmbientMusic();
    }
  }

  init() {
    this.ensureContext();
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.setupMasterChain();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.updateDroneTheme();
        if (this.isMusicEnabled && !this.isMuted && !this.musicTimer) {
          this.scheduleMusicBar();
        }
      }).catch(() => {});
    }
    if (!this.musicMasterGain && this.ctx) {
      this.setupMasterChain();
    }
  }

  setupMasterChain() {
    if (!this.ctx) return;
    try {
      // 1. Studio Mastering Compressor
      this.masterCompressor = this.ctx.createDynamicsCompressor();
      this.masterCompressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.masterCompressor.knee.setValueAtTime(10, this.ctx.currentTime);
      this.masterCompressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.masterCompressor.attack.setValueAtTime(0.004, this.ctx.currentTime);
      this.masterCompressor.release.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterCompressor.connect(this.ctx.destination);

      // 2. Dynamic Tension Lowpass Filter (Modulated during Deal Room countdown)
      this.masterFilter = this.ctx.createBiquadFilter();
      this.masterFilter.type = 'lowpass';
      this.masterFilter.frequency.setValueAtTime(2400, this.ctx.currentTime);
      this.masterFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      this.masterFilter.connect(this.masterCompressor);

      // 3. Spatial Stereo Delay (Lush ambient width & reverb tail)
      this.spatialDelay = this.ctx.createDelay(1.0);
      this.spatialDelay.delayTime.setValueAtTime(0.28, this.ctx.currentTime);
      this.delayGain = this.ctx.createGain();
      this.delayGain.gain.setValueAtTime(0.28, this.ctx.currentTime);

      const delayDampFilter = this.ctx.createBiquadFilter();
      delayDampFilter.type = 'lowpass';
      delayDampFilter.frequency.setValueAtTime(1600, this.ctx.currentTime);

      this.spatialDelay.connect(delayDampFilter);
      delayDampFilter.connect(this.delayGain);
      this.delayGain.connect(this.spatialDelay); // feedback loop
      this.delayGain.connect(this.masterFilter); // output to master

      // 4. Music Master Bus
      this.musicMasterGain = this.ctx.createGain();
      this.musicMasterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.musicMasterGain.connect(this.masterFilter);
      this.musicMasterGain.connect(this.spatialDelay);

      // 5. SFX Master Bus
      this.sfxMasterGain = this.ctx.createGain();
      this.sfxMasterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.sfxMasterGain.connect(this.masterCompressor);

      // Start continuous ambient drone
      this.initContinuousDrone();
    } catch (e) {
      console.warn('Error setting up Web Audio master chain:', e);
    }
  }

  /* ==========================================================================
     CONTINUOUS ANALOG AMBIENT DRONE BED
     ========================================================================== */

  initContinuousDrone() {
    if (!this.ctx || this.droneGain) return;
    try {
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc2 = this.ctx.createOscillator();

      this.droneOsc1.type = 'sawtooth';
      this.droneOsc2.type = 'triangle';

      const rootFreq = this.getThemeRootFreq(this.theme);
      this.droneOsc1.frequency.setValueAtTime(rootFreq, this.ctx.currentTime);
      this.droneOsc2.frequency.setValueAtTime(rootFreq * 1.004, this.ctx.currentTime); // Chorus detune

      this.droneOsc1.connect(droneFilter);
      this.droneOsc2.connect(droneFilter);
      droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.musicMasterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();
    } catch (e) {}
  }

  getThemeRootFreq(themeId) {
    switch (themeId) {
      case 'poker_tournament': return 43.65; // Low F1
      case 'hotel_lobby': return 49.00;      // Low G1
      case 'bank_vault': return 32.70;       // Seismic C1
      case 'military_intelligence': return 36.71; // Deep D1
      case 'trading_desk':
      default: return 36.71;                 // Deep D1
    }
  }

  updateDroneTheme() {
    if (!this.ctx || !this.droneOsc1) return;
    try {
      const root = this.getThemeRootFreq(this.theme);
      const t = this.ctx.currentTime;
      this.droneOsc1.frequency.exponentialRampToValueAtTime(root, t + 1.2);
      this.droneOsc2.frequency.exponentialRampToValueAtTime(root * 1.004, t + 1.2);
    } catch (e) {}
  }

  /* ==========================================================================
     AUDIO TOGGLES & CONTROLS
     ========================================================================== */

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopHeartbeat();
      if (this.musicMasterGain && this.ctx) {
        this.musicMasterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      }
      if (this.sfxMasterGain && this.ctx) {
        this.sfxMasterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      }
    } else {
      if (this.musicMasterGain && this.ctx) {
        this.musicMasterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      }
      if (this.sfxMasterGain && this.ctx) {
        this.sfxMasterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      }
      if (this.isMusicEnabled) {
        this.restartAmbientMusic();
      }
    }
    return this.isMuted;
  }

  toggleMusic() {
    this.ensureContext();
    this.isMusicEnabled = !this.isMusicEnabled;
    if (this.isMusicEnabled) {
      if (this.musicMasterGain && this.ctx) {
        this.musicMasterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      }
      this.restartAmbientMusic();
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
     PROCEDURAL GENERATIVE AMBIENT MUSIC ENGINE (5 UNIVERSES)
     ========================================================================== */

  startAmbientMusic() {
    if (!this.isMusicEnabled || this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        if (!this.musicTimer) this.scheduleMusicBar();
      }).catch(() => {});
      return;
    }

    if (this.musicTimer) return;
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
    let nextBarDelay = 3000;

    if (this.theme === 'poker_tournament') {
      // ♠️ HIGH STAKES ARENA: VEGAS JAZZ LOUNGE (Warm Rhodes, Walking Bass & Velvet Chords)
      nextBarDelay = 2800;
      const chords = [
        [174.61, 220.00, 261.63, 311.13, 392.00], // Fm9
        [116.54, 174.61, 233.08, 277.18, 349.23], // Bbm9
        [155.56, 196.00, 233.08, 277.18, 392.00], // Eb13
        [130.81, 164.81, 196.00, 246.94, 329.63]  // C7#9
      ];
      const bassNotes = [87.31, 116.54, 77.78, 65.41]; // F, Bb, Eb, C

      const idx = this.musicStep % chords.length;
      const chord = chords[idx];
      const bass = bassNotes[idx];

      // Acoustic Upright Bass
      this.playSynthVoice(bass, t, 2.4, 'triangle', 0.26, 450);
      this.playSynthVoice(bass * 1.5, t + 1.4, 1.2, 'triangle', 0.16, 400);

      // Warm Rhodes 9th Chords (Dual detuned voice for lush chorus)
      chord.forEach((freq, cIdx) => {
        this.playSynthVoice(freq, t + cIdx * 0.08, 2.6, 'sine', 0.14, 1600);
        this.playSynthVoice(freq * 1.003, t + cIdx * 0.08 + 0.01, 2.6, 'triangle', 0.08, 1200);
      });

      // Subtle Brushed Ride Cymbal Tap
      this.playBrushTap(t + 0.7);
      this.playBrushTap(t + 2.1);

    } else if (this.theme === 'hotel_lobby') {
      // 🛎️ HOTEL ROOM: ART DECO CONTINENTAL GRAND SALON (3/4 Elegant Waltz)
      nextBarDelay = 3000;
      const chords = [
        [196.00, 246.94, 293.66, 369.99, 440.00], // Gmaj9
        [123.47, 185.00, 220.00, 277.18, 329.63], // Bm7(11)
        [130.81, 164.81, 196.00, 246.94, 329.63], // Cmaj9
        [146.83, 220.00, 277.18, 329.63, 440.00]  // D9
      ];
      const bassNotes = [98.00, 123.47, 130.81, 146.83];

      const idx = this.musicStep % chords.length;
      const chord = chords[idx];
      const bass = bassNotes[idx];

      // Chamber Cello Root
      this.playSynthVoice(bass, t, 2.8, 'sawtooth', 0.20, 380);

      // Grand Piano 3/4 Waltz Chords (Beat 1, 2, 3)
      chord.forEach((f, cIdx) => {
        this.playSynthVoice(f, t + 0.25 + cIdx * 0.04, 1.1, 'triangle', 0.14, 1400);
        this.playSynthVoice(f, t + 1.10 + cIdx * 0.04, 1.1, 'triangle', 0.12, 1400);
      });

      // Velvet High Chime Harmonics
      this.playSynthVoice(chord[3] * 2, t + 1.8, 1.2, 'sine', 0.08, 2200);

    } else if (this.theme === 'bank_vault') {
      // 🔒 CASH VAULT: SUBTERRANEAN HEIST SOUNDSCAPE (Deep Seismic Sub & Minor-9th Stabs)
      nextBarDelay = 3000;
      const chords = [
        [130.81, 155.56, 196.00, 293.66, 392.00], // Cm9
        [103.83, 155.56, 207.65, 261.63, 311.13], // Abmaj7(#11)
        [87.31, 130.81, 174.61, 261.63, 311.13],  // Fm9
        [98.00, 146.83, 196.00, 293.66, 369.99]   // G7b9
      ];
      const bassNotes = [65.41, 51.91, 43.65, 49.00]; // Deep Sub C2, Ab1, F1, G1

      const idx = this.musicStep % chords.length;
      const chord = chords[idx];
      const bass = bassNotes[idx];

      // Seismic Velvet Sub-Bass
      this.playSynthVoice(bass, t, 2.8, 'sine', 0.28, 220);
      this.playSynthVoice(bass * 1.5, t + 0.05, 2.4, 'triangle', 0.16, 320);

      // Heist Rhodes Minor Chords with Steel Reverb
      chord.forEach((freq, cIdx) => {
        this.playSynthVoice(freq, t + 0.18 + cIdx * 0.09, 2.2, 'sine', 0.15, 900);
        this.playSynthVoice(freq * 1.004, t + 0.18 + cIdx * 0.09, 2.2, 'triangle', 0.09, 750);
      });

      // Subterranean Mechanical Tumbler Click
      this.playVaultTumbler(t + 1.4);

    } else if (this.theme === 'military_intelligence') {
      // 🎯 BLACK OPS: DEFCON 1 WAR ROOM (Covert Stealth Drones & Radar Pulse)
      nextBarDelay = 3000;
      const chords = [
        [146.83, 174.61, 220.00, 293.66, 349.23], // Dm9
        [116.54, 174.61, 233.08, 293.66, 349.23], // Bbmaj7(9)
        [98.00, 146.83, 196.00, 293.66, 329.63],  // Gm9
        [110.00, 164.81, 220.00, 277.18, 329.63]  // A7sus4
      ];
      const bassNotes = [73.42, 58.27, 49.00, 55.00];

      const idx = this.musicStep % chords.length;
      const chord = chords[idx];
      const bass = bassNotes[idx];

      // Stealth Drone Sub-Layer
      this.playSynthVoice(bass, t, 2.8, 'sawtooth', 0.22, 280);
      this.playSynthVoice(bass * 2, t + 0.1, 2.5, 'triangle', 0.14, 450);

      // Espionage Pad Swell
      chord.forEach((freq, cIdx) => {
        this.playSynthVoice(freq, t + 0.2 + cIdx * 0.08, 2.4, 'triangle', 0.12, 700);
      });

      // Muffled Tactical Sonar Sweep Pulse
      this.playSonarPing(t + 0.05);

    } else {
      // 📊 TRADING FLOOR: CYBERPUNK WALL STREET (Lush Rhodes Pads, Sub-Bass & Sequencer Pings)
      nextBarDelay = 2900;
      const bassFreqs = [73.42, 65.41, 87.31, 55.00]; // D2, C2, F2, A1
      const padChords = [
        [146.83, 220.00, 261.63, 329.63, 440.00], // Dm9 (D3, A3, C4, E4, A4)
        [130.81, 196.00, 246.94, 329.63, 392.00], // Cmaj9 (C3, G3, B3, E4, G4)
        [174.61, 220.00, 261.63, 349.23, 440.00], // Fmaj9 (F3, A3, C4, F4, A4)
        [110.00, 164.81, 220.00, 261.63, 329.63]  // Am9 (A2, E3, A3, C4, E4)
      ];

      const barIdx = this.musicStep % bassFreqs.length;
      const bass = bassFreqs[barIdx];
      const pad = padChords[barIdx];

      // Deep Analog Sub-Bass
      this.playSynthVoice(bass, t, 2.7, 'sine', 0.26, 240);
      this.playSynthVoice(bass * 2, t + 0.05, 2.4, 'triangle', 0.14, 420);

      // Lush Dual-Detuned Rhodes Pad Chords
      pad.forEach((freq, idx) => {
        this.playSynthVoice(freq, t + idx * 0.06, 2.6, 'sawtooth', 0.09, 850);
        this.playSynthVoice(freq * 1.004, t + idx * 0.06 + 0.01, 2.6, 'triangle', 0.12, 750);
      });

      // Liquid Financial Clock Sequencer
      this.playClockTick(t + 0.6, pad[2] * 2);
      this.playClockTick(t + 1.3, pad[3] * 2);
      this.playClockTick(t + 2.0, pad[4] * 2);
    }

    this.musicStep++;

    this.musicTimer = setTimeout(() => {
      this.scheduleMusicBar();
    }, nextBarDelay);
  }

  /* ==========================================================================
     CORE SYNTHESIS VOICE GENERATOR
     ========================================================================== */

  playSynthVoice(freq, startTime, duration, type, gainVal, filterFreq = 2500) {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const actualStart = Math.max(now, startTime);
      const attack = Math.min(0.12, duration * 0.2);
      const stopTime = actualStart + duration;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, actualStart);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, actualStart);

      gain.gain.setValueAtTime(0.0001, actualStart);
      gain.gain.linearRampToValueAtTime(gainVal, actualStart + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicMasterGain || this.ctx.destination);

      osc.start(actualStart);
      osc.stop(stopTime);

      this.musicActiveNodes.push(osc);
      setTimeout(() => {
        const i = this.musicActiveNodes.indexOf(osc);
        if (i > -1) this.musicActiveNodes.splice(i, 1);
      }, (duration + 0.3) * 1000);
    } catch (e) {}
  }

  /* Rhythmic Atmosphere Generators */

  playClockTick(t, freq) {
    if (!this.ctx || this.isMuted) return;
    try {
      const actualT = Math.max(this.ctx.currentTime, t);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, actualT);
      gain.gain.setValueAtTime(0.05, actualT);
      gain.gain.exponentialRampToValueAtTime(0.0001, actualT + 0.08);
      osc.connect(gain);
      gain.connect(this.musicMasterGain);
      osc.start(actualT);
      osc.stop(actualT + 0.08);
    } catch (e) {}
  }

  playBrushTap(t) {
    if (!this.ctx || this.isMuted) return;
    try {
      const actualT = Math.max(this.ctx.currentTime, t);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, actualT);
      osc.frequency.exponentialRampToValueAtTime(400, actualT + 0.06);
      gain.gain.setValueAtTime(0.04, actualT);
      gain.gain.exponentialRampToValueAtTime(0.0001, actualT + 0.06);
      osc.connect(gain);
      gain.connect(this.musicMasterGain);
      osc.start(actualT);
      osc.stop(actualT + 0.06);
    } catch (e) {}
  }

  playSonarPing(t) {
    if (!this.ctx || this.isMuted) return;
    try {
      const actualT = Math.max(this.ctx.currentTime, t);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, actualT);
      osc.frequency.exponentialRampToValueAtTime(600, actualT + 0.3);
      gain.gain.setValueAtTime(0.06, actualT);
      gain.gain.exponentialRampToValueAtTime(0.0001, actualT + 0.3);
      osc.connect(gain);
      gain.connect(this.musicMasterGain);
      osc.start(actualT);
      osc.stop(actualT + 0.3);
    } catch (e) {}
  }

  playVaultTumbler(t) {
    if (!this.ctx || this.isMuted) return;
    try {
      const actualT = Math.max(this.ctx.currentTime, t);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, actualT);
      osc.frequency.exponentialRampToValueAtTime(55, actualT + 0.08);
      gain.gain.setValueAtTime(0.08, actualT);
      gain.gain.exponentialRampToValueAtTime(0.0001, actualT + 0.08);
      osc.connect(gain);
      gain.connect(this.musicMasterGain);
      osc.start(actualT);
      osc.stop(actualT + 0.08);
    } catch (e) {}
  }

  /* ==========================================================================
     DYNAMIC GAMEPLAY TENSION & HEARTBEAT ENGINE
     ========================================================================== */

  setGameTension(remainingSec, maxSec = 45) {
    if (!this.ctx) return;
    try {
      const tension = 1 - Math.max(0, Math.min(1, remainingSec / maxSec));
      this.currentTensionRatio = tension;

      // Dynamically open up master lowpass filter cutoff
      const cutoff = 600 + tension * 2200; // 600Hz -> 2800Hz
      this.masterFilter.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.4);

      // Accelerate heartbeat based on tension
      const targetBpm = Math.floor(65 + tension * 75); // 65 BPM -> 140 BPM
      if (this.currentBpm !== targetBpm) {
        this.accelerateHeartbeat(targetBpm);
      }
    } catch (e) {}
  }

  startHeartbeat(bpm = 65) {
    this.stopHeartbeat();
    this.currentBpm = bpm;
    const interval = (60 / this.currentBpm) * 1000;

    const beat = () => {
      if (this.isMuted) return;
      this.playHeartbeatThud();
      this.heartbeatTimer = setTimeout(beat, (60 / this.currentBpm) * 1000);
    };
    beat();
  }

  accelerateHeartbeat(targetBpm) {
    this.currentBpm = targetBpm;
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  playHeartbeatThud() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      // Double lub-dub pulse
      this.triggerThud(t, 55, 0.24);
      this.triggerThud(t + 0.12, 42, 0.16);
    } catch (e) {}
  }

  triggerThud(startTime, freq, gainVal) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(25, startTime + 0.12);

    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain || this.ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.12);
  }

  startTensionDrone() {
    // Handled seamlessly via continuous drone and dynamic tension filter
  }

  stopTensionDrone() {
    // Reset tension filter to calm state
    if (this.ctx && this.masterFilter) {
      this.masterFilter.frequency.setTargetAtTime(2400, this.ctx.currentTime, 0.5);
    }
  }

  /* ==========================================================================
     TACTILE INTERACTION & DECISION SOUND EFFECTS
     ========================================================================== */

  playClick() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (this.theme === 'poker_tournament') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(280, t + 0.04);
      gain.gain.setValueAtTime(0.30, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    } else if (this.theme === 'hotel_lobby') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, t);
      gain.gain.setValueAtTime(0.20, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.03);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    }

    osc.connect(gain);
    gain.connect(this.sfxMasterGain || this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  playExitSound() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.16);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    osc.connect(gain);
    gain.connect(this.sfxMasterGain || this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.16);
  }

  playBallHover() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.exponentialRampToValueAtTime(700, t + 0.07);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.connect(gain);
    gain.connect(this.sfxMasterGain || this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  playSplitChoice() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    // Harmonious major third chime
    [523.25, 659.25, 1046.50].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.04);
      gain.gain.setValueAtTime(0.20, t + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.35);
      osc.connect(gain);
      gain.connect(this.sfxMasterGain || this.ctx.destination);
      osc.start(t + idx * 0.04);
      osc.stop(t + idx * 0.04 + 0.35);
    });
  }

  playStealChoice() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    // Heavy dramatic minor lock sting
    [440.00, 311.13, 220.00].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t + idx * 0.05);
      gain.gain.setValueAtTime(0.24, t + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.4);
      osc.connect(gain);
      gain.connect(this.sfxMasterGain || this.ctx.destination);
      osc.start(t + idx * 0.05);
      osc.stop(t + idx * 0.05 + 0.4);
    });
  }

  playCountdownTick(count) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const pitch = 350 + (10 - count) * 120;
    osc.frequency.setValueAtTime(pitch, t);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(this.sfxMasterGain || this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  playRevealSting() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(85, t);
    osc.frequency.linearRampToValueAtTime(520, t + 0.45);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    osc.connect(gain);
    gain.connect(this.sfxMasterGain || this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.55);
  }

  /* ==========================================================================
     OUTCOME REVEAL CRESCENDOS
     ========================================================================== */

  playSplitVictory() {
    if (!this.ctx || this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.connect(gain);
        gain.connect(this.sfxMasterGain || this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.45);
      }, idx * 90);
    });
  }

  playStealHeist(isUserWinner = true) {
    if (!this.ctx || this.isMuted) return;
    const notes = isUserWinner 
      ? [330, 440, 550, 880, 1100] 
      : [440, 392, 311, 220, 110];

    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.sfxMasterGain || this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.35);
      }, idx * 80);
    });
  }

  playMutualDestruction() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(25, t + 0.9);
    gain.gain.setValueAtTime(0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    osc.connect(gain);
    gain.connect(this.sfxMasterGain || this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.9);
  }

  speakHost(text, force = false) {
    if (!this.isHostVoiceEnabled || !('speechSynthesis' in window)) return;
    if (this.isMuted && !force) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }
}

window.soundEngine = new TensionSoundEngine();
