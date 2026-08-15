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
  { id: 'master_saint', title: 'Fiduciary Titan', desc: 'Maintain an 80%+ Trust Rating across 10+ matches', icon: '📈' },
  { id: 'master_thief', title: 'Apex Raider', desc: 'Accumulate over $2,000,000 in successful steals', icon: '🦈' },
  { id: 'millionaire', title: 'Decamillionaire Club', desc: 'Build your career bankroll past $10,000,000', icon: '🏆' },
  { id: 'nick_gambit', title: 'Bully Neutralized', desc: 'Defeat Nick in a high-conviction standoff', icon: '👑' }
];

class GameMatrix {
  constructor() {
    this.currentTheme = 'poker_tournament';
    this.stats = this.loadStats();
    this.skins = BALL_SKINS;
    this.activeWager = 0;
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
        return { ...defaults, ...JSON.parse(saved) };
      }
    } catch (_) {}

    return defaults;
  }

  saveStats() {
    try {
      localStorage.setItem('dilemma_game_stats_v5', JSON.stringify(this.stats));
    } catch (_) {}
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

  evaluateMatrix(p1Choice, p2Choice, totalJackpot) {
    const buyIn = totalJackpot / 2;
    let outcomeType = '';
    let p1Amount = 0;
    let p2Amount = 0;
    let netGainP1 = 0;
    let narrative = '';
    let headline = '';

    if (p1Choice === 'SPLIT' && p2Choice === 'SPLIT') {
      outcomeType = 'SPLIT_SPLIT';
      p1Amount = totalJackpot / 2;
      p2Amount = totalJackpot / 2;
      netGainP1 = 0; // Broke even, stake returned
      headline = '50/50 SPLIT FINALIZED!';
      narrative = `Both sides honored the agreement! The $${totalJackpot.toLocaleString()} pool is disbursed equally ($${p1Amount.toLocaleString()} to each side). Your $${buyIn.toLocaleString()} stake is returned.`;
    } else if (p1Choice === 'STEAL' && p2Choice === 'SPLIT') {
      outcomeType = 'P1_STEALS';
      p1Amount = totalJackpot;
      p2Amount = 0;
      netGainP1 = buyIn; // Doubled stake
      headline = 'SOLO STEAL! YOU SEIZE 100%!';
      narrative = `You executed a successful steal while your counterparty honored the split. You win the entire $${totalJackpot.toLocaleString()} pot (+$${netGainP1.toLocaleString()} profit)!`;
    } else if (p1Choice === 'SPLIT' && p2Choice === 'STEAL') {
      outcomeType = 'P2_STEALS';
      p1Amount = 0;
      p2Amount = totalJackpot;
      netGainP1 = -buyIn; // Lost entire buy-in stake
      headline = 'BETRAYAL! OPPONENT SEIZED THE POT!';
      narrative = `Opponent executed a steal while you offered the split. Opponent took the whole pot, and you lost your $${buyIn.toLocaleString()} stake!`;
    } else {
      outcomeType = 'MUTUAL_STEAL';
      p1Amount = 0;
      p2Amount = 0;
      netGainP1 = -buyIn; // Lost entire buy-in stake
      headline = 'MUTUAL DESTRUCTION! BOTH GET $0!';
      narrative = `Both sides attempted to steal simultaneously! Total collapse: both players forfeit their $${buyIn.toLocaleString()} stakes to $0!`;
    }

    return {
      p1Choice,
      p2Choice,
      p1Amount,
      p2Amount,
      netGainP1,
      buyIn,
      totalJackpot,
      outcomeType,
      headline,
      narrative
    };
  }

  recordMatch(p1Choice, p2Choice, jackpot, opponentName, mode = 'ai') {
    const outcome = this.evaluateMatrix(p1Choice, p2Choice, jackpot);

    this.stats.matchesPlayed++;
    if (p1Choice === 'SPLIT') this.stats.splitsCount++;
    if (p1Choice === 'STEAL') this.stats.stealsCount++;

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
      p1Choice,
      p2Choice,
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
