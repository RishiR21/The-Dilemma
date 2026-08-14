/**
 * GameMatrix - The Dilemma: Corporate & High-Finance Payoff Engine
 * High-conviction trading tiers, liquidity allocations, keystone skins, and desk statistics.
 */

const TOURNAMENT_TIERS = [
  {
    id: 'tier1',
    name: 'Angel Syndicate Round',
    stake: 25000,
    minBankroll: 0,
    description: 'Seed stage deal room where junior venture partners prove their conviction.',
    icon: '💼'
  },
  {
    id: 'tier2',
    name: 'Series A Venture Tranche',
    stake: 100000,
    minBankroll: 25000,
    description: 'Competitive venture round with high institutional scrutiny.',
    icon: '📊'
  },
  {
    id: 'tier3',
    name: 'Wall Street Trading Floor',
    stake: 500000,
    minBankroll: 150000,
    description: 'High-frequency institutional derivatives block trade.',
    icon: '🏛️'
  },
  {
    id: 'tier4',
    name: 'Sovereign Wealth Allocation',
    stake: 2000000,
    minBankroll: 750000,
    description: 'Eight-figure private wealth mandate with global sovereign funds.',
    icon: '💎'
  },
  {
    id: 'tier5',
    name: 'Hostile Megamerger Acquisition',
    stake: 10000000,
    minBankroll: 2500000,
    description: 'The ultimate $10,000,000 hostile takeover on live financial news.',
    icon: '👑'
  }
];

const BALL_SKINS = [
  {
    id: 'obsidian_titanium',
    name: 'Titanium Obsidian Core',
    price: 0,
    desc: 'Brushed matte black aerospace titanium with gold telemetry.',
    splitStyle: 'radial-gradient(circle at 35% 30%, #475569 0%, #1e293b 40%, #0f172a 80%, #020617 100%)',
    stealStyle: 'radial-gradient(circle at 35% 30%, #475569 0%, #1e293b 40%, #0f172a 80%, #020617 100%)'
  },
  {
    id: 'bloomberg_emerald',
    name: 'Bloomberg Terminal Emerald',
    price: 50000,
    desc: 'Phosphor terminal green with high-frequency order matrix.',
    splitStyle: 'radial-gradient(circle at 35% 30%, #a7f3d0 0%, #10b981 40%, #064e3b 80%, #022c22 100%)',
    stealStyle: 'radial-gradient(circle at 35% 30%, #fca5a5 0%, #dc2626 40%, #7f1d1d 80%, #450a0a 100%)'
  },
  {
    id: 'gold_bullion',
    name: 'Swiss Vault Gold Bullion',
    price: 150000,
    desc: 'Pure 999.9 physical bullion with laser-engraved ledger stamp.',
    splitStyle: 'radial-gradient(circle at 35% 30%, #fffbe6 0%, #f7dc6f 25%, #d4af37 60%, #855b11 90%, #3e2804 100%)',
    stealStyle: 'radial-gradient(circle at 35% 30%, #fffbe6 0%, #f7dc6f 25%, #d4af37 60%, #855b11 90%, #3e2804 100%)'
  },
  {
    id: 'diamond_platinum',
    name: 'Sovereign Diamond Platinum',
    price: 500000,
    desc: 'Ultra-exclusive diamond crystal and polished platinum matrix.',
    splitStyle: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #e0f2fe 30%, #7dd3fc 70%, #0284c7 100%)',
    stealStyle: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #ffe4e6 30%, #fda4af 70%, #e11d48 100%)'
  }
];

const ACHIEVEMENTS = [
  { id: 'first_split', title: 'Syndicate Closed', desc: 'Successfully execute a 50/50 equity syndicate', icon: '🤝' },
  { id: 'first_steal', title: 'Hostile Takeover', desc: 'Execute a hostile liquidation and seize 100% of the capital pool', icon: '💼' },
  { id: 'double_steal', title: 'Total Default Collapse', desc: 'Both counterparties defect and trigger a $0 mutual default', icon: '💥' },
  { id: 'master_saint', title: 'Fiduciary Titan', desc: 'Maintain an 85%+ Fiduciary Trust Rating across 10+ transactions', icon: '📈' },
  { id: 'master_thief', title: 'Apex Corporate Raider', desc: 'Liquidate and seize over $2,000,000 in hostile acquisitions', icon: '🦈' },
  { id: 'millionaire', title: 'Decamillionaire Fund', desc: 'Build your fund balance sheet past $10,000,000', icon: '🏆' },
  { id: 'nick_gambit', title: 'The Raider Gambit', desc: 'Outmaneuver Nick Corrigan in a high-conviction standoff', icon: '🏢' }
];

class GameMatrix {
  constructor() {
    this.stats = this.loadStats();
    this.skins = BALL_SKINS;
  }

  loadStats() {
    const defaults = {
      bankroll: 25000,
      totalWon: 0,
      totalLost: 0,
      matchesPlayed: 0,
      splitsCount: 0,
      stealsCount: 0,
      successfulHeists: 0,
      betrayedByOpponent: 0,
      mutualDestructions: 0,
      unlockedAchievements: [],
      equippedSkin: 'obsidian_titanium',
      unlockedSkins: ['obsidian_titanium'],
      history: []
    };

    try {
      const saved = localStorage.getItem('dilemma_fund_stats');
      if (saved) {
        return { ...defaults, ...JSON.parse(saved) };
      }
    } catch (_) {}

    return defaults;
  }

  saveStats() {
    try {
      localStorage.setItem('dilemma_fund_stats', JSON.stringify(this.stats));
    } catch (_) {}
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
    const trust = this.getTrustScore();
    const total = this.stats.matchesPlayed;

    if (total < 3) return { title: 'Junior Desk Analyst', icon: '💼', color: '#94a3b8' };
    if (trust >= 80) return { title: 'Syndicate Managing Partner', icon: '📈', color: '#34d399' };
    if (trust <= 25) return { title: 'Apex Corporate Raider', icon: '🦈', color: '#f87171' };
    if (this.stats.successfulHeists >= 5) return { title: 'Predatory Short Seller', icon: '📉', color: '#fbbf24' };
    return { title: 'Quantitative Arbitrageur', icon: '⚖️', color: '#38bdf8' };
  }

  runPolygraphScan(aiId, timeRemaining, chatCount) {
    const ai = window.aiEngine.getPersonality(aiId);
    
    let deceptionProbability = 50;
    let stressLevel = 'STEADY ORDER FLOW';
    let tellNote = 'Normal biometric volatility.';

    if (ai.id === 'damian') {
      deceptionProbability = Math.floor(78 + Math.random() * 18);
      stressLevel = 'HIGH DECEPTION (PUPIL DILATION & MICRO-SWEAT)';
      tellNote = 'Predatory front-running pattern detected in vocal cadence.';
    } else if (ai.id === 'sarah') {
      deceptionProbability = Math.floor(8 + Math.random() * 20);
      stressLevel = 'FIDUCIARY BASELINE';
      tellNote = 'Institutional compliance and calm vocal cadence confirmed.';
    } else if (ai.id === 'nick') {
      deceptionProbability = Math.floor(50 + Math.random() * 25);
      stressLevel = 'COLD STEEL (HEART RATE 52 BPM)';
      tellNote = 'Ruthless activist ultimatum. High-conviction posture.';
    } else if (ai.id === 'jax') {
      deceptionProbability = Math.floor(40 + Math.random() * 45);
      stressLevel = 'HIGH VOLATILITY SPIKE';
      tellNote = 'Extreme adrenaline spikes detected on trading desk.';
    } else if (ai.id === 'nash') {
      deceptionProbability = Math.floor(45 + Math.random() * 20);
      stressLevel = 'FLATLINE ARBITRAGE';
      tellNote = 'Bayesian mathematical optimization model in execution.';
    }

    return {
      deceptionProbability,
      stressLevel,
      tellNote
    };
  }

  evaluateMatrix(p1Choice, p2Choice, totalJackpot) {
    let outcomeType = '';
    let p1Amount = 0;
    let p2Amount = 0;
    let narrative = '';
    let headline = '';

    if (p1Choice === 'SPLIT' && p2Choice === 'SPLIT') {
      outcomeType = 'SPLIT_SPLIT';
      p1Amount = totalJackpot / 2;
      p2Amount = totalJackpot / 2;
      headline = 'SYNDICATE CLOSED! 50/50 MERGER!';
      narrative = `Both desks executed the co-investment covenant! The $${totalJackpot.toLocaleString()} pool is disbursed equally ($${p1Amount.toLocaleString()} to each firm).`;
    } else if (p1Choice === 'STEAL' && p2Choice === 'SPLIT') {
      outcomeType = 'P1_STEALS';
      p1Amount = totalJackpot;
      p2Amount = 0;
      headline = 'HOSTILE TAKEOVER! DESK 1 SEIZES 100%!';
      narrative = `Desk 1 executed a hostile liquidation while Desk 2 honored the syndicate. Desk 1 absorbs the entire $${totalJackpot.toLocaleString()} capital pool!`;
    } else if (p1Choice === 'SPLIT' && p2Choice === 'STEAL') {
      outcomeType = 'P2_STEALS';
      p1Amount = 0;
      p2Amount = totalJackpot;
      headline = 'PREDATORY RUG-PULL! COUNTERPARTY SEIZES ALL!';
      narrative = `Counterparty executed a hostile takeover while you honored the syndicate. Counterparty absorbs the entire $${totalJackpot.toLocaleString()} pool!`;
    } else {
      outcomeType = 'MUTUAL_STEAL';
      p1Amount = 0;
      p2Amount = 0;
      headline = 'MARGIN CALL COLLAPSE! MUTUAL $0 DEFAULT!';
      narrative = `Both desks attempted a hostile liquidation simultaneously! Mutual market collapse triggered: the entire $${totalJackpot.toLocaleString()} pool is wiped to zero!`;
    }

    return {
      p1Choice,
      p2Choice,
      p1Amount,
      p2Amount,
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

    this.stats.bankroll += outcome.p1Amount;
    this.stats.totalWon += outcome.p1Amount;

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
      this.stats.totalLost += jackpot;
    } else if (outcome.outcomeType === 'MUTUAL_STEAL') {
      this.stats.mutualDestructions++;
      this.checkAchievement('double_steal');
    }

    if (this.stats.bankroll >= 10000000) {
      this.checkAchievement('millionaire');
    }

    if (this.stats.matchesPlayed >= 10 && this.getTrustScore() >= 85) {
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
      p1Amount: outcome.p1Amount
    });
    if (this.stats.history.length > 20) this.stats.history.pop();

    this.saveStats();
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
    localStorage.removeItem('dilemma_fund_stats');
    localStorage.removeItem('sos_ai_memory');
    this.stats = this.loadStats();
  }
}

window.gameMatrix = new GameMatrix();
