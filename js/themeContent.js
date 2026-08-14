/**
 * ThemeContent - Complete Thematic Data & Copywriting Engine for The Dilemma
 * 5 Full Worlds:
 * 1. poker_tournament: Vegas High Roller Poker Room
 * 2. trading_desk: Bloomberg Executive Trading Floor
 * 3. hotel_lobby: Art Deco Grand Continental Hotel
 * 4. bank_vault: Armored Titanium Swiss Safe
 * 5. military_intelligence: Pentagon War Room & Black Ops Bunker
 */

const THEMES_DATA = {
  poker_tournament: {
    id: 'poker_tournament',
    name: 'Poker Tournament',
    icon: '♠️',
    brandTitle: 'THE SHOWDOWN',
    brandBadge: 'WSOP HIGH ROLLER',
    heroSubtitle: 'Vegas High Roller Heads-Up Championship',
    heroHeadline: 'THE SHOWDOWN',
    heroTagline: 'Two poker players at the final table. One massive championship chip pot. Will you chop the pot 50/50, or push ALL-IN to steal the whole stack?',
    currencyName: 'Chips',
    currencyLabel: 'STACK:',
    potLabel: 'CHAMPIONSHIP CHIP POT',
    splitLabel: '50% Chop Pot',
    stealLabel: '100% All-In Steal',
    ballSplitText: 'CHOP',
    ballStealText: 'ALL-IN',
    decisionPrompt: '♠️ Select Secret Hand Order',
    scanBtnLabel: '♠ Read Opponent Tells',
    scanTitle: 'Live Player Tell Analysis',
    modes: {
      ai: { title: 'Heads-Up Gauntlet', desc: 'Face 5 legendary poker sharks, GTO solvers, and loose-aggressive maniacs.' },
      multiplayer: { title: 'Private Poker Room', desc: 'Invite another player to a real-time 1v1 heads-up online table.' },
      pass_play: { title: 'Table Pass & Play', desc: 'Lock in secret all-in/chop bets on one device before the showdown.' },
      ladder: { title: 'High Roller Ladder', desc: 'Climb from $25,000 Micro Stakes to the $10,000,000 Super High Roller.' }
    },
    bluffs: [
      { text: "I'm checking this down. 100% locking in the CHOP.", label: "♠️ '100% Chop Pot'" },
      { text: "If you push all-in to steal, we both bust out with $0.", label: "⚠️ 'All-in = $0 Bust'" },
      { text: "I am shoving ALL-IN. Your only positive EV is to take the chop.", label: "🃏 'Shoving All-in, take chop'" },
      { text: "Let's split the bracelet 50/50 and walk with the cash!", label: "🏆 'Split the Bracelet!'" }
    ],
    ticker: [
      { text: '♠ WSOP HEADS-UP TABLE 1', type: 'neutral' },
      { text: '▲ BLINDS: 10,000 / 20,000', type: 'up' },
      { text: '▲ CHIP LEADER: $2,500,000 STACK', type: 'up' },
      { text: '◈ TIME BANK: 45 SECONDS', type: 'neutral' },
      { text: '▼ BOUNTY: ALL-IN SHOWDOWN', type: 'down' },
      { text: '▲ HOLE CARDS: ACE-KING SUITED', type: 'up' }
    ],
    tiers: [
      { id: 'tier1', name: 'Micro Stakes Heads-Up', stake: 25000, minBankroll: 0, desc: 'Casual underground card room to build your bankroll.', icon: '♣️' },
      { id: 'tier2', name: 'Vegas Bellagio High Roller', stake: 100000, minBankroll: 25000, desc: 'Televised heads-up match under the bright Vegas spotlights.', icon: '♦️' },
      { id: 'tier3', name: 'Monte Carlo Invitational', stake: 500000, minBankroll: 150000, desc: 'European high-stakes cash game with world champions.', icon: '♥️' },
      { id: 'tier4', name: 'Macau Big Game', stake: 2000000, minBankroll: 750000, desc: 'Ultra-exclusive private room with seven-figure chip swings.', icon: '♠️' },
      { id: 'tier5', name: 'WSOP $10M Championship Main Event', stake: 10000000, minBankroll: 2500000, desc: 'The ultimate heads-up duel for $10,000,000 and the gold bracelet.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'Calling Station', icon: '🃏', color: '#94a3b8' },
      saint: { title: 'Honorable Card Shark', icon: '🏆', color: '#22c55e' },
      thief: { title: 'Ruthless Bluff King', icon: '🦈', color: '#ef4444' },
      predator: { title: 'All-In Bully', icon: '⚡', color: '#eab308' },
      balancer: { title: 'GTO Game Theorist', icon: '⚖️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'Nick "The Shove" Corrigan',
        title: 'The All-In Table Bully',
        avatar: '🤠',
        difficulty: 'Apex Bully',
        quote: '"I am pushing ALL-IN every single time. Take the chop or we both leave empty-handed."',
        bio: 'Aggressive tournament pro who uses stack leverage to force counterparties into taking the chop.',
        initialDialogue: "Look at my chip stack. I am pushing ALL-IN. You have zero fold equity. Accept the 50/50 chop, or we both bust out with $0.",
        tellNote: 'Checked hole cards once with steady pulse. Unshakable posture.',
        bluffs: [
          "My chips are in the middle. I never fold.",
          "If you try to steal from me, we both bust with zero chips.",
          "Every player who called my bluff is on the rail right now.",
          "Take the chop and stay alive in the tournament."
        ]
      },
      sarah: {
        name: 'Sarah "The Rock" Evans',
        title: 'The GTO Bracelet Winner',
        avatar: '👑',
        difficulty: 'Fiduciary Pro',
        quote: '"Game theory optimal play means honoring the chop. Let us divide the pot fairly."',
        bio: 'Calculated tournament champion who respects the etiquette of chopping, but permanently punishes angle-shooters.',
        initialDialogue: "We fought hard to reach heads-up play. A 50/50 chop guarantees both of us six-figure payouts. I am locking in CHOP.",
        tellNote: 'Steady breathing and calm table presence. Zero deception detected.',
        bluffs: [
          "My poker reputation is on the line. I always honor the chop.",
          "Let's take our winnings and celebrate a clean finish.",
          "Angle-shooting will get you blacklisted from high-roller games.",
          "Greed costs tournaments. Let's chop it up."
        ]
      },
      damian: {
        name: 'Damian "The Grifter" Vance',
        title: 'The River Bluff Master',
        avatar: '🐺',
        difficulty: 'Predatory Shark',
        quote: '"I swear on my WSOP bracelet, I am checking down to chop!"',
        bio: 'Charming hustler who promises a gentleman\'s chop while silently pushing all-in to scoop the whole pot.',
        initialDialogue: "What a game! We both played brilliantly. On my mother's life, I've got my chips set on CHOP. Lock it in with me!",
        tellNote: 'Glancing repeatedly at the pot with dilated pupils. High deception tell.',
        bluffs: [
          "I already pushed the Chop button, partner!",
          "I would never angle-shoot a fellow pro at this table.",
          "We both walk away rich today. Just hit Chop.",
          "Don't let paranoia ruin an easy payday."
        ]
      },
      jax: {
        name: 'Jax "Wildcard" Vega',
        title: 'The Loose-Aggressive Maniac',
        avatar: '⚡',
        difficulty: 'Wild Chaos',
        quote: '"Seven-deuce offsuit and pure gamble! Let\'s see who has the guts!"',
        bio: 'Unpredictable adrenaline gambler who plays pure instinct and sudden all-in shoves.',
        initialDialogue: "The adrenaline in this heads-up room is electric! Are we chopping the prize or gambling for glory?! Let's roll!",
        tellNote: 'Restless chip shuffling and rapid pulse spikes.',
        bluffs: [
          "All-in or bust! That's how legends are made!",
          "Maybe I chop, maybe I take your whole stack on the river!",
          "Can you feel the tension?! What's your gut telling you?!",
          "Gamblers gamble! Show me what you've got!"
        ]
      },
      nash: {
        name: 'Dr. Arthur Nash',
        title: 'The Solver Quant Pro',
        avatar: '📊',
        difficulty: 'Grandmaster Solver',
        quote: '"GTO Solvers prove (Chop, Chop) maximizes collective equity."',
        bio: 'Mathematician who analyzes pot odds, range distribution, and Nash Equilibrium heads-up chops.',
        initialDialogue: "According to Monte Carlo simulation, a 50/50 chop yields positive expected value. Defection introduces mutual bankruptcy risk.",
        tellNote: 'Flatline heart rate. Mechanical mathematical calculation.',
        bluffs: [
          "My solver gives your steal probability a 68% frequency.",
          "Shoving here gives you negative EV against my range.",
          "A 50/50 chop preserves tournament variance.",
          "Mathematical discipline always beats emotional tilt."
        ]
      }
    },
    announcements: {
      roundStart: "Heads-up for the championship! Call the chop or push all-in!",
      tenSeconds: "Ten seconds in the time bank! Make your decision!",
      reveal: "Three, two, one, showdown!",
      splitWin: "Chop pot! Both players split the chips equally!",
      stealWin: "All-in scoop! You take down the entire championship pot!",
      stealLose: "Cold deck! Opponent scoops the entire chip pot!",
      mutualLose: "Double bust! Both players walk away with zero chips!"
    }
  },

  trading_desk: {
    id: 'trading_desk',
    name: 'Trading Desk',
    icon: '📊',
    brandTitle: 'THE DILEMMA',
    brandBadge: 'TERMINAL V2',
    heroSubtitle: 'High-Conviction Liquidity Execution',
    heroHeadline: 'THE DILEMMA',
    heroTagline: 'Two counterparties. One institutional capital pool. Will you syndicate the 50/50 merger, or execute a ruthless hostile takeover?',
    currencyName: 'NAV',
    currencyLabel: 'NAV:',
    potLabel: 'CAPITAL POOL LIQUIDITY',
    splitLabel: '50% Syndicate Split',
    stealLabel: '100% Hostile Takeover',
    ballSplitText: 'SPLIT',
    ballStealText: 'STEAL',
    decisionPrompt: '🔒 Select Confidential Execution Order',
    scanBtnLabel: '🔍 Scan Order Flow Risk',
    scanTitle: 'Order Flow Biometric Telemetry',
    modes: {
      ai: { title: 'Counterparty Gauntlet', desc: 'Negotiate against 5 Wall Street sharks, activist raiders, and algorithmic quants.' },
      multiplayer: { title: 'Private Deal Room', desc: 'Host or join encrypted trade rooms with counterparties across desks.' },
      pass_play: { title: 'Floor Terminal (1 Device)', desc: 'Execute secret trade orders on the same terminal before market reveal.' },
      ladder: { title: 'Tranche Ladder', desc: 'Climb from $25,000 Angel Syndicates to the $10,000,000 Megamerger tranche.' }
    },
    bluffs: [
      { text: "I promise on my firm's honor we are locking in SPLIT.", label: "🤝 '100% Syndicate SPLIT'" },
      { text: "If you attempt a hostile steal, we both default to ZERO.", label: "⚠️ 'Hostile steal = $0 Default'" },
      { text: "I am executing a HOSTILE STEAL. You must take the SPLIT.", label: "🏢 'Executing STEAL, take split'" },
      { text: "Let's execute a clean 50/50 institutional merger!", label: "📈 'Clean 50/50 Merger!'" }
    ],
    ticker: [
      { text: '▲ BTC/USD $98,450 (+4.8%)', type: 'up' },
      { text: '▲ S&P 500 5,890 (+1.2%)', type: 'up' },
      { text: '▲ NVDA $142.80 (+3.9%)', type: 'up' },
      { text: '◈ DILEMMA POOL: $10,000,000 TRANCHE', type: 'neutral' },
      { text: '▼ US10Y 4.18% (-0.8%)', type: 'down' },
      { text: '▲ ETH/USD $3,820 (+5.1%)', type: 'up' }
    ],
    tiers: [
      { id: 'tier1', name: 'Angel Syndicate Round', stake: 25000, minBankroll: 0, desc: 'Seed stage deal room where junior venture partners prove conviction.', icon: '💼' },
      { id: 'tier2', name: 'Series A Venture Tranche', stake: 100000, minBankroll: 25000, desc: 'Competitive venture round with high institutional scrutiny.', icon: '📊' },
      { id: 'tier3', name: 'Wall Street Trading Floor', stake: 500000, minBankroll: 150000, desc: 'High-frequency institutional derivatives block trade.', icon: '🏛️' },
      { id: 'tier4', name: 'Sovereign Wealth Allocation', stake: 2000000, minBankroll: 750000, desc: 'Eight-figure private wealth mandate with global sovereign funds.', icon: '💎' },
      { id: 'tier5', name: 'Hostile Megamerger Acquisition', stake: 10000000, minBankroll: 2500000, desc: 'The ultimate $10,000,000 hostile takeover on live financial news.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'Junior Desk Analyst', icon: '💼', color: '#94a3b8' },
      saint: { title: 'Syndicate Managing Partner', icon: '📈', color: '#34d399' },
      thief: { title: 'Apex Corporate Raider', icon: '🦈', color: '#f87171' },
      predator: { title: 'Predatory Short Seller', icon: '📉', color: '#fbbf24' },
      balancer: { title: 'Quantitative Arbitrageur', icon: '⚖️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'Nick Corrigan',
        title: 'The Corporate Raider',
        avatar: '🏢',
        difficulty: 'Apex Shark',
        quote: '"I am executing a 100% HOSTILE LIQUIDATION. Settle for SPLIT or we both get liquidated to zero."',
        bio: 'Brutal M&A activist investor. Declares an immediate hostile liquidation to force your hand into a 50/50 syndicate settlement.',
        initialDialogue: "Listen carefully. I am executing a 100% HOSTILE LIQUIDATION order. Take the 50/50 syndicate split, or watch our entire pool vaporize to $0.",
        tellNote: 'Cold steel composure (52 BPM). Ruthless activist posture.',
        bluffs: [
          "My order is already queued for HOSTILE STEAL. Do not test my conviction.",
          "If you try to steal from my desk, we BOTH walk away bankrupt with $0.",
          "Every junior analyst who challenged this strategy had their fund wiped out.",
          "Just execute the Split and keep your fund solvent."
        ]
      },
      sarah: {
        name: 'Sarah Evans',
        title: 'The Institutional ESG Titan',
        avatar: '📈',
        difficulty: 'Fiduciary Partner',
        quote: '"Sustainable alpha requires fiduciary trust. Let us execute the 50/50 syndicate."',
        bio: 'Institutional venture partner managing billions. Believes in long-term covenant value, but blacklists defectors forever.',
        initialDialogue: "Our firms have built substantial equity to reach this transaction. A 50/50 syndicate creates sustainable long-term value for both balance sheets. I am committing to SPLIT.",
        tellNote: 'Institutional compliance confirmed. Calm vocal cadence.',
        bluffs: [
          "My fund’s reputation is worth ten times this pool. I will not betray our covenant.",
          "Let's execute a textbook clean syndicate. Equal equity for both partners.",
          "I trust our mutual incentives. Do not compromise your market reputation.",
          "Predatory greed destroys market liquidity. Let's close this transaction together."
        ]
      },
      damian: {
        name: 'Damian Vance',
        title: 'The Wolf of Wall Street',
        avatar: '🐺',
        difficulty: 'Ruthless Predator',
        quote: '"I swear on my fund’s NAV, we are sharing this alpha."',
        bio: 'Predatory high-frequency trader. Overwhelming charm and promises of mutual riches, while aggressively shorting your position.',
        initialDialogue: "Look at the numbers on that board! Half of this liquidity pool is enough to fund both our next funds. On my firm's honor, I am 1000% executing SPLIT.",
        tellNote: 'Predatory front-running pattern detected in vocal cadence.',
        bluffs: [
          "I just keyed in SPLIT on my terminal. Check the order book!",
          "I swear on my entire portfolio, I would never rug-pull a partner like you.",
          "We're printing money together today. Don't overthink it, just hit Split.",
          "Imagine the reputational hit if you tried a hostile grab on me! Be smart."
        ]
      },
      jax: {
        name: 'Jax Vega',
        title: 'The 0DTE Volatility Whale',
        avatar: '⚡',
        difficulty: 'Unhedged Chaos',
        quote: '"Maximum leverage on zero-day expiry! Who flinches first?!"',
        bio: 'High-frequency momentum trader. Operates on pure market adrenaline, sudden liquidation cascades, and impulsive bets.',
        initialDialogue: "The volatility on this pool is off the charts! Are you taking the safe yield or are you going for the total liquidation wipeout?! Let's trade!",
        tellNote: 'Extreme adrenaline spikes detected on trading desk.',
        bluffs: [
          "Full port on leverage! You only trade this cycle once!",
          "Maybe I split the liquidity, maybe I trigger a hostile squeeze at the bell!",
          "Can you feel the order flow sweating?! This is peak market alpha!",
          "High conviction, high risk! What is your algorithm telling you?!"
        ]
      },
      nash: {
        name: 'Dr. Arthur Nash',
        title: 'The Algorithmic Quant Strategist',
        avatar: '📊',
        difficulty: 'Grandmaster Quant',
        quote: '"In single-stage transactions, Defection is strictly dominant. Alter the payoff matrix."',
        bio: 'Chief Quant managing proprietary arbitrage models. Evaluates your order history against Nash Equilibrium pay-offs.',
        initialDialogue: "In standard non-cooperative game theory, (Hostile, Hostile) yields zero surplus. We must determine if mutual syndication achieves mathematical optimality.",
        tellNote: 'Bayesian mathematical optimization model in execution.',
        bluffs: [
          "My algorithm calculates your defection risk probability at 64.2%.",
          "Liquidating your position maximizes individual expected utility at this volume.",
          "A 50/50 syndicate yields an expected value of 0.5 * Pool.",
          "Your order entry cadence indicates heightened uncertainty on this tick."
        ]
      }
    },
    announcements: {
      roundStart: "Deal room initialized. Capital pool open for trade execution.",
      tenSeconds: "Ten seconds to market close! Enter your order!",
      reveal: "Executing orders at the market bell. Three, two, one!",
      splitWin: "Syndicate closed! 50/50 merger equity disbursed to both desks!",
      stealWin: "Hostile takeover executed! You absorbed the entire capital pool!",
      stealLose: "Predatory liquidation! Counterparty absorbed the capital pool!",
      mutualLose: "Margin call default! Both desks wipe out to zero dollars!"
    }
  },

  hotel_lobby: {
    id: 'hotel_lobby',
    name: 'Hotel Lobby',
    icon: '🛎️',
    brandTitle: 'THE CONTINENTAL',
    brandBadge: 'GRAND ESCROW',
    heroSubtitle: 'High-Society Escrow Negotiations',
    heroHeadline: 'THE ESCROW',
    heroTagline: 'Two distinguished patrons. One sealed escrow deposit in the Grand Continental safe. Will you honor the gentleman\'s agreement, or seize the full chest?',
    currencyName: 'Escrow',
    currencyLabel: 'ESCROW:',
    potLabel: 'PRIVATE ESCROW DEPOSIT',
    splitLabel: 'Honor Covenant (50%)',
    stealLabel: 'Seize Escrow (100%)',
    ballSplitText: 'HONOR',
    ballStealText: 'SEIZE',
    decisionPrompt: '🗝️ Seal Wax Key Decision',
    scanBtnLabel: '🛎️ Inquire Concierge Intel',
    scanTitle: 'Discreet Concierge Dossier',
    modes: {
      ai: { title: 'Patron Gauntlet', desc: 'Negotiate with 5 cunning diplomats, aristocratic grifters, and the Grand Concierge.' },
      multiplayer: { title: 'Private Suite Room', desc: 'Meet another guest in a confidential private parlor room.' },
      pass_play: { title: 'Suite Pass & Play', desc: 'Enter secret wax-sealed decisions on one terminal in total discretion.' },
      ladder: { title: 'Executive Suite Ladder', desc: 'Climb from $25,000 Salon Stakes to the $10,000,000 Sovereign Trust.' }
    },
    bluffs: [
      { text: "By the rules of the Continental, I am honoring the 50/50 covenant.", label: "🛎️ 'Honor Covenant'" },
      { text: "If you break sanctuary and steal, the deposit is forfeited to $0.", label: "⚠️ 'Breach = Total Forfeit'" },
      { text: "I intend to claim the full escrow. Surrender with the split.", label: "🗝️ 'Claiming Full Escrow'" },
      { text: "A gentleman's agreement: we divide the deposit equally.", label: "👑 'Gentleman's Agreement'" }
    ],
    ticker: [
      { text: '👑 THE GRAND CONTINENTAL LOBBY', type: 'neutral' },
      { text: '▲ PRESIDENTIAL SUITE: OCCUPIED', type: 'up' },
      { text: '◈ ESCROW VAULT: SANCTUARY GUARANTEED', type: 'neutral' },
      { text: '▲ CONCIERGE DESK: LEVEL 5 DISCRETION', type: 'up' },
      { text: '▼ COVENANT AUDIT: IN PROGRESS', type: 'down' }
    ],
    tiers: [
      { id: 'tier1', name: 'Boutique Salon Escrow', stake: 25000, minBankroll: 0, desc: 'Quiet parlor deposit with visiting diplomats.', icon: '🗝️' },
      { id: 'tier2', name: 'Executive Penthouse Escrow', stake: 100000, minBankroll: 25000, desc: 'High-stakes dispute in the Presidential suite.', icon: '🛎️' },
      { id: 'tier3', name: 'Grand Ballroom Gala Trust', stake: 500000, minBankroll: 150000, desc: 'Multimillion-dollar auction trust under chandelier lights.', icon: '🍸' },
      { id: 'tier4', name: 'Continental Sovereign Trust', stake: 2000000, minBankroll: 750000, desc: 'Confidential treaty deposit overseen by the High Table.', icon: '💎' },
      { id: 'tier5', name: 'Imperial Grand Continental Reserve', stake: 10000000, minBankroll: 2500000, desc: 'The legendary $10,000,000 master vault of the hotel founders.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'First-Time Guest', icon: '🛎️', color: '#94a3b8' },
      saint: { title: 'High Patron of Honor', icon: '👑', color: '#34d399' },
      thief: { title: 'Aristocratic Swindler', icon: '🍷', color: '#ef4444' },
      predator: { title: 'Ruthless Diplomat', icon: '🎩', color: '#d4af37' },
      balancer: { title: 'Continental Arbiter', icon: '⚖️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'Monsieur Nick Corrigan',
        title: 'The Ruthless Landlord',
        avatar: '🎩',
        difficulty: 'Uncompromising Diplomat',
        quote: '"I will seize 100% of this escrow. Agree to the honor split or leave with nothing."',
        bio: 'Iron-willed hotel magnate who demands total deference at the negotiation table.',
        initialDialogue: "Good evening. Under hotel bylaws, I am declaring full claim to this escrow. Take your 50% split and depart in peace, or we both forfeit the funds to the house.",
        tellNote: 'Firm grip on his gold-headed cane. Zero hesitation.',
        bluffs: [
          "My wax seal is already stamped. I do not negotiate backwards.",
          "Attempting to steal from my estate forfeits every single cent.",
          "Generations of patrons have learned not to test my resolve.",
          "Accept the honor split and retain your standing in the Continental."
        ]
      },
      sarah: {
        name: 'Lady Sarah Evans',
        title: 'The High Patron of the House',
        avatar: '👑',
        difficulty: 'Noble Fiduciary',
        quote: '"Sanctuary and honor are the foundation of the Continental. I commit to HONOR."',
        bio: 'Distinguished benefactress who values high-society reputation above petty theft.',
        initialDialogue: "We are guests of honor here tonight. A fair 50/50 division upholds the dignity of our names. I am choosing HONOR.",
        tellNote: 'Elegant posture and candid gaze. Pure integrity.',
        bluffs: [
          "My name stands for absolute integrity across Europe.",
          "Let us share this escrow like true partners of distinction.",
          "A breach of sanctuary will close every grand door to you forever.",
          "Greed is uncivilized. Let us settle this honorably."
        ]
      },
      damian: {
        name: 'Count Damian Vance',
        title: 'The Aristocratic Swindler',
        avatar: '🍷',
        difficulty: 'Charming Impostor',
        quote: '"On my family crest, I shall divide every coin with you, dear friend!"',
        bio: 'Silver-tongued rogue in a velvet tuxedo who toasts your health while stealing the escrow keys.',
        initialDialogue: "What a splendid evening! To our mutual prosperity! On my noble honor, my wax seal is set to HONOR. Raise your glass and do the same!",
        tellNote: 'Subtle twitch of the mustache and nervous adjustment of cufflinks.',
        bluffs: [
          "I have already given my word to the concierge! We are dividing it!",
          "Would a true gentleman ever swindle a friend? Never!",
          "We shall drink vintage champagne tonight on our split fortunes!",
          "Do not insult our friendship with doubt. Select Honor!"
        ]
      },
      jax: {
        name: 'Jax "The Daredevil" Vega',
        title: 'The High-Society Gambler',
        avatar: '⚡',
        difficulty: 'Wild High-Roller',
        quote: '"Double the wager or lose it all! Let\'s see who dares!"',
        bio: 'Billionaire playboy who treats international treaties as a thrilling game of chance.',
        initialDialogue: "The tension in this parlor is delicious! Are we dividing the antique chest or playing for the whole treasury?! Let\'s find out!",
        tellNote: 'Laughing heartily with erratic pulse spikes.',
        bluffs: [
          "Fortune favors the bold! Who wants the full prize?!",
          "Maybe I honor the deal, maybe I take the whole escrow to Monaco!",
          "Can you feel the pulse of the room?! Don\'t be boring!",
          "High stakes, high thrills! What is your choice?!"
        ]
      },
      nash: {
        name: 'Chancellor Arthur Nash',
        title: 'The Continental Arbiter',
        avatar: '📜',
        difficulty: 'Legal Arbiter',
        quote: '"Article 4 of the Continental Codex establishes equal entitlement."',
        bio: 'Master of hotel law and diplomatic protocol, calculating risk distributions.',
        initialDialogue: "Under Article 7 of the Grand Protocol, mutual covenant preserves equal utility. Defection causes immediate total escrow confiscation.",
        tellNote: 'Methodical review of parchment documents. Zero emotional variance.',
        bluffs: [
          "Statistical precedent indicates a 72% likelihood of mutual honor.",
          "Attempting seizure introduces unacceptable asset forfeiture risk.",
          "A 50/50 division is the sole Pareto-optimal treaty outcome.",
          "Protocol must be respected above all personal ambition."
        ]
      }
    },
    announcements: {
      roundStart: "Grand Continental escrow session is now convened.",
      tenSeconds: "Ten seconds before the wax seal is set! Make your choice!",
      reveal: "Breaking the wax seals. Three, two, one!",
      splitWin: "Honor upheld! Both patrons receive equal shares of the escrow!",
      stealWin: "Escrow seized! You claim the entire deposit for yourself!",
      stealLose: "Betrayal in the parlor! Opponent seized the entire escrow!",
      mutualLose: "Sanctuary broken! The house has confiscated the entire deposit to $0!"
    }
  },

  bank_vault: {
    id: 'bank_vault',
    name: 'Bank / Cash Vault',
    icon: '🔒',
    brandTitle: 'THE VAULT',
    brandBadge: 'SECTOR 9 VAULT',
    heroSubtitle: 'Underground Armored Fortress Infiltration',
    heroHeadline: 'THE VAULT',
    heroTagline: 'Two master operatives at the subterranean titanium safe. One $10,000,000 cash reserve. Will you split the dual-key loot, or trigger a solo heist?',
    currencyName: 'Bullion',
    currencyLabel: 'VAULT:',
    potLabel: 'SECURED CASH RESERVE',
    splitLabel: 'Split Cash Reserve (50%)',
    stealLabel: 'Crack & Heist (100%)',
    ballSplitText: 'SPLIT',
    ballStealText: 'HEIST',
    decisionPrompt: '🔒 Turn Dual-Key Vault Dial',
    scanBtnLabel: '🚨 Biometric Threat Scan',
    scanTitle: 'Sub-Vault Biometric Scanner',
    modes: {
      ai: { title: 'Vault Infiltrator Gauntlet', desc: 'Duel 5 master safecrackers, security chiefs, and rogue operatives.' },
      multiplayer: { title: 'Dual-Key Safe Network', desc: 'Link encrypted terminals with another operative in real time.' },
      pass_play: { title: 'Safe Pass & Play', desc: 'Enter secret vault dials on one device before door release.' },
      ladder: { title: 'Master Heist Ladder', desc: 'Advance from $25,000 Local Branch to the $10,000,000 Swiss Fortress.' }
    },
    bluffs: [
      { text: "Dual-key protocol engaged: locking in safe 50/50 split.", label: "🔒 'Dual-Key Split'" },
      { text: "Tripping the silent alarm with a heist locks us both out at $0.", label: "🚨 'Heist = Alarm Lockdown'" },
      { text: "I have cracked the master cipher. I am executing the HEIST.", label: "💰 'Master Heist Queued'" },
      { text: "Let's disarm the charges and walk out with equal bullion!", label: "⚡ 'Clean Safe Evacuation'" }
    ],
    ticker: [
      { text: '🔒 SWISS ARMORED VAULT SECTOR 9', type: 'neutral' },
      { text: '▲ TIME-LOCK: 45 SECONDS TO SEAL', type: 'up' },
      { text: '▲ BULLION RESERVE: $10,000,000 VERIFIED', type: 'up' },
      { text: '▼ LASER GRID: ARMED', type: 'down' },
      { text: '◈ BIOMETRICS: SCANNING DUAL KEYS', type: 'neutral' }
    ],
    tiers: [
      { id: 'tier1', name: 'Suburban Branch Safe Deposit', stake: 25000, minBankroll: 0, desc: 'Quick drill job on a regional bank safety deposit box.', icon: '🏦' },
      { id: 'tier2', name: 'Armored Transit Courier Convoy', stake: 100000, minBankroll: 25000, desc: 'Intercepting a fortified titanium transit shipment.', icon: '🚛' },
      { id: 'tier3', name: 'Federal Reserve Bullion Depot', stake: 500000, minBankroll: 150000, desc: 'Cracking the laser-guarded federal gold vault.', icon: '💰' },
      { id: 'tier4', name: 'Swiss Mountain Deep Bunkers', stake: 2000000, minBankroll: 750000, desc: 'Subterranean Alpine fortress carved into granite.', icon: '🏔️' },
      { id: 'tier5', name: 'Fort Knox Sovereign Master Vault', stake: 10000000, minBankroll: 2500000, desc: 'The legendary $10,000,000 titanium time-lock master vault.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'Rookie Lookout', icon: '🔦', color: '#94a3b8' },
      saint: { title: 'Honorable Syndicate Driver', icon: '🛡️', color: '#34d399' },
      thief: { title: 'Master Infiltrator', icon: '🥷', color: '#ef4444' },
      predator: { title: 'Rogue Safecracker', icon: '💣', color: '#f59e0b' },
      balancer: { title: 'Cipher Specialist', icon: '⚙️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'Nick "The Breaker" Corrigan',
        title: 'The Mastermind Infiltrator',
        avatar: '🥷',
        difficulty: 'Mastermind Rogue',
        quote: '"I have the bypass override. Take your 50% split or I trigger the lockdown on us both."',
        bio: 'Ruthless heist leader who holds the master detonator and commands the split terms.',
        initialDialogue: "Listen close. I have the master electronic bypass keyed to HEIST. Take the 50% split and bag your share, or I trip the halon gas and we both leave in handcuffs with $0.",
        tellNote: 'Finger resting steadily on the remote detonator. Zero pulse flicker.',
        bluffs: [
          "My electronic bypass is locked. Do not test my nerve.",
          "If you try to screw me, the laser grid fries the whole cash reserve.",
          "I've cracked 40 federal vaults. Take your cut and move.",
          "Enter the split key and let's get to the getaway van."
        ]
      },
      sarah: {
        name: 'Sarah "The Shield" Evans',
        title: 'The Chief Security Specialist',
        avatar: '🛡️',
        difficulty: 'Loyal Crewmate',
        quote: '"A clean job requires mutual trust. We split the bullion 50/50."',
        bio: 'Professional syndicate specialist who believes in clean getaways and absolute loyalty to partners.',
        initialDialogue: "We drilled through three feet of reinforced titanium to get here. 50/50 equal bags for both of us. I am turning my key to SPLIT.",
        tellNote: 'Calm biometric reading. Focused on disarming the secondary timer.',
        bluffs: [
          "I never betray a crew member. You have my word.",
          "Let's bag the bullion and walk out clean.",
          "Greedy rookies get caught. Professionals split the score.",
          "Turn your key to split and let's beat the alarm."
        ]
      },
      damian: {
        name: 'Damian "Slick" Vance',
        title: 'The Rogue Safecracker',
        avatar: '💣',
        difficulty: 'Predatory Traitor',
        quote: '"I swear on the whole heist crew, I am turning the dial to SPLIT!"',
        bio: 'Greedy demolitions expert who promises equal shares while planning to lock you inside the vault.',
        initialDialogue: "Look at all those gold bars stacked to the ceiling! We are both millionaires tonight! I already keyed in SPLIT on my dial. Do it now!",
        tellNote: 'Excessive thermal readings and sweaty palms on the vault wheel.',
        bluffs: [
          "I just dialed SPLIT! Hear the click?!",
          "I wouldn't leave a partner behind for anything!",
          "We've got five minutes before security arrives! Hit Split!",
          "Don't panic! The bags are already packed!"
        ]
      },
      jax: {
        name: 'Jax "Dynamite" Vega',
        title: 'The Demolitions Specialist',
        avatar: '⚡',
        difficulty: 'Wild Demolitions',
        quote: '"Thermite is burning through the hinges! Let\'s grab everything!"',
        bio: 'Explosives expert who thrives on alarms, flashing sirens, and reckless escapes.',
        initialDialogue: "The sirens are howling outside! Do we take a safe split or blast open the master vault for the whole $10M jackpot?! Let's go!",
        tellNote: 'Heart rate at 145 BPM. Adrenaline overdrive.',
        bluffs: [
          "Blast the hinges! Maximum payout!",
          "Maybe I split the cash, maybe I blow the vault door off completely!",
          "Hear those sirens?! Time is ticking!",
          "Go big or go to prison! Turn the dial!"
        ]
      },
      nash: {
        name: 'Arthur "The Cipher" Nash',
        title: 'The Cryptographic Architect',
        avatar: '⚙️',
        difficulty: 'Master Cryptographer',
        quote: '"The dual-key encryption algorithm dictates a 50/50 cooperative extraction."',
        bio: 'Former vault architect who designed the digital time-lock system and evaluates defection equations.',
        initialDialogue: "The time-lock algorithm requires synchronized dual-key entry. Defection trips the dead-man switch and burns the cash reserves to ash.",
        tellNote: 'Exact mathematical calculation. Thermal baseline stable.',
        bluffs: [
          "My decryption matrix indicates a 78% probability of successful split.",
          "Defection guarantees immediate vault atmospheric lockdown.",
          "A 50/50 haul maximizes post-escape laundering efficiency.",
          "Execute the cooperative cipher key immediately."
        ]
      }
    },
    announcements: {
      roundStart: "Subterranean vault door breached. Dual-key time-lock engaged.",
      tenSeconds: "Ten seconds before the pneumatic seal closes! Enter the dial key!",
      reveal: "Opening vault dual compartments. Three, two, one!",
      splitWin: "Clean heist! Both operatives secure equal shares of the vault cash!",
      stealWin: "Solo heist! You seized 100% of the vault cash reserve!",
      stealLose: "Locked in the vault! Counterparty escaped with all the loot!",
      mutualLose: "Alarm triggered! Vault locked down with all $0 cash trapped inside!"
    }
  },

  military_intelligence: {
    id: 'military_intelligence',
    name: 'Military Intelligence / Black Ops',
    icon: '🎯',
    brandTitle: 'WAR ROOM: DEFCON',
    brandBadge: 'BLACK OPS BUNKER',
    heroSubtitle: 'Top-Secret Black Ops Exfiltration',
    heroHeadline: 'WAR ROOM: DEFCON',
    heroTagline: 'Two covert operatives at the underground command console. One $10,000,000 classified black budget. Will you execute dual asset extraction, or go rogue and defect?',
    currencyName: 'Budget',
    currencyLabel: 'BUDGET:',
    potLabel: 'CLASSIFIED BLACK BUDGET POOL',
    splitLabel: 'Dual Extraction (50%)',
    stealLabel: 'Rogue Defection (100%)',
    ballSplitText: 'EXTRACT',
    ballStealText: 'DEFECT',
    decisionPrompt: '🎯 Turn Dual-Key Launch Dial',
    scanBtnLabel: '🛰️ Intercept Signal Telemetry',
    scanTitle: 'Covert Asset Satellite Telemetry',
    modes: {
      ai: { title: 'War Room Gauntlet', desc: 'Duel 5 rogue commanders, CIA handlers, and Pentagon game theory strategists.' },
      multiplayer: { title: 'Encrypted SATCOM Link', desc: 'Establish direct satellite uplink with another covert field operative.' },
      pass_play: { title: 'Bunker Pass & Play', desc: 'Enter classified launch coordinates on one terminal under strict red-line protocol.' },
      ladder: { title: 'DEFCON Clearance Ladder', desc: 'Advance from $25,000 Field Recon to the $10,000,000 Pentagon Black Budget.' }
    },
    bluffs: [
      { text: "Mission protocol locked: executing 50/50 dual extraction.", label: "🛰️ 'Dual Extraction'" },
      { text: "Going rogue triggers DEFCON 1 wipeout on both assets.", label: "⚠️ 'Defection = DEFCON Wipeout'" },
      { text: "I hold the master cipher key. Take the extraction split.", label: "🎯 'Preemptive Strike Ready'" },
      { text: "Let's exfiltrate the package together and secure our pensions.", label: "🎖️ 'Honor Mission Protocol'" }
    ],
    ticker: [
      { text: '🛰️ NORAD SECTOR 4 UPLINK', type: 'neutral' },
      { text: '▲ DEFCON STATUS: LEVEL 2', type: 'down' },
      { text: '▲ SATELLITE ENCRYPTION: 4096-BIT', type: 'up' },
      { text: '◈ EXTRACTION WINDOW: 45 SECONDS', type: 'neutral' },
      { text: '▲ BLACK BUDGET: $10,000,000 APPROVED', type: 'up' },
      { text: '▼ ASSET STATUS: ARMED & CLASSIFIED', type: 'down' }
    ],
    tiers: [
      { id: 'tier1', name: 'Field Reconnaissance Bounty', stake: 25000, minBankroll: 0, desc: 'Covert surveillance operation in hostile territory.', icon: '🎯' },
      { id: 'tier2', name: 'Black Ops Asset Exfiltration', stake: 100000, minBankroll: 25000, desc: 'High-risk extraction behind enemy borders.', icon: '🚁' },
      { id: 'tier3', name: 'NORAD Subterranean War Room', stake: 500000, minBankroll: 150000, desc: 'Classified standoff inside the Cheyenne Mountain bunker.', icon: '📡' },
      { id: 'tier4', name: 'Pentagon Special Access Budget', stake: 2000000, minBankroll: 750000, desc: 'Multi-million dollar covert operations fund with sovereign clearance.', icon: '🛰️' },
      { id: 'tier5', name: 'Top Secret DEFCON 1 Sovereign Protocol', stake: 10000000, minBankroll: 2500000, desc: 'The ultimate $10,000,000 black budget nuclear launch key duel.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'Field Operative', icon: '🎯', color: '#94a3b8' },
      saint: { title: 'Distinguished CIA Handler', icon: '🎖️', color: '#10b981' },
      thief: { title: 'Rogue Infiltrator', icon: '🥷', color: '#ef4444' },
      predator: { title: 'Rogue Warlord', icon: '💣', color: '#f59e0b' },
      balancer: { title: 'Pentagon Strategist', icon: '🛰️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'General Nick "Ironclad" Corrigan',
        title: 'The Rogue Warlord',
        avatar: '🎖️',
        difficulty: 'Apex Commander',
        quote: '"I have pre-targeted this position. Settle for 50% extraction or we both face court-martial at $0."',
        bio: 'Battle-hardened black ops commander who commands total submission through overwhelming firepower ultimatum.',
        initialDialogue: "Attention operative. I have pre-armed a preemptive rogue defection strike. You have zero tactical advantage. Accept the 50/50 extraction split, or we both get obliterated to $0.",
        tellNote: 'Combat heart rate stable at 50 BPM. Unflinching tactical gaze.',
        bluffs: [
          "My targeting telemetry is locked on DEFECT. Do not test my resolve.",
          "If you try to go rogue against my squad, we both face total terminal default.",
          "Every rookie who tried to double-cross me is classified as MIA.",
          "Authorize the extraction key and exfiltrate in one piece."
        ]
      },
      sarah: {
        name: 'Agent Sarah "Specter" Evans',
        title: 'The CIA Division Chief',
        avatar: '🛰️',
        difficulty: 'Loyal Handler',
        quote: '"Mission success relies on operative covenant. I am authorizing DUAL EXTRACTION."',
        bio: 'Senior intelligence chief who coordinates complex extractions with absolute fidelity to loyal agents.',
        initialDialogue: "We crossed through contested airspace to recover this asset. A 50/50 extraction completes our mission directives and secures our standing. I am turning my key to EXTRACT.",
        tellNote: 'Steady biometric signal on encrypted SATCOM. Zero deception.',
        bluffs: [
          "The Agency stands by our extraction covenant. I will not defect.",
          "Let's complete this mission cleanly and secure our full pensions.",
          "Going rogue will put you on every red-notice kill list worldwide.",
          "Operatives don't leave partners behind. Authorize extraction."
        ]
      },
      damian: {
        name: 'Major Damian "Ghost" Vance',
        title: 'The Double Agent',
        avatar: '🥷',
        difficulty: 'Predatory Traitor',
        quote: '"I swear on my Congressional Medal, I am turning the extraction key with you!"',
        bio: 'Deceptive mercenary operating as a triple agent who promises safe extraction while transferring the black budget to an offshore shell.',
        initialDialogue: "We did it, soldier! Ten million in black budget funds right on our console! On my military honor, my key is set to EXTRACT. Lock it in with me!",
        tellNote: 'Pulse spike detected during voice transmission. High likelihood of defection.',
        bluffs: [
          "I just keyed in EXTRACT! Check the terminal uplink!",
          "I would never leave a battle brother behind on hostile ground!",
          "The chopper is inbound in two minutes! Confirm Extract!",
          "Trust the chain of command! We both walk away rich!"
        ]
      },
      jax: {
        name: 'Jax "Reaper" Vega',
        title: 'The Combat Mercenary',
        avatar: '⚡',
        difficulty: 'Wild Commando',
        quote: '"Incoming artillery on our position! Who dares to pull the rogue trigger?!"',
        bio: 'Heavy-weapons contractor who thrives in hot extraction zones, sirens, and chaotic shootouts.',
        initialDialogue: "Perimeter alarms are blaring! Do we take the safe split or grab the whole black budget and shoot our way out?! Let's ride!",
        tellNote: 'Adrenaline spike: 155 BPM. High combat agitation.',
        bluffs: [
          "Blow the bunker doors! All-out extraction!",
          "Maybe I extract, maybe I seize the whole budget and vanish in the smoke!",
          "Hear that gunfire outside?! Decide before the air strike hits!",
          "No guts, no glory! Turn the launch dial!"
        ]
      },
      nash: {
        name: 'Colonel Arthur Nash',
        title: 'The Pentagon War Games Strategist',
        avatar: '📡',
        difficulty: 'Pentagon Game Theorist',
        quote: '"Deterrence theory dictates (Extract, Extract) as the sole stable Nash Equilibrium."',
        bio: 'War games architect calculating nuclear deterrence, mutual assured destruction, and game-theoretic payoff matrixes.',
        initialDialogue: "According to Pentagon crisis simulations, mutual defection results in Mutual Assured Destruction. A 50/50 dual extraction achieves mathematical mission optimality.",
        tellNote: 'Cold calculated logic. Flatline baseline.',
        bluffs: [
          "Strategic command models predict an 81% defection risk on uncoordinated keys.",
          "Rogue strikes trigger automatic counter-battery liquidation.",
          "A 50/50 extraction preserves strategic equilibrium.",
          "Adhere to tactical deterrence protocols immediately."
        ]
      }
    },
    announcements: {
      roundStart: "Classified war room session convened. Dual-key launch sequence armed.",
      tenSeconds: "Ten seconds to satellite lockout! Enter your mission order!",
      reveal: "Transmitting launch authorization. Three, two, one!",
      splitWin: "Mission accomplished! Dual extraction executed: budget disbursed equally!",
      stealWin: "Rogue defection! You seized 100% of the classified black budget!",
      stealLose: "Ambushed by double agent! Counterparty defected with the entire budget!",
      mutualLose: "DEFCON 1 total wipeout! Mutual defection triggered complete asset self-destruct!"
    }
  }
};

window.THEMES_DATA = THEMES_DATA;
