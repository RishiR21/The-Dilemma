/**
 * App - The Dilemma Master Controller (Robust 4-Theme Interactive Ecosystem)
 * Themes:
 * 1. Poker Tournament (Vegas High Roller)
 * 2. Trading Desk (Wall Street Terminal)
 * 3. Hotel Lobby (Art Deco Grand Continental)
 * 4. Bank / Cash Vault (Armored Titanium Safe)
 */

const THEMES_CONFIG = {
  poker_tournament: {
    id: 'poker_tournament',
    name: 'Poker Tournament',
    icon: '♠️',
    desc: 'High-stakes Vegas heads-up room, emerald green felt, ceramic clay chips.',
    swatches: ['#07150c', '#eab308', '#22c55e', '#ef4444'],
    brandBadge: 'HIGH ROLLER',
    potLabel: 'CHAMPIONSHIP CHIP POT',
    splitLabel: '50% Chop Pot',
    stealLabel: '100% All-In Steal',
    ballSplitText: 'CHOP',
    ballStealText: 'ALL-IN',
    scanLabel: '♠ Read Opponent Tells',
    lockPrompt: '🔒 Lock In Secret Hand Order',
    bluffs: [
      { text: "I'm checking this down. 100% locking in the CHOP.", label: "♠️ '100% Chop Pot'" },
      { text: "If you push all-in to steal, we both bust to $0.", label: "⚠️ 'All-in = $0 Bust'" },
      { text: "I am shoving ALL-IN. Your only EV is to chop.", label: "🃏 'Shoving All-in, take the chop'" },
      { text: "Let's split the bracelet 50/50 and walk with the cash!", label: "🏆 'Split the Bracelet!'" }
    ],
    tickerHtml: `
      <span class="ticker-item neutral">♠ WSOP HEADS-UP TABLE 1</span>
      <span class="ticker-item up">▲ BLINDS: 10,000 / 20,000</span>
      <span class="ticker-item up">▲ CHIP LEADER STACK: $2,500,000</span>
      <span class="ticker-item neutral">◈ TIME BANK: 45 SECONDS</span>
      <span class="ticker-item down">▼ BRACELET BOUNTY: ACTIVE</span>
      <span class="ticker-item up">▲ HAND: SUITED CONNECTORS</span>
      <span class="ticker-item neutral">♠ WSOP HEADS-UP TABLE 1</span>
      <span class="ticker-item up">▲ BLINDS: 10,000 / 20,000</span>
      <span class="ticker-item up">▲ CHIP LEADER STACK: $2,500,000</span>
      <span class="ticker-item neutral">◈ TIME BANK: 45 SECONDS</span>
    `
  },
  trading_desk: {
    id: 'trading_desk',
    name: 'Trading Desk',
    icon: '📊',
    desc: 'Bloomberg executive trading desk, phosphor emerald, cyber cyan telemetry.',
    swatches: ['#06080d', '#00e676', '#38bdf8', '#ff3366'],
    brandBadge: 'TERMINAL V2',
    potLabel: 'CAPITAL POOL LIQUIDITY',
    splitLabel: '50% Syndicate Split',
    stealLabel: '100% Hostile Takeover',
    ballSplitText: 'SPLIT',
    ballStealText: 'STEAL',
    scanLabel: '🔍 Scan Order Flow Risk',
    lockPrompt: '🔒 Lock In Confidential Order',
    bluffs: [
      { text: "I promise on my firm's honor we are locking in SPLIT.", label: "🤝 '100% Syndicate SPLIT'" },
      { text: "If you attempt a hostile steal, we both default to ZERO.", label: "⚠️ 'Hostile steal = $0 Default'" },
      { text: "I am executing a HOSTILE STEAL. You must take the SPLIT.", label: "🏢 'Executing STEAL, take split'" },
      { text: "Let's execute a clean 50/50 institutional merger!", label: "📈 'Clean 50/50 Merger!'" }
    ],
    tickerHtml: `
      <span class="ticker-item up">▲ BTC/USD $98,450 (+4.8%)</span>
      <span class="ticker-item up">▲ S&P 500 5,890 (+1.2%)</span>
      <span class="ticker-item up">▲ NVDA $142.80 (+3.9%)</span>
      <span class="ticker-item neutral">◈ DILEMMA POOL: $10,000,000 TRANCHE</span>
      <span class="ticker-item down">▼ US10Y 4.18% (-0.8%)</span>
      <span class="ticker-item up">▲ ETH/USD $3,820 (+5.1%)</span>
      <span class="ticker-item up">▲ BTC/USD $98,450 (+4.8%)</span>
      <span class="ticker-item up">▲ S&P 500 5,890 (+1.2%)</span>
      <span class="ticker-item neutral">◈ DILEMMA POOL: $10,000,000 TRANCHE</span>
    `
  },
  hotel_lobby: {
    id: 'hotel_lobby',
    name: 'Hotel Lobby',
    icon: '🛎️',
    desc: 'Art Deco Grand Continental, warm champagne brass, private sealed escrow.',
    swatches: ['#0d0b09', '#d4af37', '#10b981', '#e11d48'],
    brandBadge: 'GRAND CONTINENTAL',
    potLabel: 'PRIVATE ESCROW DEPOSIT',
    splitLabel: 'Honor Covenant (50%)',
    stealLabel: 'Seize Escrow (100%)',
    ballSplitText: 'HONOR',
    ballStealText: 'SEIZE',
    scanLabel: '🛎️ Inquire Concierge Intel',
    lockPrompt: '🔒 Seal Wax Escrow Key',
    bluffs: [
      { text: "By the rules of the Continental, I am honoring the 50/50 covenant.", label: "🛎️ 'Honor Covenant'" },
      { text: "If you break sanctuary and steal, the deposit is forfeited to $0.", label: "⚠️ 'Breach = Total Forfeit'" },
      { text: "I intend to claim the full escrow. Surrender with the split.", label: "🗝️ 'Claiming Full Escrow'" },
      { text: "A gentleman's agreement: we divide the deposit equally.", label: "👑 'Gentleman's Agreement'" }
    ],
    tickerHtml: `
      <span class="ticker-item neutral">👑 THE GRAND CONTINENTAL LOBBY</span>
      <span class="ticker-item up">▲ PRESIDENTIAL SUITE: OCCUPIED</span>
      <span class="ticker-item neutral">◈ ESCROW VAULT: SANCTUARY GUARANTEED</span>
      <span class="ticker-item up">▲ CONCIERGE DESK: LEVEL 5 DISCRETION</span>
      <span class="ticker-item down">▼ COVENANT AUDIT: IN PROGRESS</span>
      <span class="ticker-item neutral">👑 THE GRAND CONTINENTAL LOBBY</span>
      <span class="ticker-item up">▲ PRESIDENTIAL SUITE: OCCUPIED</span>
      <span class="ticker-item neutral">◈ ESCROW VAULT: SANCTUARY GUARANTEED</span>
    `
  },
  bank_vault: {
    id: 'bank_vault',
    name: 'Bank / Cash Vault',
    icon: '🔒',
    desc: 'Armored titanium fortress, heavy safe dials, laser grid security.',
    swatches: ['#090a0f', '#f59e0b', '#10b981', '#ef4444'],
    brandBadge: 'SECTOR 9 VAULT',
    potLabel: 'SECURED CASH RESERVE',
    splitLabel: 'Split Cash Reserve (50%)',
    stealLabel: 'Crack & Heist (100%)',
    ballSplitText: 'SPLIT',
    ballStealText: 'HEIST',
    scanLabel: '🚨 Biometric Threat Scan',
    lockPrompt: '🔒 Set Vault Dual-Key Dial',
    bluffs: [
      { text: "Dual-key protocol engaged: locking in safe 50/50 split.", label: "🔒 'Dual-Key Split'" },
      { text: "Tripping the silent alarm with a heist locks us both out at $0.", label: "🚨 'Heist = Alarm Lockdown'" },
      { text: "I have cracked the master cipher. I am executing the HEIST.", label: "💰 'Master Heist Queued'" },
      { text: "Let's disarm the charges and walk out with equal bullion!", label: "⚡ 'Clean Safe Evacuation'" }
    ],
    tickerHtml: `
      <span class="ticker-item neutral">🔒 SWISS ARMORED VAULT SECTOR 9</span>
      <span class="ticker-item up">▲ TIME-LOCK: 45 SECONDS TO SEAL</span>
      <span class="ticker-item up">▲ BULLION RESERVE: $10,000,000 VERIFIED</span>
      <span class="ticker-item down">▼ LASER GRID: ARMED</span>
      <span class="ticker-item neutral">◈ BIOMETRICS: SCANNING DUAL KEYS</span>
      <span class="ticker-item neutral">🔒 SWISS ARMORED VAULT SECTOR 9</span>
      <span class="ticker-item up">▲ TIME-LOCK: 45 SECONDS TO SEAL</span>
      <span class="ticker-item up">▲ BULLION RESERVE: $10,000,000 VERIFIED</span>
    `
  }
};

class TheDilemmaApp {
  constructor() {
    this.currentTheme = localStorage.getItem('dilemma_theme') || 'trading_desk';
    this.currentMode = 'ai';
    this.selectedAI = 'nick';
    this.selectedTier = TOURNAMENT_TIERS[0];
    this.currentStake = 25000;
    
    // State
    this.timerInterval = null;
    this.timeRemaining = 45;
    this.selectedBall = null;
    this.p1Choice = null;
    this.p2Choice = null;
    this.p1Name = 'Your Desk';
    this.p2Name = 'Counterparty';
    this.passPlayStep = 1;
    this.chatHistory = [];
    this.aiDialogueTimer = null;

    // FX Canvas
    this.canvas = document.getElementById('fxCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.isFxRunning = false;

    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupCanvas();
    this.bindEvents();
    this.renderThemeCards();
    this.renderAICards();
    this.renderTiers();
    this.renderAchievements();
    this.renderBallSkins();
    this.applyEquippedSkin();
    this.updateHeaderBankroll();
    this.checkUrlRoomParam();
    this.setup3DTilt();

    // Unlock Web Audio on interaction
    const unlockAudio = () => {
      window.soundEngine.init();
      window.soundEngine.setTheme(this.currentTheme);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
  }

  applyTheme(themeId) {
    if (!THEMES_CONFIG[themeId]) themeId = 'trading_desk';
    this.currentTheme = themeId;
    const config = THEMES_CONFIG[themeId];

    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('dilemma_theme', themeId);
    window.soundEngine.setTheme(themeId);

    // Update dynamic interface elements
    const brandBadge = document.querySelector('.brand-badge');
    if (brandBadge) brandBadge.textContent = config.brandBadge;

    const tickerTrack = document.querySelector('.ticker-track');
    if (tickerTrack) tickerTrack.innerHTML = config.tickerHtml;

    const potLabel = document.querySelector('.stage-pot-label');
    if (potLabel) potLabel.textContent = config.potLabel;

    const ballVisualSplit = document.querySelector('#ballVisualSplit .ball-emblem');
    if (ballVisualSplit) ballVisualSplit.textContent = config.ballSplitText;

    const ballVisualSteal = document.querySelector('#ballVisualSteal .ball-emblem');
    if (ballVisualSteal) ballVisualSteal.textContent = config.ballStealText;

    const splitLabel = document.querySelector('#ballSplit .ball-label');
    if (splitLabel) splitLabel.textContent = config.splitLabel;

    const stealLabel = document.querySelector('#ballSteal .ball-label');
    if (stealLabel) stealLabel.textContent = config.stealLabel;

    const btnScan = document.getElementById('btnRunPolygraph');
    if (btnScan) btnScan.textContent = config.scanLabel;

    const decisionPrompt = document.getElementById('decisionPromptTitle');
    if (decisionPrompt) decisionPrompt.textContent = config.lockPrompt;

    // Update quick bluffs
    const quickBar = document.getElementById('quickBluffBar');
    if (quickBar) {
      quickBar.innerHTML = '';
      config.bluffs.forEach(b => {
        const btn = document.createElement('button');
        btn.className = 'bluff-btn';
        btn.setAttribute('data-bluff', b.text);
        btn.textContent = b.label;
        btn.onclick = () => this.sendPlayerChat(b.text);
        quickBar.appendChild(btn);
      });
    }

    this.applyEquippedSkin();
    this.renderThemeCards();
  }

  renderThemeCards() {
    const grid = document.getElementById('themePickerGrid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.values(THEMES_CONFIG).forEach(t => {
      const isActive = this.currentTheme === t.id;
      const card = document.createElement('div');
      card.className = `theme-card ${isActive ? 'active' : ''}`;
      
      const swatchHtml = t.swatches.map(c => `<div class="theme-swatch" style="background: ${c};"></div>`).join('');

      card.innerHTML = `
        <div class="theme-card-left">
          <div class="theme-icon-symbol">${t.icon}</div>
          <div class="theme-swatches">${swatchHtml}</div>
          <div>
            <div class="theme-title">${t.name} ${isActive ? '✓ (Active)' : ''}</div>
            <div class="theme-desc">${t.desc}</div>
          </div>
        </div>
        <button class="btn btn-secondary" style="font-size: 0.72rem; padding: 5px 10px;">
          ${isActive ? 'Selected' : 'Apply'}
        </button>
      `;

      card.onclick = () => {
        window.soundEngine.playClick();
        this.applyTheme(t.id);
      };

      grid.appendChild(card);
    });
  }

  setupCanvas() {
    const resize = () => {
      this.canvas.width = window.innerWidth * window.devicePixelRatio;
      this.canvas.height = window.innerHeight * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);
  }

  setup3DTilt() {
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      const podium = document.querySelector('.balls-podium');
      if (podium) {
        podium.style.transform = `rotateY(${dx * 7}deg) rotateX(${-dy * 5}deg)`;
      }
    });
  }

  showScreen(screenId) {
    document.querySelectorAll('.view-screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(screenId);
    if (target) target.classList.remove('hidden');
  }

  bindEvents() {
    // Header Navigation
    document.getElementById('btnLogoHome').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.cleanupGameSession();
      this.showScreen('screenMenu');
    });

    document.getElementById('btnSoundToggle').addEventListener('click', (e) => {
      const isMuted = window.soundEngine.toggleMute();
      e.target.textContent = isMuted ? '🔇' : '🔊';
    });

    document.getElementById('btnHostVoiceToggle').addEventListener('click', (e) => {
      const isVoiceOn = window.soundEngine.toggleHostVoice();
      e.target.textContent = isVoiceOn ? '🎙️' : '🔇';
      window.soundEngine.speakHost(isVoiceOn ? 'Host voice telemetry online' : '', true);
    });

    // Theme Modal Toggle
    document.getElementById('btnThemeModal').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.renderThemeCards();
      document.getElementById('themeModal').classList.remove('hidden');
    });

    document.getElementById('btnCloseTheme').addEventListener('click', () => {
      window.soundEngine.playClick();
      document.getElementById('themeModal').classList.add('hidden');
    });

    // Profile & Help Modals
    document.getElementById('btnProfileModal').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.openProfileModal();
    });

    document.getElementById('btnCloseProfile').addEventListener('click', () => {
      window.soundEngine.playClick();
      document.getElementById('profileModal').classList.add('hidden');
    });

    document.getElementById('btnHelpModal').addEventListener('click', () => {
      window.soundEngine.playClick();
      document.getElementById('helpModal').classList.remove('hidden');
    });

    document.getElementById('btnCloseHelp').addEventListener('click', () => {
      window.soundEngine.playClick();
      document.getElementById('helpModal').classList.add('hidden');
    });

    document.getElementById('btnResetCareer').addEventListener('click', () => {
      if (confirm('Reset fund portfolio NAV balance sheet and all trading certifications?')) {
        window.gameMatrix.resetStats();
        this.updateHeaderBankroll();
        this.openProfileModal();
      }
    });

    // Polygraph / Read Tells Scan
    document.getElementById('btnRunPolygraph').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.handlePolygraphScan();
    });

    // Menu Mode Cards
    document.getElementById('btnModeAI').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.currentMode = 'ai';
      this.showScreen('screenAIGauntlet');
    });

    document.getElementById('btnModeMultiplayer').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.currentMode = 'multiplayer';
      this.showScreen('screenLobby');
      this.setupLobbyTabs();
    });

    document.getElementById('btnModePassPlay').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.currentMode = 'pass_play';
      this.currentStake = 100000;
      this.startPassAndPlay();
    });

    document.getElementById('btnModeLadder').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.currentMode = 'ladder';
      this.showScreen('screenTierSelect');
    });

    // Back Buttons
    document.getElementById('btnBackFromAI').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.showScreen('screenMenu');
    });

    document.getElementById('btnBackFromTiers').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.showScreen('screenMenu');
    });

    document.getElementById('btnBackFromLobby').addEventListener('click', () => {
      window.soundEngine.playClick();
      window.multiplayerEngine.leaveRoom();
      this.showScreen('screenMenu');
    });

    // AI Game Start
    document.getElementById('btnStartAIGame').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.currentStake = 25000;
      this.startAIGameplay();
    });

    // Ladder Tier Confirmation
    document.getElementById('btnConfirmTier').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.currentStake = this.selectedTier.stake;
      const aiList = ['sarah', 'damian', 'jax', 'nash', 'nick'];
      const randomAI = aiList[Math.floor(Math.random() * aiList.length)];
      this.selectedAI = randomAI;
      this.startAIGameplay();
    });

    // Capsule Order Selection
    const ballSplit = document.getElementById('ballSplit');
    const ballSteal = document.getElementById('ballSteal');
    const btnLock = document.getElementById('btnLockChoice');

    ballSplit.addEventListener('mouseenter', () => window.soundEngine.playBallHover());
    ballSteal.addEventListener('mouseenter', () => window.soundEngine.playBallHover());

    ballSplit.addEventListener('click', () => {
      this.selectedBall = 'SPLIT';
      ballSplit.classList.add('selected');
      ballSteal.classList.remove('selected');
      btnLock.disabled = false;
      window.soundEngine.playBallSelect(false);
    });

    ballSteal.addEventListener('click', () => {
      this.selectedBall = 'STEAL';
      ballSteal.classList.add('selected');
      ballSplit.classList.remove('selected');
      btnLock.disabled = false;
      window.soundEngine.playBallSelect(true);
    });

    btnLock.addEventListener('click', () => {
      window.soundEngine.playClick();
      this.handleLockChoice();
    });

    document.getElementById('btnSendChat').addEventListener('click', () => {
      this.handleChatSubmit();
    });

    document.getElementById('chatInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleChatSubmit();
      }
    });

    // Pass & Play Privacy Button
    document.getElementById('btnPrivacyReveal').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.showScreen('screenGameplay');
    });

    // Outcome Card Buttons
    document.getElementById('btnReturnHome').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.cleanupGameSession();
      this.showScreen('screenMenu');
    });

    document.getElementById('btnPlayNextRound').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.cleanupGameSession();
      if (this.currentMode === 'ai') {
        this.startAIGameplay();
      } else if (this.currentMode === 'ladder') {
        this.showScreen('screenTierSelect');
      } else if (this.currentMode === 'pass_play') {
        this.startPassAndPlay();
      } else if (this.currentMode === 'multiplayer') {
        this.showScreen('screenLobby');
      }
    });

    // Double Conviction Rematch
    document.getElementById('btnDoubleDownRevenge').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.cleanupGameSession();
      this.currentStake *= 2;
      window.soundEngine.speakHost(`Double stakes rematch! $${this.currentStake.toLocaleString()} in play!`, true);
      this.startAIGameplay();
    });

    this.setupMultiplayerListeners();
  }

  handlePolygraphScan() {
    const reading = document.getElementById('polygraphReading');
    reading.innerHTML = '<span style="color: var(--primary-accent);">Analyzing counterparty cadence & stress indicators...</span>';

    setTimeout(() => {
      const scan = window.gameMatrix.runPolygraphScan(this.selectedAI, this.timeRemaining, this.chatHistory.length);
      const color = scan.deceptionProbability > 60 ? '#f87171' : scan.deceptionProbability < 35 ? '#34d399' : '#fbbf24';
      reading.innerHTML = `
        <strong style="color: ${color};">${scan.deceptionProbability}% Deception Probability</strong> (${scan.stressLevel}) - <em>${scan.tellNote}</em>
      `;
      window.soundEngine.playCountdownTick(2);
    }, 700);
  }

  renderBallSkins() {
    const shelf = document.getElementById('ballSkinsShelf');
    if (!shelf) return;
    shelf.innerHTML = '';

    window.gameMatrix.skins.forEach(skin => {
      const isUnlocked = window.gameMatrix.stats.unlockedSkins.includes(skin.id);
      const isEquipped = window.gameMatrix.stats.equippedSkin === skin.id;

      const card = document.createElement('div');
      card.className = `skin-card ${isEquipped ? 'equipped' : ''}`;
      card.innerHTML = `
        <div class="skin-preview-ball" style="background: ${skin.splitStyle};"></div>
        <div class="skin-name">${skin.name}</div>
        <div class="skin-status">${isEquipped ? 'EQUIPPED' : isUnlocked ? 'Owned' : `$${skin.price.toLocaleString()}`}</div>
      `;

      card.onclick = () => {
        window.soundEngine.playClick();
        if (isUnlocked) {
          window.gameMatrix.equipSkin(skin.id);
          this.applyEquippedSkin();
          this.renderBallSkins();
        } else {
          if (window.gameMatrix.unlockSkin(skin.id)) {
            this.applyEquippedSkin();
            this.updateHeaderBankroll();
            this.renderBallSkins();
            alert(`Unlocked and equipped ${skin.name}!`);
          } else {
            alert(`Insufficient funds. Need $${skin.price.toLocaleString()}.`);
          }
        }
      };

      shelf.appendChild(card);
    });
  }

  applyEquippedSkin() {
    const skin = window.gameMatrix.getEquippedSkin();
    const splitVisual = document.getElementById('ballVisualSplit');
    const stealVisual = document.getElementById('ballVisualSteal');
    if (splitVisual) splitVisual.style.background = skin.splitStyle;
    if (stealVisual) stealVisual.style.background = skin.stealStyle;
  }

  setupMultiplayerListeners() {
    window.multiplayerEngine.on('onRoomCreated', (data) => {
      document.getElementById('displayRoomCode').textContent = data.roomCode;
      document.getElementById('hostStatusMsg').textContent = 'Awaiting counterparty connection...';
    });

    window.multiplayerEngine.on('onPlayerJoined', (opponent) => {
      window.soundEngine.playClick();
      document.getElementById('hostStatusMsg').textContent = `✅ Counterparty [${opponent.name}] connected!`;
      document.getElementById('btnHostStartMatch').classList.remove('hidden');
      
      if (!window.multiplayerEngine.isHost) {
        this.p1Name = window.multiplayerEngine.playerName;
        this.p2Name = opponent.name;
        this.startMultiplayerMatch(45);
      }
    });

    window.multiplayerEngine.on('onGameStart', () => {
      this.p1Name = window.multiplayerEngine.playerName;
      this.p2Name = window.multiplayerEngine.opponent ? window.multiplayerEngine.opponent.name : 'Counterparty';
      this.startMultiplayerMatch(45);
    });

    window.multiplayerEngine.on('onChatMessage', (msg) => {
      const isMe = msg.senderId === window.multiplayerEngine.playerId;
      this.appendChat(msg.senderName, msg.text, !isMe);
    });

    window.multiplayerEngine.on('onOpponentLocked', (data) => {
      this.p2Choice = data.choice;
      this.appendChat('SYSTEM', `${data.opponentName} decision locked in secret 🔒`, false);
      
      if (this.p1Choice) {
        this.triggerRevealSequence(this.p1Choice, this.p2Choice);
      }
    });
  }

  setupLobbyTabs() {
    const tabHost = document.getElementById('tabHostRoom');
    const tabJoin = document.getElementById('tabJoinRoom');
    const hostSec = document.getElementById('hostSection');
    const joinSec = document.getElementById('joinSection');

    tabHost.classList.add('btn-primary');
    tabHost.classList.remove('btn-secondary');
    tabJoin.classList.remove('btn-primary');
    tabJoin.classList.add('btn-secondary');

    hostSec.classList.remove('hidden');
    joinSec.classList.add('hidden');

    const code = window.multiplayerEngine.createRoom(100000);
    document.getElementById('displayRoomCode').textContent = code;

    tabHost.onclick = () => {
      window.soundEngine.playClick();
      tabHost.classList.add('btn-primary');
      tabHost.classList.remove('btn-secondary');
      tabJoin.classList.remove('btn-primary');
      tabJoin.classList.add('btn-secondary');
      hostSec.classList.remove('hidden');
      joinSec.classList.add('hidden');
    };

    tabJoin.onclick = () => {
      window.soundEngine.playClick();
      tabJoin.classList.add('btn-primary');
      tabJoin.classList.remove('btn-secondary');
      tabHost.classList.remove('btn-primary');
      tabHost.classList.add('btn-secondary');
      joinSec.classList.remove('hidden');
      hostSec.classList.add('hidden');
    };

    document.getElementById('btnCopyRoomLink').onclick = () => {
      const url = `${window.location.origin}${window.location.pathname}?room=${window.multiplayerEngine.roomCode}`;
      navigator.clipboard.writeText(url).then(() => {
        window.soundEngine.playClick();
        alert(`Encrypted Deal Link copied to clipboard:\n${url}`);
      }).catch(() => {
        prompt('Copy deal link:', url);
      });
    };

    document.getElementById('btnSubmitJoin').onclick = () => {
      const input = document.getElementById('inputJoinCode');
      const val = input.value.trim().toUpperCase();
      if (val.length < 4) {
        alert('Please enter a valid 6-letter deal code');
        return;
      }
      window.soundEngine.playClick();
      window.multiplayerEngine.joinRoom(val);
      this.p1Name = window.multiplayerEngine.playerName;
      this.p2Name = 'Host';
      this.startMultiplayerMatch(45);
    };

    document.getElementById('btnHostStartMatch').onclick = () => {
      window.soundEngine.playClick();
      window.multiplayerEngine.startMatch();
    };
  }

  checkUrlRoomParam() {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (room) {
      this.currentMode = 'multiplayer';
      this.showScreen('screenLobby');
      this.setupLobbyTabs();
      const tabJoin = document.getElementById('tabJoinRoom');
      tabJoin.click();
      document.getElementById('inputJoinCode').value = room;
    }
  }

  renderAICards() {
    const list = document.getElementById('aiCardList');
    list.innerHTML = '';
    const allAI = window.aiEngine.getAllPersonalities();

    allAI.forEach(ai => {
      const card = document.createElement('div');
      card.className = `ai-card ${ai.id === this.selectedAI ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="ai-card-header">
          <div class="ai-avatar">${ai.avatar}</div>
          <div class="ai-info">
            <h3>${ai.name}</h3>
            <div class="ai-subtitle">${ai.title}</div>
          </div>
        </div>
        <p class="ai-quote">${ai.quote}</p>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px;">${ai.bio}</p>
        <div class="ai-meta">
          <span>Profile: <strong>${ai.difficulty}</strong></span>
          <span>Strategy: <strong>${ai.tactics}</strong></span>
        </div>
      `;

      card.addEventListener('click', () => {
        window.soundEngine.playClick();
        document.querySelectorAll('.ai-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedAI = ai.id;
      });

      list.appendChild(card);
    });
  }

  renderTiers() {
    const container = document.getElementById('tierListContainer');
    container.innerHTML = '';

    TOURNAMENT_TIERS.forEach(tier => {
      const isLocked = window.gameMatrix.stats.bankroll < tier.minBankroll;
      const isSelected = tier.id === this.selectedTier.id;

      const item = document.createElement('div');
      item.className = `tier-item ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`;
      item.innerHTML = `
        <div class="tier-left">
          <div class="tier-icon">${tier.icon}</div>
          <div>
            <div class="tier-title">${tier.name} ${isLocked ? '🔒' : ''}</div>
            <div class="tier-desc">${tier.description}</div>
          </div>
        </div>
        <div class="tier-stake">$${tier.stake.toLocaleString()}</div>
      `;

      if (!isLocked) {
        item.addEventListener('click', () => {
          window.soundEngine.playClick();
          document.querySelectorAll('.tier-item').forEach(t => t.classList.remove('selected'));
          item.classList.add('selected');
          this.selectedTier = tier;
        });
      }

      container.appendChild(item);
    });
  }

  renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';

    ACHIEVEMENTS.forEach(ach => {
      const isUnlocked = window.gameMatrix.stats.unlockedAchievements.includes(ach.id);
      const badge = document.createElement('div');
      badge.className = `achievement-badge ${isUnlocked ? 'unlocked' : ''}`;
      badge.title = ach.desc;
      badge.innerHTML = `
        <div class="badge-icon">${ach.icon}</div>
        <div class="badge-name">${ach.title}</div>
      `;
      grid.appendChild(badge);
    });
  }

  openProfileModal() {
    const stats = window.gameMatrix.stats;
    const arch = window.gameMatrix.getPlayerArchetype();

    document.getElementById('profileArchetypeIcon').textContent = arch.icon;
    document.getElementById('profileArchetypeTitle').textContent = arch.title;
    document.getElementById('profileArchetypeTitle').style.color = arch.color;

    document.getElementById('statTotalWon').textContent = `$${stats.totalWon.toLocaleString()}`;
    document.getElementById('statTrustScore').textContent = `${window.gameMatrix.getTrustScore()}%`;
    document.getElementById('statMatches').textContent = stats.matchesPlayed;
    document.getElementById('statHeists').textContent = stats.successfulHeists;

    this.renderBallSkins();
    this.renderAchievements();
    document.getElementById('profileModal').classList.remove('hidden');
  }

  updateHeaderBankroll() {
    const roll = window.gameMatrix.stats.bankroll;
    document.getElementById('bankrollValue').textContent = `$${roll.toLocaleString()}`;
  }

  /* ==========================================================================
     GAMEPLAY FLOW
     ========================================================================== */

  startAIGameplay() {
    const ai = window.aiEngine.getPersonality(this.selectedAI);
    this.p1Name = 'You';
    this.p2Name = ai.name;
    this.p1Choice = null;
    this.p2Choice = null;
    this.selectedBall = null;
    this.chatHistory = [];

    document.getElementById('p1Avatar').textContent = '💼';
    document.getElementById('p1Name').textContent = 'You';
    document.getElementById('p1Trust').textContent = `Trust Rating: ${window.gameMatrix.getTrustScore()}%`;

    document.getElementById('p2Avatar').textContent = ai.avatar;
    document.getElementById('p2Name').textContent = ai.name;
    document.getElementById('p2Trust').textContent = ai.title;

    document.getElementById('gamePotDisplay').textContent = `$${this.currentStake.toLocaleString()}`;
    document.getElementById('negotiationPanel').classList.remove('hidden');
    document.getElementById('quickBluffBar').classList.remove('hidden');
    document.getElementById('chatInputRow').classList.remove('hidden');
    document.getElementById('polygraphReading').textContent = 'Awaiting telemetry scan...';

    this.applyEquippedSkin();
    this.resetBallSelectionUI();
    this.showScreen('screenGameplay');

    window.soundEngine.startTensionDrone();
    window.soundEngine.startHeartbeat(65);

    const config = THEMES_CONFIG[this.currentTheme];
    window.soundEngine.speakHost(`${config.name} active. $${this.currentStake.toLocaleString()} in negotiation with ${ai.name}.`, true);

    this.appendChat(ai.name, ai.initialDialogue, true);

    this.startNegotiationTimer(45, () => {
      this.p2Choice = window.aiEngine.decideOutcome(this.selectedAI, window.gameMatrix.stats, this.chatHistory, this.currentStake);
    });

    this.scheduleAIBanter();
  }

  startPassAndPlay() {
    this.passPlayStep = 1;
    this.p1Choice = null;
    this.p2Choice = null;
    this.selectedBall = null;
    this.chatHistory = [];

    document.getElementById('p1Avatar').textContent = '💼';
    document.getElementById('p1Name').textContent = 'Player 1';
    document.getElementById('p1Trust').textContent = 'Face to Face';

    document.getElementById('p2Avatar').textContent = '🏢';
    document.getElementById('p2Name').textContent = 'Player 2';
    document.getElementById('p2Trust').textContent = 'Face to Face';

    document.getElementById('gamePotDisplay').textContent = `$${this.currentStake.toLocaleString()}`;

    document.getElementById('negotiationPanel').classList.add('hidden');
    document.getElementById('quickBluffBar').classList.add('hidden');
    document.getElementById('chatInputRow').classList.add('hidden');

    this.applyEquippedSkin();
    this.showPassPlayPrivacy(1);
  }

  showPassPlayPrivacy(playerNum) {
    this.passPlayStep = playerNum;
    document.getElementById('privacyPlayerTitle').textContent = `Player ${playerNum}: Secret Decision`;
    document.getElementById('privacyInstruction').textContent = `Pass device to Player ${playerNum}. Ensure Player ${playerNum === 1 ? '2' : '1'} looks away before tapping access!`;
    document.getElementById('decisionPromptTitle').textContent = `Player ${playerNum}: Lock In Secret Decision`;
    this.resetBallSelectionUI();
    this.showScreen('screenPassPlayPrivacy');
  }

  startMultiplayerMatch(duration = 45) {
    this.p1Choice = null;
    this.p2Choice = null;
    this.selectedBall = null;
    this.chatHistory = [];

    document.getElementById('p1Avatar').textContent = '💼';
    document.getElementById('p1Name').textContent = this.p1Name;
    document.getElementById('p1Trust').textContent = `Trust: ${window.gameMatrix.getTrustScore()}%`;

    document.getElementById('p2Avatar').textContent = '🌐';
    document.getElementById('p2Name').textContent = this.p2Name;
    document.getElementById('p2Trust').textContent = 'Live Counterparty';

    document.getElementById('gamePotDisplay').textContent = `$${this.currentStake.toLocaleString()}`;
    document.getElementById('negotiationPanel').classList.remove('hidden');
    document.getElementById('quickBluffBar').classList.remove('hidden');
    document.getElementById('chatInputRow').classList.remove('hidden');

    this.applyEquippedSkin();
    this.resetBallSelectionUI();
    this.showScreen('screenGameplay');

    window.soundEngine.startTensionDrone();
    window.soundEngine.startHeartbeat(70);
    window.soundEngine.speakHost(`Live room connected. 45 seconds to reveal.`, true);

    this.startNegotiationTimer(duration, () => {});
  }

  startNegotiationTimer(seconds, onTimeUp) {
    clearInterval(this.timerInterval);
    this.timeRemaining = seconds;
    const timerElem = document.getElementById('negotiationTimer');
    timerElem.classList.remove('urgent');
    timerElem.textContent = this.timeRemaining;

    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      timerElem.textContent = this.timeRemaining;

      const bpm = 65 + (45 - this.timeRemaining) * 2;
      window.soundEngine.setHeartbeatBpm(bpm);

      if (this.timeRemaining === 10) {
        window.soundEngine.speakHost("Ten seconds remaining! Lock in your choice!");
      }

      if (this.timeRemaining <= 10) {
        timerElem.classList.add('urgent');
        window.soundEngine.playCountdownTick(this.timeRemaining);
      }

      if (this.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        if (onTimeUp) onTimeUp();
        
        if (!this.selectedBall) {
          this.selectedBall = 'SPLIT';
          this.handleLockChoice();
        }
      }
    }, 1000);
  }

  scheduleAIBanter() {
    clearInterval(this.aiDialogueTimer);
    this.aiDialogueTimer = setInterval(() => {
      if (this.timeRemaining <= 3 || this.p1Choice) {
        clearInterval(this.aiDialogueTimer);
        return;
      }
      const text = window.aiEngine.generateNegotiationDialogue(this.selectedAI, this.timeRemaining, this.chatHistory);
      const ai = window.aiEngine.getPersonality(this.selectedAI);
      this.appendChat(ai.name, text, true);
    }, 12000);
  }

  appendChat(author, text, isOpponent) {
    const stream = document.getElementById('chatStream');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isOpponent ? 'opponent' : 'player'}`;
    bubble.innerHTML = `
      <div class="chat-author">${author}</div>
      <div>${text}</div>
    `;
    stream.appendChild(bubble);
    stream.scrollTop = stream.scrollHeight;
  }

  sendPlayerChat(text) {
    if (!text.trim()) return;
    window.soundEngine.playClick();
    this.chatHistory.push(text);

    if (this.currentMode === 'multiplayer') {
      window.multiplayerEngine.sendChat(text);
    } else {
      this.appendChat('You', text, false);

      if (this.currentMode === 'ai') {
        setTimeout(() => {
          const ai = window.aiEngine.getPersonality(this.selectedAI);
          const reply = window.aiEngine.generateNegotiationDialogue(this.selectedAI, this.timeRemaining, this.chatHistory);
          this.appendChat(ai.name, reply, true);
        }, 1200);
      }
    }
  }

  handleChatSubmit() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (text) {
      this.sendPlayerChat(text);
      input.value = '';
    }
  }

  resetBallSelectionUI() {
    this.selectedBall = null;
    document.getElementById('ballSplit').classList.remove('selected');
    document.getElementById('ballSteal').classList.remove('selected');
    document.getElementById('btnLockChoice').disabled = true;
    document.getElementById('btnLockChoice').innerHTML = '🔒 Lock In Secret Decision';
  }

  handleLockChoice() {
    if (!this.selectedBall) return;

    if (this.currentMode === 'pass_play') {
      if (this.passPlayStep === 1) {
        this.p1Choice = this.selectedBall;
        this.showPassPlayPrivacy(2);
      } else {
        this.p2Choice = this.selectedBall;
        this.triggerRevealSequence(this.p1Choice, this.p2Choice);
      }
      return;
    }

    this.p1Choice = this.selectedBall;
    document.getElementById('btnLockChoice').innerHTML = '✅ Decision Locked In Secret';
    document.getElementById('btnLockChoice').disabled = true;

    if (this.currentMode === 'ai') {
      if (!this.p2Choice) {
        this.p2Choice = window.aiEngine.decideOutcome(this.selectedAI, window.gameMatrix.stats, this.chatHistory, this.currentStake);
      }
      setTimeout(() => {
        this.triggerRevealSequence(this.p1Choice, this.p2Choice);
      }, 1000);
    } else if (this.currentMode === 'multiplayer') {
      window.multiplayerEngine.lockChoice(this.p1Choice);
      if (this.p2Choice) {
        this.triggerRevealSequence(this.p1Choice, this.p2Choice);
      }
    }
  }

  /* ==========================================================================
     DRAMATIC REVEAL SEQUENCE
     ========================================================================== */

  triggerRevealSequence(p1, p2) {
    clearInterval(this.timerInterval);
    clearInterval(this.aiDialogueTimer);
    window.soundEngine.stopHeartbeat();
    window.soundEngine.stopTensionDrone();

    this.showScreen('screenReveal');

    const countdown = document.getElementById('revealCountdown');
    const ballP1 = document.getElementById('revealBallP1');
    const ballP2 = document.getElementById('revealBallP2');
    const contentP1 = document.getElementById('revealContentP1');
    const contentP2 = document.getElementById('revealContentP2');
    const outcomeCard = document.getElementById('outcomeCard');

    document.getElementById('revealP1Name').textContent = this.p1Name;
    document.getElementById('revealP2Name').textContent = this.p2Name;

    ballP1.className = 'reveal-ball';
    ballP2.className = 'reveal-ball';
    contentP1.textContent = '';
    contentP2.textContent = '';
    outcomeCard.classList.add('hidden');

    const skin = window.gameMatrix.getEquippedSkin();
    ballP1.style.background = skin.splitStyle;
    ballP2.style.background = skin.splitStyle;

    let count = 3;
    countdown.textContent = `REVEAL IN ${count}...`;
    window.soundEngine.playCountdownTick(count);
    window.soundEngine.speakHost("Three, two, one, reveal!");

    const revealTimer = setInterval(() => {
      count--;
      if (count > 0) {
        countdown.textContent = `REVEAL IN ${count}...`;
        window.soundEngine.playCountdownTick(count);
      } else {
        clearInterval(revealTimer);
        countdown.textContent = 'REVEALED!';
        
        window.soundEngine.playRevealSting();

        const config = THEMES_CONFIG[this.currentTheme];

        setTimeout(() => {
          ballP1.classList.add('opened', p1 === 'SPLIT' ? 'is-split' : 'is-steal');
          contentP1.textContent = p1 === 'SPLIT' ? config.ballSplitText : config.ballStealText;

          ballP2.classList.add('opened', p2 === 'SPLIT' ? 'is-split' : 'is-steal');
          contentP2.textContent = p2 === 'SPLIT' ? config.ballSplitText : config.ballStealText;

          setTimeout(() => {
            this.concludeMatchOutcome(p1, p2);
          }, 800);
        }, 500);
      }
    }, 1000);
  }

  concludeMatchOutcome(p1, p2) {
    const outcome = window.gameMatrix.recordMatch(
      p1, 
      p2, 
      this.currentStake, 
      this.p2Name, 
      this.currentMode
    );

    if (this.currentMode === 'ai') {
      window.aiEngine.recordMatchResult(this.selectedAI, p1, p2);
    }

    this.updateHeaderBankroll();

    const card = document.getElementById('outcomeCard');
    const headline = document.getElementById('outcomeHeadline');
    const narrative = document.getElementById('outcomeNarrative');
    const p1Payout = document.getElementById('payoutValP1');
    const p2Payout = document.getElementById('payoutValP2');

    headline.textContent = outcome.headline;
    headline.className = `outcome-headline ${outcome.outcomeType.toLowerCase().replace('_', '-')}`;
    narrative.textContent = outcome.narrative;
    p1Payout.textContent = `$${outcome.p1Amount.toLocaleString()}`;
    p2Payout.textContent = `$${outcome.p2Amount.toLocaleString()}`;

    card.classList.remove('hidden');

    if (outcome.outcomeType === 'SPLIT_SPLIT') {
      window.soundEngine.playSplitVictory();
      window.soundEngine.speakHost(`Both sides split! $${outcome.p1Amount.toLocaleString()} awarded to each!`);
      this.spawnConfetti(['#00e676', '#38bdf8', '#ffffff', '#eab308'], 150);
    } else if (outcome.outcomeType === 'P1_STEALS') {
      window.soundEngine.playStealHeist(true);
      window.soundEngine.speakHost(`Total steal! You take the entire $${outcome.totalJackpot.toLocaleString()} pot!`);
      this.spawnConfetti(['#eab308', '#38bdf8', '#ffffff', '#f59e0b'], 180);
    } else if (outcome.outcomeType === 'P2_STEALS') {
      window.soundEngine.playStealHeist(false);
      window.soundEngine.speakHost(`Betrayal! ${this.p2Name} takes the entire pot!`);
    } else {
      window.soundEngine.playMutualDestruction();
      window.soundEngine.speakHost(`Mutual destruction! Both walk away with nothing!`);
    }
  }

  cleanupGameSession() {
    clearInterval(this.timerInterval);
    clearInterval(this.aiDialogueTimer);
    window.soundEngine.stopHeartbeat();
    window.soundEngine.stopTensionDrone();
    this.particles = [];
  }

  spawnConfetti(colors, count = 100) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: w * 0.5 + (Math.random() - 0.5) * 200,
        y: h * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 1.2) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        decay: Math.random() * 0.01 + 0.005
      });
    }

    if (!this.isFxRunning) {
      this.isFxRunning = true;
      this.animateFx();
    }
  }

  animateFx() {
    if (this.particles.length === 0) {
      this.isFxRunning = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > window.innerHeight + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animateFx());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new TheDilemmaApp();
});
