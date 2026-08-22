/**
 * High-Fidelity Procedural Sound & Tension Engine - The Dilemma
 * Designed with World-Class Game Audio Direction:
 * - Studio Master FX Chain (DynamicsCompressor + Stereo Delay Space + Dynamic Filter)
 * - 5 Engaging Thematic Soundtracks with Infectious Grooves & Cinematic Swagger:
 *    1. Trading Floor: Wall Street Neo-Soul / Cyberpunk Swagger (Daft Punk / French House Groove + Cha-Ching)
 *    2. High Stakes Arena: Ocean's 11 Acid Jazz / Vegas Lounge (Fender Rhodes + Swung Walking Bass + Finger Snaps)
 *    3. Hotel Room: The White Lotus / Succession Theatrical Dark Comedy Waltz (3/4 Baroque Piano + Pizzicato)
 *    4. Cash Vault: Funky 70s Spy-Heist Groove (Slap Bass + Safe Tumbler Rhythms)
 *    5. Black Ops: 007 / Mission Impossible Espionage Spy Funk (Chromatic 007 Chords + Spy Brass Stabs)
 * - Thematic Phone, Rotary, Intercom & Walkie-Talkie Matchup Comms
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
    this.matchupAmbienceTimer = null;
    this.musicActiveNodes = [];
    this.musicStep = 0;
    this.currentTensionRatio = 0.0;
  }

  setTheme(themeId) {
    if (this.theme === themeId) return;
    this.theme = themeId;
    this.musicStep = 0;
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
      this.masterCompressor.ratio.setValueAtTime(3.5, this.ctx.currentTime);
      this.masterCompressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.masterCompressor.release.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterCompressor.connect(this.ctx.destination);

      // 2. Studio Master Acoustic Filter (Crisp sparkle and transparency: 7500 Hz default)
      this.masterFilter = this.ctx.createBiquadFilter();
      this.masterFilter.type = 'lowpass';
      this.masterFilter.frequency.setValueAtTime(7500, this.ctx.currentTime);
      this.masterFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterFilter.connect(this.masterCompressor);

      // 3. Spatial Stereo Delay (Lush room depth & warm analog tail)
      this.spatialDelay = this.ctx.createDelay(1.0);
      this.spatialDelay.delayTime.setValueAtTime(0.22, this.ctx.currentTime);
      this.delayGain = this.ctx.createGain();
      this.delayGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      const delayDampFilter = this.ctx.createBiquadFilter();
      delayDampFilter.type = 'lowpass';
      delayDampFilter.frequency.setValueAtTime(2800, this.ctx.currentTime);

      this.spatialDelay.connect(delayDampFilter);
      delayDampFilter.connect(this.delayGain);
      this.delayGain.connect(this.spatialDelay);
      this.delayGain.connect(this.masterFilter);

      // 4. Music Master Bus (Balanced studio mixing)
      this.musicMasterGain = this.ctx.createGain();
      this.musicMasterGain.gain.setValueAtTime(0.20, this.ctx.currentTime);
      this.musicMasterGain.connect(this.masterFilter);
      this.musicMasterGain.connect(this.spatialDelay);

      // 5. SFX Master Bus
      this.sfxMasterGain = this.ctx.createGain();
      this.sfxMasterGain.gain.setValueAtTime(0.32, this.ctx.currentTime);
      this.sfxMasterGain.connect(this.masterCompressor);

      // Start continuous ambient drone
      this.initContinuousDrone();
    } catch (e) {
      console.warn('Error setting up Web Audio master chain:', e);
    }
  }

  /* ==========================================================================
     CONTINUOUS ANALOG AMBIENT DRONE BED (SUBTLE WARMTH)
     ========================================================================== */

  initContinuousDrone() {
    if (!this.ctx || this.droneGain) return;
    try {
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(180, this.ctx.currentTime);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc2 = this.ctx.createOscillator();

      this.droneOsc1.type = 'sawtooth';
      this.droneOsc2.type = 'triangle';

      const rootFreq = this.getThemeRootFreq(this.theme);
      this.droneOsc1.frequency.setValueAtTime(rootFreq, this.ctx.currentTime);
      this.droneOsc2.frequency.setValueAtTime(rootFreq * 1.004, this.ctx.currentTime);

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
      case 'hotel_lobby': return 55.00;      // Low A1
      case 'bank_vault': return 41.20;       // Deep E1
      case 'military_intelligence': return 41.20; // Deep E1
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
     ENGAGING PROCEDURAL SOUNDTRACK SUITE (5 SOPHISTICATED WORLDS)
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
    let nextBarDelay = 3200; // ~3.0s - 3.2s per measure for lush, luxurious atmospheric flow

    if (this.theme === 'poker_tournament') {
      // ♠️ 1. HIGH STAKES ARENA: VEGAS JAZZ LOUNGE (Lush Fender Rhodes Chords & Upright Bass)
      nextBarDelay = 3000;
      const chords = [
        [174.61, 261.63, 311.13, 392.00], // Fm9 (F3, C4, Eb4, G4)
        [116.54, 233.08, 277.18, 349.23], // Bbm9 (Bb2, Bb3, Db4, F4)
        [155.56, 233.08, 311.13, 392.00], // Eb13 (Eb3, Bb3, Eb4, G4)
        [130.81, 196.00, 246.94, 329.63]  // C7#9 (C3, G3, B3, E4)
      ];
      const bassNotes = [87.31, 116.54, 77.78, 65.41]; // F, Bb, Eb, C

      const chordIdx = this.musicStep % chords.length;
      const chord = chords[chordIdx];
      const bass = bassNotes[chordIdx];

      // Warm Acoustic Upright Bass
      this.playSynthVoice(bass, t, 2.6, 'triangle', 0.24, 450);

      // Smooth Velvet Fender Rhodes Chords
      chord.forEach((freq, idx) => {
        this.playSynthVoice(freq, t + idx * 0.12, 2.4, 'sine', 0.14, 1400);
        this.playSynthVoice(freq * 1.003, t + idx * 0.12, 2.4, 'triangle', 0.08, 1200);
      });

      // Subtle Jazzy Finger Snap on the backbeat
      if (this.musicStep % 2 === 1) {
        this.playFingerSnap(t + 1.5);
      }

    } else if (this.theme === 'trading_desk') {
      // 📊 2. TRADING FLOOR: WALL STREET CYBER AMBIENT (Lush Rhodes Pads & Deep Sub-Bass)
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

      // Deep Warm Sub-Bass Pulse
      this.playSynthVoice(bass, t, 2.8, 'sine', 0.22, 260);

      // Lush Analog Rhodes Pad Chords
      pad.forEach((freq, idx) => {
        this.playSynthVoice(freq, t + idx * 0.14, 2.6, 'triangle', 0.12, 950);
        this.playSynthVoice(freq * 1.002, t + idx * 0.14, 2.6, 'sine', 0.10, 1100);
      });

      // Subtle Liquid Glass Arpeggio
      if (this.musicStep % 2 === 0) {
        this.playSynthVoice(pad[3] * 1.5, t + 1.2, 1.4, 'sine', 0.08, 1400);
      }

      // Charming Cash Register "Cha-Ching" on 4th bar turnaround
      if (this.musicStep % 4 === 3) {
        this.playChaChing(t + 2.4);
      }

    } else if (this.theme === 'hotel_lobby') {
      // 🛎️ 3. HOTEL ROOM: ART DECO CONTINENTAL SALON (3/4 Elegant Velvet Waltz)
      nextBarDelay = 3200;
      const chords = [
        [196.00, 246.94, 293.66, 369.99], // Gmaj7
        [123.47, 185.00, 220.00, 277.18], // Bm7
        [130.81, 164.81, 196.00, 246.94], // Cmaj7
        [146.83, 220.00, 277.18, 329.63]  // D7
      ];
      const bassNotes = [98.00, 123.47, 130.81, 146.83];

      const idx = this.musicStep % chords.length;
      this.playSynthVoice(bassNotes[idx], t, 2.6, 'sine', 0.22, 400);

      // Elegant Waltz Cadence
      chords[idx].forEach((f, cIdx) => {
        this.playPizzicatoPluck(f, t + 0.3 + cIdx * 0.02, 0.10);
        this.playPizzicatoPluck(f, t + 1.2 + cIdx * 0.02, 0.09);
      });

      // Subtle Champagne Bubble on 2nd measure
      if (this.musicStep % 2 === 1) {
        this.playChampagnePop(t + 2.2);
      }

    } else if (this.theme === 'bank_vault') {
      // 🔒 4. CASH VAULT: SUBTERRANEAN HEIST SOUNDSCAPE (Deep Velvet Sub & Rhodes Chords)
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

      // Velvet Sub Bass
      this.playSynthVoice(bass, t, 2.8, 'triangle', 0.24, 280);

      // Rhodes Heist Chords
      chord.forEach((freq, cIdx) => {
        this.playSynthVoice(freq, t + 0.2 + (cIdx * 0.14), 2.2, 'sine', 0.14, 850);
      });

      // Subtle Safe Combination Tumbler click
      if (this.musicStep % 2 === 0) {
        this.playVaultTumbler(t + 1.6);
      }

    } else {
      // 🎯 5. BLACK OPS: STEALTH COVERT AMBIENCE (Deep Drone & Espionage Pad Swell)
      nextBarDelay = 3200;
      const chords = [
        [146.83, 174.61, 220.00, 293.66], // Dm7
        [116.54, 174.61, 233.08, 293.66], // Bbmaj7
        [98.00, 146.83, 196.00, 293.66],  // Gm7
        [110.00, 164.81, 220.00, 277.18]  // A7alt
      ];
      const bassNotes = [73.42, 58.27, 49.00, 55.00];

      const idx = this.musicStep % chords.length;
      const chord = chords[idx];
      const bass = bassNotes[idx];

      // Stealth Sub Bass
      this.playSynthVoice(bass, t, 2.8, 'sawtooth', 0.20, 320);

      // Cinematic Espionage Swell Chords
      chord.forEach((freq, cIdx) => {
        this.playSynthVoice(freq, t + 0.1 + (cIdx * 0.12), 2.4, 'triangle', 0.12, 900);
      });

      // Covert Sonar Radar Ping
      if (this.musicStep % 2 === 0) {
        this.playSonarPing(t + 1.4);
      }
    }

    this.musicStep++;

    this.musicTimer = setTimeout(() => {
      this.scheduleMusicBar();
    }, nextBarDelay);
  }

  /* ==========================================================================
     SOPHISTICATED INSTRUMENT & AMUSING GIMMICK SYNTHESIS
     ========================================================================== */

  /* 💰 Cash Register "Cha-Ching" (Trading Floor) */
  playChaChing(t) {
    if (!this.ctx || this.isMuted) return;
    try {
      const actualT = Math.max(this.ctx.currentTime, t);
      [2093.00, 2637.02, 3135.96].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, actualT + idx * 0.04);
        gain.gain.setValueAtTime(0.12, actualT + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, actualT + idx * 0.04 + 0.6);
        osc.connect(gain);
        gain.connect(this.spatialDelay);
        gain.connect(this.masterFilter);
        osc.start(actualT + idx * 0.04);
        osc.stop(actualT + idx * 0.04 + 0.6);

        this.musicActiveNodes.push(osc);
        setTimeout(() => {
          const i = this.musicActiveNodes.indexOf(osc);
          if (i > -1) this.musicActiveNodes.splice(i, 1);
        }, 700);
      });
    } catch (e) {}
  }

  /* 🤌 Jazzy Finger Snap (Poker Arena) */
  playFingerSnap(t) {
    if (!this.ctx || this.isMuted) return;
    try {
      const actualT = Math.max(this.ctx.currentTime, t);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1600, actualT);
      osc.frequency.exponentialRampToValueAtTime(350, actualT + 0.035);
      gain.gain.setValueAtTime(0.15, actualT);
      gain.gain.exponentialRampToValueAtTime(0.001, actualT + 0.035);
      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(actualT);
      osc.stop(actualT + 0.035);
    } catch (e) {}
  }

  /* 🎻 Bouncy Pizzicato String Pluck (Hotel Room) */
  playPizzicatoPluck(freq, t, gainVal = 0.12) {
    if (!this.ctx || this.isMuted) return;
    try {
      const actualT = Math.max(this.ctx.currentTime, t);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, actualT);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, actualT);
      filter.frequency.exponentialRampToValueAtTime(400, actualT + 0.22);

      gain.gain.setValueAtTime(gainVal, actualT);
      gain.gain.exponentialRampToValueAtTime(0.0001, actualT + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicMasterGain);

      osc.start(actualT);
      osc.stop(actualT + 0.22);

      this.musicActiveNodes.push(osc);
      setTimeout(() => {
        const i = this.musicActiveNodes.indexOf(osc);
        if (i > -1) this.musicActiveNodes.splice(i, 1);
      }, 350);
    } catch (e) {}
  }

  /* 🍾 Champagne Cork Pop (Hotel Room) */
  playChampagnePop(t) {
    if (!this.ctx || this.isMuted) return;
    try {
      const actualT = Math.max(this.ctx.currentTime, t);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, actualT);
      osc.frequency.exponentialRampToValueAtTime(90, actualT + 0.06);
      gain.gain.setValueAtTime(0.18, actualT);
      gain.gain.exponentialRampToValueAtTime(0.001, actualT + 0.06);
      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(actualT);
      osc.stop(actualT + 0.06);
    } catch (e) {}
  }

  /* 🎺 Dramatic Spy Brass Horn Stab (Black Ops) */
  playSpyBrassStab(t, chord) {
    if (!this.ctx || this.isMuted) return;
    try {
      const actualT = Math.max(this.ctx.currentTime, t);
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, actualT);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, actualT);
        filter.frequency.linearRampToValueAtTime(2400, actualT + 0.08);
        filter.frequency.exponentialRampToValueAtTime(600, actualT + 0.45);

        gain.gain.setValueAtTime(0.001, actualT);
        gain.gain.linearRampToValueAtTime(0.14, actualT + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, actualT + 0.45);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.spatialDelay);
        gain.connect(this.masterFilter);

        osc.start(actualT);
        osc.stop(actualT + 0.45);

        this.musicActiveNodes.push(osc);
        setTimeout(() => {
          const i = this.musicActiveNodes.indexOf(osc);
          if (i > -1) this.musicActiveNodes.splice(i, 1);
        }, 550);
      });
    } catch (e) {}
  }

  /* ==========================================================================
     MATCHUP AMBIENCE ENGINE (THEMATIC BACKGROUND COMMS & GIMMICKS)
     ========================================================================== */

  startMatchupAmbience(themeId) {
    this.stopMatchupAmbience();
    this.ensureContext();
    const currentTheme = themeId || this.theme;

    // Single, super subtle thematic audio cue played once at matchup start
    this.matchupAmbienceTimer = setTimeout(() => {
      if (this.isMuted || !this.ctx) return;

      if (currentTheme === 'trading_desk') {
        this.playTradingPhoneRing();
      } else if (currentTheme === 'poker_tournament') {
        this.playCasinoRotaryPhone();
      } else if (currentTheme === 'hotel_lobby') {
        this.playHotelRotaryRing();
      } else if (currentTheme === 'bank_vault') {
        this.playWalkieTalkieSquelch();
      } else if (currentTheme === 'military_intelligence') {
        this.playRedPhoneHotline();
      }
    }, 750);
  }

  stopMatchupAmbience() {
    if (this.matchupAmbienceTimer) {
      clearTimeout(this.matchupAmbienceTimer);
      this.matchupAmbienceTimer = null;
    }
  }

  /* 📞 1. Trading Desk Phone Ring (Subtle Dual-Tone: 440Hz + 480Hz - Rings Once) */
  playTradingPhoneRing() {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      this.triggerDualToneRing(now, 440, 480, 0.38, 0.035);
    } catch (e) {}
  }

  /* 📞 Phone Pickup Click (Soft & Gentle) */
  playPhonePickup() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.04);
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {}
  }

  /* 🍸 2. Casino VIP Rotary Intercom Ring (Subtle: 600Hz + 750Hz - Rings Once) */
  playCasinoRotaryPhone() {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      this.triggerDualToneRing(now, 600, 750, 0.35, 0.035);
    } catch (e) {}
  }

  /* 🍸 Cocktail Ice Clink (Soft & Mellow) */
  playDrinkClink() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      [2400, 3000].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);
        gain.gain.setValueAtTime(0.03, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(this.spatialDelay);
        gain.connect(this.masterFilter);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.22);
      });
    } catch (e) {}
  }

  /* 🛎️ 3. European Concierge Antique Rotary Bell (Subtle: 580Hz + 880Hz - Rings Once) */
  playHotelRotaryRing() {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      this.triggerDualToneRing(now, 580, 880, 0.38, 0.035);
    } catch (e) {}
  }

  /* 📻 4. Cash Vault Walkie-Talkie Radio Squelch Burst (Soft) */
  playWalkieTalkieSquelch() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1800, t);
      bandpass.Q.setValueAtTime(2.0, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      whiteNoise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.sfxMasterGain);

      whiteNoise.start(t);
      whiteNoise.stop(t + 0.12);
    } catch (e) {}
  }

  /* 🔴 5. Pentagon Emergency Red Phone Dual-Tone (Subtle: 680Hz + 770Hz - Rings Once) */
  playRedPhoneHotline() {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      this.triggerDualToneRing(now, 680, 770, 0.35, 0.035);
    } catch (e) {}
  }

  triggerDualToneRing(startTime, f1, f2, duration, gainVal) {
    const actualT = Math.max(this.ctx.currentTime, startTime);
    
    const masterGain = this.ctx.createGain();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(16, actualT);
    lfoGain.gain.setValueAtTime(0.4, actualT);
    lfo.connect(lfoGain);

    masterGain.gain.setValueAtTime(0.0001, actualT);
    masterGain.gain.linearRampToValueAtTime(gainVal, actualT + 0.03);
    masterGain.gain.setValueAtTime(gainVal, actualT + duration - 0.06);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, actualT + duration);

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(f1, actualT);
    osc2.frequency.setValueAtTime(f2, actualT);

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime((f1 + f2) / 2, actualT);
    bandpass.Q.setValueAtTime(2.2, actualT);

    osc1.connect(bandpass);
    osc2.connect(bandpass);
    bandpass.connect(masterGain);
    masterGain.connect(this.spatialDelay);
    masterGain.connect(this.masterFilter);

    osc1.start(actualT);
    osc2.start(actualT);
    osc1.stop(actualT + duration);
    osc2.stop(actualT + duration);
  }

  /* 📈 Order Fill Chime (Subtle Mellow Accent) */
  playOrderFillChime() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      [1046.50, 1318.51, 1567.98].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);
        gain.gain.setValueAtTime(0.035, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(this.spatialDelay);
        gain.connect(this.masterFilter);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.35);
      });
    } catch (e) {}
  }

  /* ♠️ Clay Poker Chip Shuffle & Clatter (Soft) */
  playPokerChipShuffle() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const count = 5;
      for (let i = 0; i < count; i++) {
        const offset = i * 0.05 + Math.random() * 0.015;
        const freq = 1000 + Math.random() * 400;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + offset);
        osc.frequency.exponentialRampToValueAtTime(260, t + offset + 0.03);
        gain.gain.setValueAtTime(0.05, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.03);
        osc.connect(gain);
        gain.connect(this.sfxMasterGain);
        osc.start(t + offset);
        osc.stop(t + offset + 0.03);
      }
    } catch (e) {}
  }

  /* 🛎️ Hotel Concierge Brass Bell Ding (Super Subtle, Gentle 1760 Hz) */
  playDeskBellDing() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760.00, t);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      osc.connect(gain);
      gain.connect(this.spatialDelay);
      gain.connect(this.masterFilter);
      osc.start(t);
      osc.stop(t + 1.1);
    } catch (e) {}
  }

  /* 🔒 Cash Vault Safe Dial Spin & Tumbler Clicks */
  playVaultDialSpin() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      for (let i = 0; i < 8; i++) {
        const offset = i * 0.045;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200 - i * 12, t + offset);
        gain.gain.setValueAtTime(0.12, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.03);
        osc.connect(gain);
        gain.connect(this.sfxMasterGain);
        osc.start(t + offset);
        osc.stop(t + offset + 0.03);
      }
    } catch (e) {}
  }

  /* 🎯 Black Ops SATCOM Scrambler Chirp */
  playSatcomChirp() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const frequencies = [880, 1320, 990, 1760];
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t + idx * 0.05);
        gain.gain.setValueAtTime(0.08, t + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.045);
        osc.connect(gain);
        gain.connect(this.spatialDelay);
        gain.connect(this.masterFilter);
        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 0.045);
      });
    } catch (e) {}
  }

  /* 🛡️ Downside Hedge Toggle Shimmer Tone */
  playHedgeToggle(isActivating = true) {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      if (isActivating) {
        // Ascending crystal cyber-shimmer chord
        const freqs = [392.00, 587.33, 880.00];
        freqs.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.04);
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(freq * 1.5, t);
          filter.Q.setValueAtTime(4.0, t);
          gain.gain.setValueAtTime(0.06, t + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.04 + 0.32);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.spatialDelay);
          gain.connect(this.masterFilter);
          osc.start(t + idx * 0.04);
          osc.stop(t + idx * 0.04 + 0.32);
        });
      } else {
        // Descending gentle power-down
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, t);
        osc.frequency.exponentialRampToValueAtTime(330, t + 0.18);
        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        osc.connect(gain);
        gain.connect(this.sfxMasterGain);
        osc.start(t);
        osc.stop(t + 0.18);
      }
    } catch (e) {}
  }

  /* 🛡️ Downside Hedge Energy Shield Hostile Deflection */
  playHedgeDeflect() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      // Resonant metallic deflection ring
      const freqs = [1046.50, 1567.98, 2093.00];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.8, t + 0.6);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.75 + idx * 0.1);
        osc.connect(gain);
        gain.connect(this.spatialDelay);
        gain.connect(this.masterFilter);
        osc.start(t);
        osc.stop(t + 0.75 + idx * 0.1);
      });
    } catch (e) {}
  }

  /* ==========================================================================
     CORE SYNTHESIS VOICE GENERATOR
     ========================================================================== */

  playSynthVoice(freq, startTime, duration, type, gainVal, filterFreq = 2200) {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const actualStart = Math.max(now, startTime);
      const attack = Math.min(0.08, duration * 0.15);
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
      gain.gain.setValueAtTime(0.04, actualT);
      gain.gain.exponentialRampToValueAtTime(0.0001, actualT + 0.06);
      osc.connect(gain);
      gain.connect(this.musicMasterGain);
      osc.start(actualT);
      osc.stop(actualT + 0.06);
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

      const cutoff = 600 + tension * 2200;
      this.masterFilter.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.4);

      const targetBpm = Math.floor(65 + tension * 75);
      if (this.currentBpm !== targetBpm) {
        this.accelerateHeartbeat(targetBpm);
      }
    } catch (e) {}
  }

  startHeartbeat(bpm = 65) {
    this.stopHeartbeat();
    this.currentBpm = bpm;

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

  startTensionDrone() {}

  stopTensionDrone() {
    if (this.ctx && this.masterFilter) {
      this.masterFilter.frequency.setTargetAtTime(2200, this.ctx.currentTime, 0.5);
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
    this.ensureContext();
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
    this.ensureContext();
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

  playBallSelect(isSteal = false) {
    this.ensureContext();
    if (isSteal) {
      this.playStealChoice();
    } else {
      this.playSplitChoice();
    }
  }

  playLockDecision(isSteal = false) {
    this.ensureContext();
    this.playClick();
  }

  playSplitChoice() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
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
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
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
    this.ensureContext();
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
    this.ensureContext();
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
    this.ensureContext();
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
    this.ensureContext();
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
    this.ensureContext();
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

  speakHost(text) {
    if (!this.isHostVoiceEnabled || !('speechSynthesis' in window) || !text) return;
    if (this.isMuted) return;

    // STRICT: Voice commentary is active ONLY during live gameplay or showdown reveal
    const gameplay = document.getElementById('screenGameplay');
    const reveal = document.getElementById('screenReveal');
    const isGameActive = (gameplay && !gameplay.classList.contains('hidden')) ||
                         (reveal && !reveal.classList.contains('hidden'));
    if (!isGameActive) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Dynamic, energetic delivery: 1.12x pace & 1.08 pitch for charismatic game show energy
      utterance.rate = 1.12;
      utterance.pitch = 1.08;
      utterance.volume = 0.95;

      const voices = window.speechSynthesis.getVoices();
      // Prioritize natural expressive voices
      const naturalVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Samantha') || v.name.includes('Oliver') || v.name.includes('George') || v.name.includes('Serena')) && v.lang.startsWith('en'));
      const fallbackVoice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US') || v.lang.startsWith('en'));
      
      if (naturalVoice) {
        utterance.voice = naturalVoice;
      } else if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }
}

window.soundEngine = new TensionSoundEngine();
