/**
 * GameMatrix - The Dilemma Theme-Adaptive Payoff & Bankroll Engine
 * Real-time buy-in stake deduction on match entry, payout disbursement at showdown,
 * emergency syndicate reloads, and career profile statistics.
 */

const BALL_SKINS = [
  {
    id: 'standard_token',
    name: 'Classic Theme Standard',
    price: 0,
    desc: 'Bespoke hand-crafted style matching the active theme environment.',
    splitStyle: 'var(--split-gradient)',
    stealStyle: 'var(--steal-gradient)'
  },
  {
    id: 'gold_bullion',
    name: '24K Swiss Gold Ingot',
    price: 50000,
    desc: 'Pure 999.9 physical gold with high-luster specular reflection.',
    splitStyle: 'radial-gradient(circle at 35% 30%, #fffbe6 0%, #f7dc6f 25%, #d4af37 60%, #855b11 90%, #3e2804 100%)',
    stealStyle: 'radial-gradient(circle at 35% 30%, #fffbe6 0%, #f7dc6f 25%, #d4af37 60%, #855b11 90%, #3e2804 100%)'
  },
  {
    id: 'titanium_obsidian',
    name: 'Aerospace Matte Obsidian',
    price: 150000,
    desc: 'Brushed matte black titanium with carbon edge accents.',
    splitStyle: 'radial-gradient(circle at 35% 30%, #475569 0%, #1e293b 40%, #0f172a 80%, #020617 100%)',
    stealStyle: 'radial-gradient(circle at 35% 30%, #475569 0%, #1e293b 40%, #0f172a 80%, #020617 100%)'
  },
  {
    id: 'diamond_platinum',
    name: 'Sovereign Diamond Crystal',
    price: 500000,
    desc: 'Faceted diamond crystal matrix with holographic shimmer.',
    splitStyle: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #e0f2fe 30%, #7dd3fc 70%, #0284c7 100%)',
    stealStyle: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #ffe4e6 30%, #fda4af 70%, #e11d48 100%)'
  }
];

const ACHIEVEMENTS = [
  { id: 'first_split', title: 'Syndicate Closed', desc: 'Successfully execute a 50/50 mutual split', icon: '🤝' },
  { id: 'first_steal', title: 'Grand Heist', desc: 'Execute a successful steal and seize 100% of the pot', icon: '💼' },
  { id: 'double_steal', title: 'Mutual Wipeout', desc: 'Both sides attempt to steal, resulting in total $0 default', icon: '💥' },
  { id: 'hedge_master', title: 'Downside Protection', desc: 'Successfully hedge a hostile steal and recover 20% of the jackpot', icon: '🛡️' },
  { id: 'master_saint', title: 'Fiduciary Titan', desc: 'Maintain an 80%+ Trust Rating across 10+ matches', icon: '📈' },
  { id: 'master_thief', title: 'Apex Raider', desc: 'Accumulate over $2,000,000 in successful steals', icon: '🦈' },
  { id: 'millionaire', title: 'Decamillionaire Club', desc: 'Build your career bankroll past $10,000,000', icon: '🏆' },
  { id: 'nick_gambit', title: 'Bully Neutralized', desc: 'Defeat Nick in a high-conviction standoff', icon: '👑' }
];

/**
 * Pure calculation function for the Downside Hedge covered-call mechanic.
 * 
 * - Both Steal: Total wipeout, hedges voided -> Both get $0.
 * - Both Split: Base 50% split. Any hedged player forfeits 10% of their split share (45% of total pool).
 * - Split vs Steal: If splitting player hedged, they secure 20% of the total pool,
 *   and the stealing player's payout is reduced from 100% to 80%.
 */
function calculatePayout(playerAState, playerBState, poolSize) {
  if (poolSize <= 0) return { playerAPayout: 0, playerBPayout: 0 };

  const choiceA = typeof playerAState === 'object' ? playerAState.choice : playerAState;
  const hedgedA = typeof playerAState === 'object' ? Boolean(playerAState.hasHedged) : false;

  const choiceB = typeof playerBState === 'object' ? playerBState.choice : playerBState;
  const hedgedB = typeof playerBState === 'object' ? Boolean(playerBState.hasHedged) : false;

  // 1. Both Steal -> All hedges voided, both receive $0
  if (choiceA === 'STEAL' && choiceB === 'STEAL') {
    return { playerAPayout: 0, playerBPayout: 0 };
  }

  // 2. Both Split -> 50% base payout; hedgers pay 10% premium on their split share
  if (choiceA === 'SPLIT' && choiceB === 'SPLIT') {
    const baseSplit = poolSize * 0.5;
    const hedgedSplit = baseSplit * 0.9; // 10% premium forfeiture
    return {
      playerAPayout: hedgedA ? hedgedSplit : baseSplit,
      playerBPayout: hedgedB ? hedgedSplit : baseSplit
    };
  }

  // 3. Player A Splits & Player B Steals (Hostile Takeover by Player B)
  if (choiceA === 'SPLIT' && choiceB === 'STEAL') {
    if (hedgedA) {
      const protectedFloor = poolSize * 0.20; // 20% guaranteed floor
      return {
        playerAPayout: protectedFloor,
        playerBPayout: poolSize - protectedFloor // Steal reduced to 80%
      };
    }
    return {
      playerAPayout: 0,
      playerBPayout: poolSize
    };
  }

  // 4. Player A Steals & Player B Splits (Hostile Takeover by Player A)
  if (choiceA === 'STEAL' && choiceB === 'SPLIT') {
    if (hedgedB) {
      const protectedFloor = poolSize * 0.20; // 20% guaranteed floor
      return {
        playerAPayout: poolSize - protectedFloor, // Steal reduced to 80%
        playerBPayout: protectedFloor
      };
    }
    return {
      playerAPayout: poolSize,
      playerBPayout: 0
    };
  }

  return { playerAPayout: 0, playerBPayout: 0 };
}

window.calculatePayout = calculatePayout;

class GameMatrix {
  constructor() {
    this.currentTheme = 'poker_tournament';
    this.stats = this.loadStats();
    this.skins = BALL_SKINS;
    this.activeWager = 0;
  }

  generateDefaultUsername(theme = this.currentTheme) {
    const prefixes = {
      poker_tournament: ['ApexShark', 'VegasWhale', 'BluffKing', 'PocketAces', 'FinalTabler', 'GTO_Wizard'],
      trading_desk: ['QuantTrader', 'WallStTitan', 'ArbitrageKing', 'AlphaSeeker', 'BullishRider', 'OrderFlow'],
      hotel_lobby: ['ContinentalVIP', 'GoldConcierge', 'DiplomatElite', 'SuiteHighRoller', 'SterlingGuest'],
      bank_vault: ['VaultBreaker', 'GoldReserve', 'FortressLock', 'TitaniumHeist', 'SafeCracker'],
      military_intelligence: ['CipherAgent', 'BlackOpsLead', 'DEFCON_One', 'GhostOperator', 'StratComLead']
    };
    const list = prefixes[theme] || prefixes.poker_tournament;
    const base = list[Math.floor(Math.random() * list.length)];
    const num = Math.floor(100 + Math.random() * 900);
    return `@${base}_${num}`;
  }

  setTheme(themeId) {
    this.currentTheme = themeId;
  }

  getThemeData() {
    const data = window.THEMES_DATA || {};
    return data[this.currentTheme] || data['poker_tournament'] || Object.values(data)[0];
  }

  getTiers() {
    const themeData = this.getThemeData();
    return themeData.tiers || [];
  }

  loadStats() {
    const defaults = {
      username: this.generateDefaultUsername(),
      pin: null,
      isClaimed: false,
      claimedAt: null,
      bankroll: 50000,
      totalWon: 0,
      totalLost: 0,
      matchesPlayed: 0,
      splitsCount: 0,
      stealsCount: 0,
      successfulHeists: 0,
      betrayedByOpponent: 0,
      mutualDestructions: 0,
      unlockedAchievements: [],
      equippedSkin: 'standard_token',
      unlockedSkins: ['standard_token'],
      history: []
    };

    try {
      const saved = localStorage.getItem('dilemma_game_stats_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.username || !parsed.username.startsWith('@')) {
          parsed.username = this.generateDefaultUsername();
        }
        return { ...defaults, ...parsed };
      }
    } catch (_) {}

    return defaults;
  }

  saveStats() {
    try {
      localStorage.setItem('dilemma_game_stats_v5', JSON.stringify(this.stats));
      if (this.stats.isClaimed && this.stats.pin && this.stats.username) {
        const savedProfiles = this.getSavedProfiles();
        const key = this.stats.username.toLowerCase();
        savedProfiles[key] = {
          username: this.stats.username,
          pin: this.stats.pin,
          updatedAt: new Date().toISOString(),
          stats: JSON.parse(JSON.stringify(this.stats))
        };
        localStorage.setItem('dilemma_saved_profiles', JSON.stringify(savedProfiles));
      }
    } catch (_) {}
  }

  getSavedProfiles() {
    try {
      const raw = localStorage.getItem('dilemma_saved_profiles');
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  }

  formatUsername(raw) {
    if (!raw) return '';
    let clean = raw.trim();
    if (!clean.startsWith('@')) {
      clean = '@' + clean;
    }
    const handleBody = clean.slice(1).replace(/[^a-zA-Z0-9_]/g, '');
    return '@' + handleBody;
  }

  claimProfile(rawUsername, pin) {
    const formatted = this.formatUsername(rawUsername);
    if (!formatted || formatted.length < 3) {
      return { success: false, error: 'Username must be at least 2 characters (e.g. @Ace)' };
    }
    if (formatted.length > 20) {
      return { success: false, error: 'Username cannot exceed 20 characters' };
    }
    if (!/^\d{4}$/.test(pin)) {
      return { success: false, error: 'PIN must be exactly 4 digits (e.g. 1234)' };
    }

    const savedProfiles = this.getSavedProfiles();
    const key = formatted.toLowerCase();
    const existing = savedProfiles[key];

    if (existing && existing.pin !== pin) {
      return {
        success: false,
        error: `Handle ${formatted} is already registered. Enter the matching 4-digit PIN to load or update this profile, or choose a different handle.`
      };
    }

    this.stats.username = formatted;
    this.stats.pin = pin;
    this.stats.isClaimed = true;
    this.stats.claimedAt = new Date().toISOString();
    this.saveStats();

    return {
      success: true,
      username: formatted,
      message: `Profile secured and claimed as ${formatted} with PIN protection!`
    };
  }

  loginProfile(rawUsername, pin) {
    const formatted = this.formatUsername(rawUsername);
    if (!/^\d{4}$/.test(pin)) {
      return { success: false, error: 'PIN must be exactly 4 digits (e.g. 1234)' };
    }

    const savedProfiles = this.getSavedProfiles();
    const key = formatted.toLowerCase();
    const saved = savedProfiles[key];

    if (!saved) {
      return { success: false, error: `No saved profile found for ${formatted}. You can claim this handle to start fresh!` };
    }

    if (saved.pin !== pin) {
      return { success: false, error: `Incorrect 4-digit PIN for ${formatted}.` };
    }

    this.stats = {
      ...this.loadStats(),
      ...saved.stats,
      username: saved.username,
      pin: saved.pin,
      isClaimed: true
    };
    this.saveStats();

    return {
      success: true,
      username: saved.username,
      stats: this.stats,
      message: `Welcome back, ${saved.username}! All career progress restored.`
    };
  }

  /**
   * Immediately deducts the buy-in stake when starting a match
   */
  deductWager(totalPot) {
    const buyIn = totalPot / 2;
    this.activeWager = buyIn;

    // Deduct immediately from bankroll
    this.stats.bankroll = Math.max(0, this.stats.bankroll - buyIn);
    this.saveStats();
    return buyIn;
  }

  /**
   * If player cancels/exits a match before locking choice, refund the active wager
   */
  refundWager() {
    if (this.activeWager > 0) {
      this.stats.bankroll += this.activeWager;
      this.activeWager = 0;
      this.saveStats();
    }
  }

  getEquippedSkin() {
    return this.skins.find(s => s.id === this.stats.equippedSkin) || this.skins[0];
  }

  unlockSkin(skinId) {
    const skin = this.skins.find(s => s.id === skinId);
    if (!skin) return false;
    if (this.stats.bankroll >= skin.price && !this.stats.unlockedSkins.includes(skinId)) {
      this.stats.bankroll -= skin.price;
      this.stats.unlockedSkins.push(skinId);
      this.stats.equippedSkin = skinId;
      this.saveStats();
      return true;
    }
    return false;
  }

  equipSkin(skinId) {
    if (this.stats.unlockedSkins.includes(skinId)) {
      this.stats.equippedSkin = skinId;
      this.saveStats();
      return true;
    }
    return false;
  }

  getTrustScore() {
    if (this.stats.matchesPlayed === 0) return 100;
    return Math.round((this.stats.splitsCount / this.stats.matchesPlayed) * 100);
  }

  getPlayerArchetype() {
    const themeData = this.getThemeData();
    const archs = themeData.archetypes || {};
    const trust = this.getTrustScore();
    const total = this.stats.matchesPlayed;

    if (total < 3) return archs.novice || { title: 'New Challenger', icon: '💼', color: '#94a3b8' };
    if (trust >= 80) return archs.saint || { title: 'Fiduciary Partner', icon: '📈', color: '#22c55e' };
    if (trust <= 25) return archs.thief || { title: 'Ruthless Raider', icon: '🦈', color: '#ef4444' };
    if (this.stats.successfulHeists >= 5) return archs.predator || { title: 'Predatory Strategist', icon: '⚡', color: '#eab308' };
    return archs.balancer || { title: 'Balanced Tactician', icon: '⚖️', color: '#38bdf8' };
  }

  runPolygraphScan(aiId, timeRemaining, chatCount) {
    const ai = window.aiEngine.getPersonality(aiId);
    let deceptionProbability = 50;
    let stressLevel = 'STEADY BASELINE';
    let tellNote = ai.tellNote || 'Normal biometric readings.';

    if (aiId === 'damian') {
      deceptionProbability = Math.floor(78 + Math.random() * 18);
      stressLevel = 'HIGH DECEPTION (PUPILS DILATED / MICRO-SWEAT)';
    } else if (aiId === 'sarah') {
      deceptionProbability = Math.floor(8 + Math.random() * 18);
      stressLevel = 'HONEST BASELINE (CALM & STEADY)';
    } else if (aiId === 'nick') {
      deceptionProbability = Math.floor(48 + Math.random() * 22);
      stressLevel = 'COLD STEEL (HEART RATE 52 BPM)';
    } else if (aiId === 'jax') {
      deceptionProbability = Math.floor(40 + Math.random() * 45);
      stressLevel = 'HIGH VOLATILITY SPIKE';
    } else if (aiId === 'nash') {
      deceptionProbability = Math.floor(42 + Math.random() * 18);
      stressLevel = 'FLATLINE ARBITRAGE';
    }

    return {
      deceptionProbability,
      stressLevel,
      tellNote
    };
  }

  evaluateMatrix(p1, p2, totalJackpot) {
    const p1Choice = typeof p1 === 'object' ? p1.choice : p1;
    const p1Hedged = typeof p1 === 'object' ? Boolean(p1.hasHedged) : false;
    const p2Choice = typeof p2 === 'object' ? p2.choice : p2;
    const p2Hedged = typeof p2 === 'object' ? Boolean(p2.hasHedged) : false;

    const buyIn = totalJackpot / 2;
    const payouts = calculatePayout(
      { choice: p1Choice, hasHedged: p1Hedged },
      { choice: p2Choice, hasHedged: p2Hedged },
      totalJackpot
    );
    const p1Amount = payouts.playerAPayout;
    const p2Amount = payouts.playerBPayout;
    const netGainP1 = p1Amount - buyIn;

    let outcomeType = '';
    let headline = '';
    let narrative = '';
    let hedgeTriggeredP1 = false;
    let hedgeTriggeredP2 = false;

    if (p1Choice === 'SPLIT' && p2Choice === 'SPLIT') {
      outcomeType = 'SPLIT_SPLIT';
      if (p1Hedged && p2Hedged) {
        headline = '50/50 SPLIT (BOTH HEDGED)';
        narrative = `Both sides split and hedged! Each paid a 10% premium ($${(buyIn * 0.1).toLocaleString()}) and received $${p1Amount.toLocaleString()} each.`;
      } else if (p1Hedged) {
        headline = '50/50 SPLIT (YOU HEDGED)';
        narrative = `Both sides split! You paid a 10% hedge premium ($${(buyIn * 0.1).toLocaleString()}) and received $${p1Amount.toLocaleString()}. Opponent received full $${p2Amount.toLocaleString()}.`;
      } else if (p2Hedged) {
        headline = '50/50 SPLIT (OPPONENT HEDGED)';
        narrative = `Both sides split! You received full $${p1Amount.toLocaleString()}. Opponent paid a 10% hedge premium and received $${p2Amount.toLocaleString()}.`;
      } else {
        headline = '50/50 SPLIT FINALIZED!';
        narrative = `Both sides honored the agreement! The $${totalJackpot.toLocaleString()} pool is disbursed equally ($${p1Amount.toLocaleString()} to each side). Your $${buyIn.toLocaleString()} stake is returned.`;
      }
    } else if (p1Choice === 'STEAL' && p2Choice === 'SPLIT') {
      outcomeType = 'P1_STEALS';
      if (p2Hedged) {
        hedgeTriggeredP2 = true;
        headline = 'SOLO STEAL (OPPONENT HEDGED 20% FLOOR)';
        narrative = `You executed a steal, but counterparty had a Downside Hedge active! They recovered their guaranteed 20% floor ($${p2Amount.toLocaleString()}), capping your steal at $${p1Amount.toLocaleString()} (+$${netGainP1.toLocaleString()} profit).`;
      } else {
        headline = 'SOLO STEAL! YOU SEIZE 100%!';
        narrative = `You executed a successful steal while your counterparty honored the split. You win the entire $${totalJackpot.toLocaleString()} pot (+$${netGainP1.toLocaleString()} profit)!`;
      }
    } else if (p1Choice === 'SPLIT' && p2Choice === 'STEAL') {
      outcomeType = 'P2_STEALS';
      if (p1Hedged) {
        hedgeTriggeredP1 = true;
        headline = '🛡️ DOWNSIDE HEDGE EXECUTED! 20% RECOVERED!';
        narrative = `Opponent executed a hostile steal, but your Downside Hedge protected you! You recovered a guaranteed 20% floor ($${p1Amount.toLocaleString()}), reducing opponent's loot to $${p2Amount.toLocaleString()}.`;
      } else {
        headline = 'BETRAYAL! OPPONENT SEIZED THE POT!';
        narrative = `Opponent executed a steal while you offered the split. Opponent took the whole pot, and you lost your $${buyIn.toLocaleString()} stake!`;
      }
    } else {
      outcomeType = 'MUTUAL_STEAL';
      headline = 'MUTUAL DESTRUCTION! BOTH GET $0!';
      narrative = `Both sides attempted to steal simultaneously! All hedges are voided in mutual default: both players forfeit their $${buyIn.toLocaleString()} stakes to $0!`;
    }

    return {
      p1Choice,
      p1Hedged,
      p2Choice,
      p2Hedged,
      p1Amount,
      p2Amount,
      netGainP1,
      buyIn,
      totalJackpot,
      outcomeType,
      headline,
      narrative,
      hedgeTriggeredP1,
      hedgeTriggeredP2
    };
  }

  recordMatch(p1, p2, jackpot, opponentName, mode = 'ai') {
    const outcome = this.evaluateMatrix(p1, p2, jackpot);

    this.stats.matchesPlayed++;
    if (outcome.p1Choice === 'SPLIT') this.stats.splitsCount++;
    if (outcome.p1Choice === 'STEAL') this.stats.stealsCount++;

    // Add gross payout to bankroll (since buy-in was already deducted at match start)
    this.stats.bankroll += outcome.p1Amount;
    this.activeWager = 0; // Cleared

    if (outcome.netGainP1 > 0) {
      this.stats.totalWon += outcome.netGainP1;
    } else if (outcome.netGainP1 < 0) {
      this.stats.totalLost += Math.abs(outcome.netGainP1);
    }

    if (outcome.outcomeType === 'SPLIT_SPLIT') {
      this.checkAchievement('first_split');
    } else if (outcome.outcomeType === 'P1_STEALS') {
      this.stats.successfulHeists++;
      this.checkAchievement('first_steal');
      if (this.stats.totalWon >= 2000000) {
        this.checkAchievement('master_thief');
      }
    } else if (outcome.outcomeType === 'P2_STEALS') {
      this.stats.betrayedByOpponent++;
      if (outcome.hedgeTriggeredP1) {
        this.checkAchievement('hedge_master');
      }
    } else if (outcome.outcomeType === 'MUTUAL_STEAL') {
      this.stats.mutualDestructions++;
      this.checkAchievement('double_steal');
    }

    // Emergency Reload Bailout if Bankroll hits <= $0
    let didBailout = false;
    if (this.stats.bankroll <= 0) {
      this.stats.bankroll = 25000;
      didBailout = true;
    }

    if (this.stats.bankroll >= 10000000) {
      this.checkAchievement('millionaire');
    }

    if (this.stats.matchesPlayed >= 10 && this.getTrustScore() >= 80) {
      this.checkAchievement('master_saint');
    }

    if (opponentName.includes('Nick') && outcome.p1Amount > 0) {
      this.checkAchievement('nick_gambit');
    }

    this.stats.history.unshift({
      date: new Date().toISOString(),
      opponent: opponentName,
      mode,
      jackpot,
      p1Choice: outcome.p1Choice,
      p1Hedged: outcome.p1Hedged,
      p2Choice: outcome.p2Choice,
      p2Hedged: outcome.p2Hedged,
      outcomeType: outcome.outcomeType,
      p1Amount: outcome.p1Amount,
      netGainP1: outcome.netGainP1
    });
    if (this.stats.history.length > 20) this.stats.history.pop();

    this.saveStats();
    outcome.didBailout = didBailout;
    return outcome;
  }

  checkAchievement(id) {
    if (!this.stats.unlockedAchievements.includes(id)) {
      this.stats.unlockedAchievements.push(id);
      this.saveStats();
      return true;
    }
    return false;
  }

  resetStats() {
    localStorage.removeItem('dilemma_game_stats_v5');
    localStorage.removeItem('sos_ai_memory');
    this.stats = this.loadStats();
  }
}

window.gameMatrix = new GameMatrix();
