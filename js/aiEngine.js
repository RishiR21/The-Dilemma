/**
 * AIEngine - Dynamic Theme-Adaptive AI Personalities & Logic
 * Automatically swaps opponent identities, dialogue, voice tells, and psychology
 * based on the active game theme (Poker / Trading / Hotel / Vault).
 */

class AIEngine {
  constructor() {
    this.currentTheme = 'trading_desk';
  }

  setTheme(themeId) {
    this.currentTheme = themeId;
  }

  getThemeData() {
    const data = window.THEMES_DATA || {};
    return data[this.currentTheme] || data['trading_desk'];
  }

  getPersonality(id) {
    const themeData = this.getThemeData();
    const aiList = themeData.ai || {};
    return aiList[id] || aiList.nick || Object.values(aiList)[0];
  }

  getAllPersonalities() {
    const themeData = this.getThemeData();
    const aiList = themeData.ai || {};
    return Object.keys(aiList).map(id => ({
      id,
      ...aiList[id]
    }));
  }

  generateNegotiationDialogue(aiId, roundTimeRemaining, playerMessages = []) {
    const ai = this.getPersonality(aiId);
    
    if (playerMessages.length > 0) {
      const lastMsg = playerMessages[playerMessages.length - 1].toLowerCase();
      if (lastMsg.includes('split') || lastMsg.includes('chop') || lastMsg.includes('honor') || lastMsg.includes('deal') || lastMsg.includes('trust') || lastMsg.includes('50')) {
        return `I hear you loud and clear. Let's keep our word and secure this 50/50 division.`;
      }
      if (lastMsg.includes('steal') || lastMsg.includes('all-in') || lastMsg.includes('heist') || lastMsg.includes('seize') || lastMsg.includes('takeover')) {
        return `A hostile move guarantees neither of us walks away with a single cent. Consider your move carefully!`;
      }
      if (lastMsg.includes('please') || lastMsg.includes('help') || lastMsg.includes('mercy')) {
        return `Sentiment won't change the numbers. We either split equally or we both get nothing.`;
      }
    }

    if (roundTimeRemaining <= 8) {
      return ai.bluffs[0];
    } else if (roundTimeRemaining <= 20) {
      const idx = Math.floor(Math.random() * ai.bluffs.length);
      return ai.bluffs[idx];
    }

    return ai.initialDialogue;
  }

  decideOutcome(aiId, playerStats, playerChatHistory, currentStake) {
    const compliantKeywords = ['split', 'chop', 'honor', 'agree', 'syndicate', 'deal', 'trust', 'settle', 'partner', 'clean'];
    const playerText = (playerChatHistory || []).join(' ').toLowerCase();
    const isCompliant = compliantKeywords.some(w => playerText.includes(w));

    // Specific AI decision mechanics
    if (aiId === 'nick') {
      // The Bully / Raider: If player sounds compliant, has higher split probability
      return isCompliant 
        ? (Math.random() < 0.70 ? 'SPLIT' : 'STEAL')
        : (Math.random() < 0.35 ? 'SPLIT' : 'STEAL');
    } else if (aiId === 'sarah') {
      // Fiduciary / Loyal: Splits 90% unless previously betrayed
      try {
        const memory = JSON.parse(localStorage.getItem('sos_ai_memory') || '{}');
        const sarahMem = memory.sarah || { betrayedCount: 0 };
        if (sarahMem.betrayedCount > 0) {
          return Math.random() < 0.75 ? 'STEAL' : 'SPLIT';
        }
      } catch (_) {}
      return Math.random() < 0.88 ? 'SPLIT' : 'STEAL';
    } else if (aiId === 'damian') {
      // Predator / Swindler: Bluffs constantly, steals 85% of high stakes
      if (currentStake >= 200000) {
        return Math.random() < 0.90 ? 'STEAL' : 'SPLIT';
      }
      return Math.random() < 0.80 ? 'STEAL' : 'SPLIT';
    } else if (aiId === 'jax') {
      // Wildcard / Maniac: 50/50 pure chaos
      return Math.random() < 0.50 ? 'SPLIT' : 'STEAL';
    } else if (aiId === 'nash') {
      // Quant / Solver: Bayesian calculation against player trust
      const playerTrust = playerStats.totalMatches > 0 
        ? playerStats.totalSplits / playerStats.totalMatches 
        : 0.5;

      if (playerTrust >= 0.75) {
        return Math.random() < 0.65 ? 'STEAL' : 'SPLIT';
      } else if (playerTrust <= 0.35) {
        return Math.random() < 0.88 ? 'STEAL' : 'SPLIT';
      }
      return Math.random() < 0.52 ? 'SPLIT' : 'STEAL';
    }

    return Math.random() < 0.50 ? 'SPLIT' : 'STEAL';
  }

  recordMatchResult(aiId, playerChoice, aiChoice) {
    try {
      const memory = JSON.parse(localStorage.getItem('sos_ai_memory') || '{}');
      if (!memory[aiId]) {
        memory[aiId] = { matches: 0, betrayedCount: 0, splitTogether: 0 };
      }
      memory[aiId].matches++;
      if (playerChoice === 'STEAL' && aiChoice === 'SPLIT') {
        memory[aiId].betrayedCount++;
      } else if (playerChoice === 'SPLIT' && aiChoice === 'SPLIT') {
        memory[aiId].splitTogether++;
      }
      localStorage.setItem('sos_ai_memory', JSON.stringify(memory));
    } catch (_) {}
  }
}

window.aiEngine = new AIEngine();
