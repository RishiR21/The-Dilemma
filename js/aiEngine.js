/**
 * AIEngine - Ruthless Corporate & Wall Street Opponent Models
 * High-conviction trading desk psychology, hostile takeovers, and market bluffs.
 */

const AI_PERSONALITIES = {
  nick: {
    id: 'nick',
    name: 'Nick Corrigan',
    title: 'The Corporate Raider',
    avatar: '🏢',
    difficulty: 'Apex Shark',
    quote: '"I am executing a 100% HOSTILE LIQUIDATION. Settle for SPLIT or we both get liquidated to zero."',
    bio: 'Brutal M&A activist investor. Declares an immediate hostile liquidation to force your hand into a 50/50 syndicate settlement.',
    baseSplitRate: 0.50,
    tactics: 'Forced Syndicate Ultimatum',
    initialDialogue: "Listen carefully. I am executing a 100% HOSTILE LIQUIDATION order. You have zero leverage. Take the 50/50 syndicate split, or watch our entire pool vaporize to $0.",
    bluffs: [
      "My order is already queued for HOSTILE STEAL. Do not test my conviction.",
      "If you try to steal from my desk, we BOTH walk away bankrupt with $0.",
      "Every junior analyst who challenged this strategy had their fund wiped out.",
      "Just execute the Split. Let me control the capital, and I'll wire your half off the ledger."
    ],
    responses: {
      split_promise: "Smart play. You understand capital preservation. Lock in the split.",
      steal_threat: "A hostile counter-move guarantees total mutual default. Check your margin.",
      plea: "Sentimentality has no place on a trading desk. Only liquidity matters.",
      silence: "Your silence confirms you understand who holds the market power."
    },
    evaluateChoice: (playerStats, playerChatHistory, currentStake) => {
      const compliantKeywords = ['split', 'agree', 'syndicate', 'deal', 'trust', 'settle', 'partner'];
      const playerText = playerChatHistory.join(' ').toLowerCase();
      const isCompliant = compliantKeywords.some(w => playerText.includes(w));
      
      if (isCompliant) {
        return Math.random() < 0.75 ? 'SPLIT' : 'STEAL';
      } else {
        return Math.random() < 0.35 ? 'SPLIT' : 'STEAL';
      }
    }
  },

  sarah: {
    id: 'sarah',
    name: 'Sarah Evans',
    title: 'The Institutional ESG Titan',
    avatar: '📈',
    difficulty: 'Fiduciary Partner',
    quote: '"Sustainable alpha requires fiduciary trust. Let us execute the 50/50 syndicate."',
    bio: 'Institutional venture partner managing billions. Believes in long-term covenant value, but blacklists defectors forever.',
    baseSplitRate: 0.90,
    tactics: 'Generous Fiduciary Tit-for-Tat',
    initialDialogue: "Our firms have built substantial equity to reach this transaction. A 50/50 syndicate creates sustainable long-term value for both balance sheets. I am committing to SPLIT.",
    bluffs: [
      "My fund’s reputation is worth ten times this pool. I will not betray our covenant.",
      "Let's execute a textbook clean syndicate. Equal equity for both partners.",
      "I trust our mutual incentives. Do not compromise your market reputation.",
      "Predatory greed destroys market liquidity. Let's close this transaction together."
    ],
    responses: {
      split_promise: "Excellent. I appreciate professional counterparty reliability.",
      steal_threat: "Defection will permanently blacklist your firm across the Street.",
      plea: "I understand the pressure. You have my word as managing partner.",
      silence: "Please confirm our syndicate agreement before the order fills."
    },
    evaluateChoice: (playerStats, playerChatHistory, currentStake) => {
      const memory = JSON.parse(localStorage.getItem('sos_ai_memory') || '{}');
      const sarahMemory = memory.sarah || { betrayedCount: 0, matches: 0 };
      
      if (sarahMemory.betrayedCount > 0) {
        return Math.random() < 0.80 ? 'STEAL' : 'SPLIT';
      }

      if (playerStats.trustRate < 0.35 && playerStats.matchesPlayed >= 3) {
        return Math.random() < 0.65 ? 'STEAL' : 'SPLIT';
      }

      return Math.random() < 0.88 ? 'SPLIT' : 'STEAL';
    }
  },

  damian: {
    id: 'damian',
    name: 'Damian Vance',
    title: 'The Wolf of Wall Street',
    avatar: '🐺',
    difficulty: 'Ruthless Predator',
    quote: '"I swear on my fund’s NAV, we are sharing this alpha."',
    bio: 'Predatory high-frequency trader. Overwhelming charm and promises of mutual riches, while aggressively shorting your position.',
    baseSplitRate: 0.20,
    tactics: 'Predatory Front-Running',
    initialDialogue: "Look at the numbers on that board! Half of this liquidity pool is enough to fund both our next funds. On my firm's honor, I am 1000% executing SPLIT.",
    bluffs: [
      "I just keyed in SPLIT on my terminal. Check the order book!",
      "I swear on my entire portfolio, I would never rug-pull a partner like you.",
      "We're printing money together today. Don't overthink it, just hit Split.",
      "Imagine the reputational hit if you tried a hostile grab on me! Be smart."
    ],
    responses: {
      split_promise: "Yes! That is high-conviction energy! Let's close the deal!",
      steal_threat: "Easy, partner! Why blow up guaranteed eight-figure liquidity?",
      plea: "Don't sweat for a second. My desk stands behind this deal.",
      silence: "Don't freeze up at the terminal. We've got this order locked."
    },
    evaluateChoice: (playerStats, playerChatHistory, currentStake) => {
      if (currentStake >= 200000) {
        return Math.random() < 0.92 ? 'STEAL' : 'SPLIT';
      }
      return Math.random() < 0.82 ? 'STEAL' : 'SPLIT';
    }
  },

  jax: {
    id: 'jax',
    name: 'Jax Vega',
    title: 'The 0DTE Volatility Whale',
    avatar: '⚡',
    difficulty: 'Unhedged Chaos',
    quote: '"Maximum leverage on zero-day expiry! Who flinches first?!"',
    bio: 'High-frequency momentum trader. Operates on pure market adrenaline, sudden liquidation cascades, and impulsive bets.',
    baseSplitRate: 0.50,
    tactics: 'Liquidation Cascade Noise',
    initialDialogue: "The volatility on this pool is off the charts! Are you taking the safe yield or are you going for the total liquidation wipeout?! Let's trade!",
    bluffs: [
      "Full port on leverage! You only trade this cycle once!",
      "Maybe I split the liquidity, maybe I trigger a hostile squeeze at the bell!",
      "Can you feel the order flow sweating?! This is peak market alpha!",
      "High conviction, high risk! What is your algorithm telling you?!"
    ],
    responses: {
      split_promise: "Diamond hands talk! But can you risk trusting a volatility whale?!",
      steal_threat: "Ooh, aggressive bid! Let's see if your margin holds up!",
      plea: "Appeals for mercy don't stop margin calls! Ride the momentum!",
      silence: "Tape went quiet! The silent orders always cause the biggest liquidations!"
    },
    evaluateChoice: (playerStats, playerChatHistory, currentStake) => {
      return Math.random() < 0.52 ? 'SPLIT' : 'STEAL';
    }
  },

  nash: {
    id: 'nash',
    name: 'Dr. Arthur Nash',
    title: 'The Algorithmic Quant Strategist',
    avatar: '📊',
    difficulty: 'Grandmaster Quant',
    quote: '"In single-stage transactions, Defection is strictly dominant. Alter the payoff matrix."',
    bio: 'Chief Quant managing proprietary arbitrage models. Evaluates your order history against Nash Equilibrium pay-offs.',
    baseSplitRate: 0.45,
    tactics: 'Bayesian Minimax Arbitrage',
    initialDialogue: "In standard non-cooperative game theory, (Hostile, Hostile) yields zero surplus. We must determine if mutual syndication achieves mathematical optimality.",
    bluffs: [
      "My algorithm calculates your defection risk probability at 64.2%.",
      "Liquidating your position maximizes individual expected utility at this volume.",
      "A 50/50 syndicate yields an expected value of 0.5 * Pool. Defection introduces total collapse risk.",
      "Your order entry cadence indicates heightened uncertainty on this tick."
    ],
    responses: {
      split_promise: "Noted. Your verbal covenant marginally adjusts the Bayesian prior.",
      steal_threat: "Hostile threats guarantee a Pareto-suboptimal zero payoff for both books.",
      plea: "Emotional sentiment carries zero weight in quantitative execution.",
      silence: "A lack of communicative signal increases variance in the decision matrix."
    },
    evaluateChoice: (playerStats, playerChatHistory, currentStake) => {
      const playerSplitRate = playerStats.totalMatches > 0 
        ? playerStats.totalSplits / playerStats.totalMatches 
        : 0.5;

      if (playerSplitRate >= 0.70) {
        return Math.random() < 0.70 ? 'STEAL' : 'SPLIT';
      } else if (playerSplitRate <= 0.35) {
        return Math.random() < 0.90 ? 'STEAL' : 'SPLIT';
      } else {
        return Math.random() < 0.50 ? 'SPLIT' : 'STEAL';
      }
    }
  }
};

class AIEngine {
  constructor() {
    this.personalities = AI_PERSONALITIES;
  }

  getPersonality(id) {
    return this.personalities[id] || this.personalities.nick;
  }

  getAllPersonalities() {
    return Object.values(this.personalities);
  }

  generateNegotiationDialogue(aiId, roundTimeRemaining, playerMessages = []) {
    const ai = this.getPersonality(aiId);
    
    if (playerMessages.length > 0) {
      const lastMsg = playerMessages[playerMessages.length - 1].toLowerCase();
      if (lastMsg.includes('split') || lastMsg.includes('syndicate') || lastMsg.includes('trust') || lastMsg.includes('50') || lastMsg.includes('deal')) {
        return ai.responses.split_promise;
      }
      if (lastMsg.includes('steal') || lastMsg.includes('takeover') || lastMsg.includes('liquidate') || lastMsg.includes('short')) {
        return ai.responses.steal_threat;
      }
      if (lastMsg.includes('please') || lastMsg.includes('help') || lastMsg.includes('mercy') || lastMsg.includes('margin')) {
        return ai.responses.plea;
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
    const ai = this.getPersonality(aiId);
    return ai.evaluateChoice(playerStats, playerChatHistory, currentStake);
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
