/**
 * ThemeContent - The Dilemma Theme Worlds & Copywriting Engine
 * 5 Rich Worlds tailored with light atmospheric accents emphasizing core Split or Steal mechanics:
 * 1. poker_tournament: Vegas High-Roller Poker Room (Chop vs All-In)
 * 2. trading_desk: Wall Street Trading Floor (Split vs Steal)
 * 3. hotel_lobby: Art Deco Grand Hotel (Split vs Seize)
 * 4. bank_vault: Armored Cash Vault (Share vs Raid)
 * 5. military_intelligence: DEFCON Command Bunker (Honor Pact vs Strike)
 */

const THEMES_DATA = {
  poker_tournament: {
    id: 'poker_tournament',
    name: 'High Stakes Arena',
    icon: '♠️',
    brandTitle: 'THE SHOWDOWN',
    brandBadge: 'HIGH ROLLER',
    heroSubtitle: 'High Stakes Arena • Vegas Championship',
    heroHeadline: 'THE SHOWDOWN',
    heroTagline: 'Two poker players. One massive chip pot. Will you chop the pot 50/50, or push ALL-IN to steal the whole stack?',
    currencyName: 'Chips',
    currencyLabel: 'CHIPS:',
    potLabel: 'CHIP JACKPOT',
    splitLabel: '50% Chop',
    stealLabel: '100% All-In',
    ballSplitText: 'CHOP',
    ballStealText: 'ALL-IN',
    decisionPrompt: '♠️ Lock In Secret Poker Decision',
    scanBtnLabel: '🔍 Read Tells',
    scanTitle: 'Live Player Tell Analysis',
    hotline: {
      icon: '🍸',
      title: 'Pit Boss Intercom:',
      status: 'VIP Drink Orders & Table Telemetry',
      btnText: '🍸 Check Intercom',
      whispers: [
        '🍸 Pit Boss: "High roller at Table 4 is pre-committing. Watch their pulse."',
        '🍸 Waitress: "Martini on the house, sir. Opponent\'s chip stack is trembling."',
        '🍸 Floor Manager: "Table telemetry indicates high bluff probability on the river."',
        '🍸 Security: "Counterparty has a tell when looking at the prize chips."'
      ]
    },
    modes: {
      ai: { title: 'Heads-Up AI Duel', desc: 'Face 5 distinct poker personalities from solid rocks to aggressive sharks.' },
      multiplayer: { title: 'Private Poker Room', desc: 'Create or join a private 1v1 heads-up room with a friend in real time.' },
      pass_play: { title: 'Local Table Duel', desc: 'Play on one device. Pass the phone and lock in secret decisions before showdown.' },
      ladder: { title: 'High-Roller Ladder', desc: 'Climb from $25,000 Micro Stakes to the $10,000,000 Championship.' }
    },
    bluffs: [
      { text: "I'm checking down to chop. Lock in the 50/50!", label: "♠️ '100% Chop Pot'" },
      { text: "If we both shove all-in, we both bust with $0.", label: "⚠️ 'Both Steal = $0'" },
      { text: "I am pushing all-in. Your only smart move is to chop.", label: "🃏 'Shoving All-In'" },
      { text: "Let's split the prize and walk away winners!", label: "🏆 'Split the Prize!'" }
    ],
    ticker: [
      { text: '♠ FINAL TABLE HEADS-UP', type: 'neutral' },
      { text: '▲ CHIP LEADER: $2,500,000', type: 'up' },
      { text: '◈ SHOWDOWN CLOCK: 45 SECONDS', type: 'neutral' },
      { text: '▲ 50/50 CHOP OR SOLO ALL-IN STEAL', type: 'up' }
    ],
    tiers: [
      { id: 'tier1', name: 'Micro Stakes Table', stake: 25000, minBankroll: 0, desc: 'Casual friendly card game to test your reads.', icon: '♣️' },
      { id: 'tier2', name: 'Bellagio High Roller', stake: 100000, minBankroll: 25000, desc: 'Heads-up battle under the bright Vegas spotlights.', icon: '♦️' },
      { id: 'tier3', name: 'Monte Carlo Invitational', stake: 500000, minBankroll: 150000, desc: 'Prestigious cash game with high-stakes players.', icon: '♥️' },
      { id: 'tier4', name: 'Macau Big Game', stake: 2000000, minBankroll: 750000, desc: 'Exclusive VIP room with seven-figure chip swings.', icon: '♠️' },
      { id: 'tier5', name: '$10M World Championship', stake: 10000000, minBankroll: 2500000, desc: 'The ultimate heads-up showdown for $10,000,000.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'Calling Station', icon: '🃏', color: '#94a3b8' },
      saint: { title: 'Honorable Card Shark', icon: '🏆', color: '#22c55e' },
      thief: { title: 'Ruthless Bluff King', icon: '🦈', color: '#ef4444' },
      predator: { title: 'All-In Bully', icon: '⚡', color: '#eab308' },
      balancer: { title: 'GTO Strategist', icon: '⚖️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'Nick "The Bully" Corrigan',
        title: 'The Table Bully',
        avatar: '🤠',
        difficulty: 'Aggressive Bully',
        quote: '"I am locking in All-In every single time. Take the chop or we both get $0."',
        bio: 'Aggressive player who tells you upfront he is stealing to force you into splitting.',
        initialDialogue: "Look, I am shoving ALL-IN. Take the 50/50 chop, or we both leave empty-handed.",
        tellNote: 'Steady posture, unflinching eye contact.',
        bluffs: [
          "My decision is locked on All-In.",
          "If you try to steal too, we both bust with $0.",
          "Take the chop and walk away with your half.",
          "I don't fold. Ever."
        ]
      },
      sarah: {
        name: 'Sarah Evans',
        title: 'The Trusted Pro',
        avatar: '👑',
        difficulty: 'Honest Partner',
        quote: '"Let us split the pot 50/50. Fair play is always the best move."',
        bio: 'Reliable and fair player who prefers mutual splits, but will remember if you betray her.',
        initialDialogue: "We both played great to get here. Let's chop the pot 50/50 and walk away winners.",
        tellNote: 'Calm breathing, relaxed table presence. Zero deception detected.',
        bluffs: [
          "I promise I am choosing the Chop.",
          "Let's both take our winnings home.",
          "Greed ruins everything. Let's split it.",
          "I'm keeping my word."
        ]
      },
      damian: {
        name: 'Damian Vance',
        title: 'The Smooth Hustler',
        avatar: '🐺',
        difficulty: 'Sneaky Hustler',
        quote: '"On my honor, I am choosing the chop! Lock it in with me!"',
        bio: 'Charismatic hustler who promises a clean split while secretly planning to steal.',
        initialDialogue: "Great game, partner! On my honor, I'm locking in CHOP right now. Let's do this together!",
        tellNote: 'Glancing at the prize pool with dilated pupils. High deception tell.',
        bluffs: [
          "I already locked in Chop, trust me!",
          "We both walk away rich today. Just hit Chop.",
          "Why would I lie to you? Let's split it!",
          "Don't overthink it, partner!"
        ]
      },
      jax: {
        name: 'Jax Vega',
        title: 'The Wildcard',
        avatar: '⚡',
        difficulty: 'Unpredictable',
        quote: '"Pure gamble! Let us see who has the courage!"',
        bio: 'Unpredictable player who thrives on high tension and sudden moves.',
        initialDialogue: "The tension is wild! Are we splitting the jackpot or going for glory?! Let's find out!",
        tellNote: 'Rapid chip shuffling and sudden pulse spikes.',
        bluffs: [
          "All-in or split, what does your gut say?!",
          "Maybe I split, maybe I take it all!",
          "High stakes, big moves!",
          "Show me what you've got!"
        ]
      },
      nash: {
        name: 'Dr. Arthur Nash',
        title: 'The Mathematician',
        avatar: '📊',
        difficulty: 'Game Theorist',
        quote: '"Game theory shows (Split, Split) maximizes collective profit."',
        bio: 'Analytical player who follows clean expected value calculations.',
        initialDialogue: "A 50/50 split gives both of us positive profit. Stealing introduces mutual $0 risk.",
        tellNote: 'Composed posture, steady heartbeat.',
        bluffs: [
          "Mathematical logic favors a clean 50/50 split.",
          "Stealing creates negative expected value for both sides.",
          "Let's make the rational choice and split.",
          "Discipline beats emotion."
        ]
      }
    },
    hedge: {
      title: '🛡️ Table Insurance Option',
      badge: 'INSURED',
      desc: 'Pay 10% premium on 50/50 chop to secure a guaranteed 20% chip floor if opponent pushes All-In.'
    },
    announcements: {
      roundStart: "Forty-five seconds on the clock at the high-stakes final table! Who do you trust?! Will you honor the chop or shove all-in to steal the whole stack?!",
      tenSeconds: "Ten seconds! The clock is ticking down, lock it in NOW!",
      reveal: "Showdown on the river! Moment of truth... REVEAL!",
      splitWin: "BOOM! A gentleman's chop! You both walk away with a mountain of chips!",
      stealWin: "COLD-BLOODED! You took every single chip off the table! What a legendary steal!",
      stealLose: "Ouch! You got played! Opponent snapped off the pot and took the whole stack!",
      mutualLose: "Total carnage! Both players shoved all-in, both walk away with ZERO!",
      hedgeDeflect: "Table Insurance activated! The hostile All-In was deflected, recovering twenty percent of the chip stack!"
    }
  },

  trading_desk: {
    id: 'trading_desk',
    name: 'Trading Floor',
    icon: '📊',
    brandTitle: 'THE EQUILIBRIUM',
    brandBadge: 'GAME THEORY',
    heroSubtitle: 'Trading Floor • Nash Equilibrium & Payoffs',
    heroHeadline: 'THE EQUILIBRIUM',
    heroTagline: 'Two traders. One capital pool. Will you cooperate to lock in a 50/50 split, or defect to capture 100% of the alpha?',
    currencyName: 'NAV',
    currencyLabel: 'ESCROW:',
    potLabel: 'CAPITAL POOL',
    splitLabel: '50% Split',
    stealLabel: '100% Steal',
    ballSplitText: 'SPLIT',
    ballStealText: 'STEAL',
    decisionPrompt: '🔒 Lock In Secret Trade Decision',
    scanBtnLabel: '🔍 Scan Risk',
    scanTitle: 'Live Telemetry Risk Scan',
    hotline: {
      icon: '📞',
      title: 'Broker Wire:',
      status: 'Wall Street order flow active',
      btnText: '📞 Answer Phone',
      whispers: [
        '📞 Broker Wire: "Heavy institutional liquidity surge on Split side! Execute with conviction!"',
        '📞 Floor Desk: "Block order filled: 25,000 contracts! Counterparty order book is imbalanced."',
        '📞 Head Trader: "Bid/Ask spread tightening. Do not let them short your position."',
        '📞 Analyst Desk: "Arbitrage opportunity open for the next 20 seconds. Take the split!"'
      ]
    },
    modes: {
      ai: { title: 'Trading Desk AI Duel', desc: 'Negotiate deals against 5 Wall Street trading personalities.' },
      multiplayer: { title: 'Private Deal Room', desc: 'Create an encrypted trade room with another player in real time.' },
      pass_play: { title: 'Local Floor Duel', desc: 'Play on one device. Pass the phone and enter secret trade decisions.' },
      ladder: { title: 'Capital Stakes Ladder', desc: 'Climb from $25,000 Seed Capital to the $10,000,000 Mega Fund.' }
    },
    bluffs: [
      { text: "I am locking in the 50/50 SPLIT. Let's close the deal.", label: "🤝 '100% Split'" },
      { text: "If we both steal, the trade fails and we both get $0.", label: "⚠️ 'Both Steal = $0'" },
      { text: "I am taking the steal. Your only safe move is to split.", label: "💼 'Locking in Steal'" },
      { text: "Let's share the profit 50/50 and close out green!", label: "📈 'Split the Profit!'" }
    ],
    ticker: [
      { text: '▲ S&P DEAL DESK ACTIVE', type: 'up' },
      { text: '◈ ESCROW LIQUIDITY: $500,000', type: 'neutral' },
      { text: '▲ 50/50 SYNDICATE OR 100% TAKEOVER', type: 'up' },
      { text: '◈ DECISION TIMER: 45 SECONDS', type: 'neutral' }
    ],
    tiers: [
      { id: 'tier1', name: 'Seed Capital Desk', stake: 25000, minBankroll: 0, desc: 'Introductory trade pool to build your balance.', icon: '🌱' },
      { id: 'tier2', name: 'Growth Syndicate', stake: 100000, minBankroll: 25000, desc: 'Mid-tier investment desk with six-figure stakes.', icon: '📊' },
      { id: 'tier3', name: 'Institutional Block', stake: 500000, minBankroll: 150000, desc: 'Heavy institutional deal desk.', icon: '🏢' },
      { id: 'tier4', name: 'Hedge Fund Pool', stake: 2000000, minBankroll: 750000, desc: 'High-conviction portfolio allocation.', icon: '⚡' },
      { id: 'tier5', name: '$10M Mega Fund', stake: 10000000, minBankroll: 2500000, desc: 'The ultimate $10,000,000 trading showdown.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'Junior Analyst', icon: '💼', color: '#94a3b8' },
      saint: { title: 'Fiduciary Partner', icon: '📈', color: '#22c55e' },
      thief: { title: 'Hostile Raider', icon: '🦈', color: '#ef4444' },
      predator: { title: 'Market Maker', icon: '⚡', color: '#eab308' },
      balancer: { title: 'Portfolio Manager', icon: '⚖️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'Nick Corrigan',
        title: 'The Activist Raider',
        avatar: '🤠',
        difficulty: 'Hostile Raider',
        quote: '"I am executing a takeover. Take the split or we both walk away with zero."',
        bio: 'Aggressive dealmaker who uses strongarm tactics to force counterparties into splitting.',
        initialDialogue: "I am locking in STEAL. Your only rational move is to SPLIT and take half. If you steal too, we both get $0.",
        tellNote: 'Cold baseline, no hesitation.',
        bluffs: [
          "My order is in for Steal.",
          "Don't blow up the trade for both of us.",
          "Split the pot and secure your profit.",
          "I never flinch."
        ]
      },
      sarah: {
        name: 'Sarah Evans',
        title: 'The Managing Partner',
        avatar: '👑',
        difficulty: 'Honest Partner',
        quote: '"A clean 50/50 split is the best outcome for both sides. Let us close it."',
        bio: 'Principled investor who values mutual profit and fair partnerships.',
        initialDialogue: "We can both make great returns here. I am locking in SPLIT. Let's finish this clean.",
        tellNote: 'Calm and steady, zero deception signs.',
        bluffs: [
          "I always honor the split.",
          "Let's share the returns fairly.",
          "A solid deal benefits both desks.",
          "Lock in Split with me."
        ]
      },
      damian: {
        name: 'Damian Vance',
        title: 'The Arbitrageur',
        avatar: '🐺',
        difficulty: 'Sneaky Trader',
        quote: '"Trust me on this one, I have already locked in the split!"',
        bio: 'Silver-tongued trader who feigns partnership while aiming to take 100%.',
        initialDialogue: "We have an incredible deal on the table. I'm 100% on SPLIT. Lock it in with me!",
        tellNote: 'Restless eye movements. High deception probability.',
        bluffs: [
          "Split is locked in on my side!",
          "We both profit today. Just choose Split.",
          "Don't worry, this is an easy win-win.",
          "Trust the process!"
        ]
      },
      jax: {
        name: 'Jax Vega',
        title: 'The Momentum Trader',
        avatar: '⚡',
        difficulty: 'Unpredictable',
        quote: '"Big volatility, big reward! Let us see what happens!"',
        bio: 'High-speed trader who loves chaotic moves and sudden surprises.',
        initialDialogue: "Market is flying! Are we splitting the profits or going for the whole bag?!",
        tellNote: 'High pulse fluctuations.',
        bluffs: [
          "Split or steal, let's ride the wave!",
          "Anything can happen on this floor!",
          "Make your call!",
          "Fortune favors the bold!"
        ]
      },
      nash: {
        name: 'Dr. Arthur Nash',
        title: 'The Quantitative Analyst',
        avatar: '📊',
        difficulty: 'Game Theorist',
        quote: '"Equilibrium confirms a 50/50 split is the optimal strategy."',
        bio: 'Mathematical strategist focused on risk-adjusted outcomes.',
        initialDialogue: "Game theory proves a mutual split maximizes expected returns. Defection introduces total capital loss.",
        tellNote: 'Steady telemetry, purely analytical.',
        bluffs: [
          "A 50/50 split protects both balances.",
          "Stealing creates unnecessary drawdown risk.",
          "Rational trading requires splitting.",
          "Follow the data."
        ]
      }
    },
    hedge: {
      title: '🛡️ Downside Covered Call Hedge',
      badge: 'HEDGED',
      desc: 'Cap split upside by 10% premium to secure a guaranteed 20% floor return if counterparty steals.'
    },
    announcements: {
      roundStart: "The opening bell has rung on Wall Street! Millions on the line... will you cooperate or execute a hostile takeover?!",
      tenSeconds: "Closing bell in ten seconds! Execute your order immediately!",
      reveal: "Market close! All orders locked... let's see the fills!",
      splitWin: "Perfect equilibrium! Both desks profit and the fund wins big!",
      stealWin: "Hostile takeover complete! You wiped out the competition and captured 100% of the alpha!",
      stealLose: "Short squeezed! Counterparty dumped the position and took the entire fund!",
      mutualLose: "Market crash! Mutual greed wiped out both portfolios to absolute zero!",
      hedgeDeflect: "Downside hedge triggered! Hostile takeover absorbed, securing twenty percent floor capital!"
    }
  },

  hotel_lobby: {
    id: 'hotel_lobby',
    name: 'Hotel Room',
    icon: '🛎️',
    brandTitle: 'GOLDEN BALLS',
    brandBadge: 'ORIGINAL',
    heroSubtitle: 'Hotel Room • Split or Steal',
    heroHeadline: 'GOLDEN BALLS',
    heroTagline: 'Two players. One sealed jackpot. Will you split the golden balls 50/50, or steal to take home 100%?',
    currencyName: 'Deposit',
    currencyLabel: 'JACKPOT:',
    potLabel: 'GOLDEN BALLS JACKPOT',
    splitLabel: '50% Split',
    stealLabel: '100% Steal',
    ballSplitText: 'SPLIT',
    ballStealText: 'STEAL',
    decisionPrompt: '🛎️ Lock In Secret Golden Balls Decision',
    scanBtnLabel: '🔍 Read Composure',
    scanTitle: 'Player Composure Analysis',
    hotline: {
      icon: '🛎️',
      title: 'Concierge Phone:',
      status: 'Suite 402 Private Rotary Line',
      btnText: '🛎️ Pick Up Line',
      whispers: [
        '🛎️ Concierge: "Suite 402 champagne delivered. The contract terms are non-negotiable."',
        '🛎️ Front Desk: "A private courier has arrived with the sealed syndicate documents."',
        '🛎️ Maître d\': "Discretion is advised. The counterparty has a history of sudden departures."',
        '🛎️ Bellhop: "The limousine is waiting outside. Lock in your decision before midnight."'
      ]
    },
    modes: {
      ai: { title: 'Golden Balls AI Duel', desc: 'Face 5 distinct personalities in the classic Split or Steal standoff.' },
      multiplayer: { title: 'Private Golden Room', desc: 'Challenge a friend to a real-time Split or Steal showdown.' },
      pass_play: { title: 'Local Table Duel', desc: 'Pass the device across the table to enter secret decisions.' },
      ladder: { title: 'Golden Ladder', desc: 'Climb from $25,000 Salon Stakes to the $10,000,000 Grand Finale.' }
    },
    bluffs: [
      { text: "I am honoring the 50/50 SPLIT. Let's enjoy our winnings.", label: "🛎️ '100% Split'" },
      { text: "If we both try to seize it, the house claims everything ($0).", label: "⚠️ 'Both Seize = $0'" },
      { text: "I am taking the full deposit. Your only return is to split.", label: "💼 'Seizing the Box'" },
      { text: "A gentleman's agreement: split the prize 50/50!", label: "🥂 'Split 50/50!'" }
    ],
    ticker: [
      { text: '🛎 VIP LOUNGE ESCROW ACTIVE', type: 'neutral' },
      { text: '▲ PENTHOUSE VAULT: $1,000,000', type: 'up' },
      { text: '◈ DECISION CLOCK: 45 SECONDS', type: 'neutral' },
      { text: '▲ SPLIT THE BOX OR SEIZE 100%', type: 'up' }
    ],
    tiers: [
      { id: 'tier1', name: 'Private Salon', stake: 25000, minBankroll: 0, desc: 'Quiet fireside table in the private salon.', icon: '🕯️' },
      { id: 'tier2', name: 'Crystal Ballroom', stake: 100000, minBankroll: 25000, desc: 'High-society gathering under crystal chandeliers.', icon: '🥂' },
      { id: 'tier3', name: 'Ambassador Suite', stake: 500000, minBankroll: 150000, desc: 'Exclusive suite overlooking the city skyline.', icon: '🏛️' },
      { id: 'tier4', name: 'Presidential Penthouse', stake: 2000000, minBankroll: 750000, desc: 'Private penthouse with top-tier stakes.', icon: '💎' },
      { id: 'tier5', name: 'Imperial Grand Reserve', stake: 10000000, minBankroll: 2500000, desc: 'The historic $10,000,000 Continental showdown.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'Hotel Guest', icon: '🛎️', color: '#94a3b8' },
      saint: { title: 'Gentleman Benefactor', icon: '🥂', color: '#22c55e' },
      thief: { title: 'Artful Infiltrator', icon: '🦈', color: '#ef4444' },
      predator: { title: 'Continental Syndicate', icon: '⚡', color: '#eab308' },
      balancer: { title: 'Diplomatic Negotiator', icon: '⚖️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'Nick Corrigan',
        title: 'The Continental Broker',
        avatar: '🤠',
        difficulty: 'Ruthless Broker',
        quote: '"I am taking the full deposit. Accept the split or we both leave with nothing."',
        bio: 'Uncompromising negotiator who states his intent to seize the pot to force a split.',
        initialDialogue: "I am locking in SEIZE. Take the 50/50 split and walk away with your half. If you seize too, neither of us gets a dime.",
        tellNote: 'Impeccable poise, relaxed grip on his champagne flute.',
        bluffs: [
          "My choice is locked on Seize.",
          "Don't lose your half out of stubbornness.",
          "Accept the split and enjoy your payout.",
          "I never change my mind."
        ]
      },
      sarah: {
        name: 'Sarah Evans',
        title: 'The Diplomat',
        avatar: '👑',
        difficulty: 'Honest Partner',
        quote: '"Honor and trust make the best partnerships. Let us divide the deposit."',
        bio: 'Gracious and honest guest who always respects agreements.',
        initialDialogue: "It is a pleasure sharing this table with you. I am choosing SPLIT. Let's share the prize fairly.",
        tellNote: 'Serene composure, perfectly steady pulse.',
        bluffs: [
          "I give you my word, I am choosing Split.",
          "Let's both walk away with our share.",
          "Mutual trust is always the right move.",
          "Lock in Split with me."
        ]
      },
      damian: {
        name: 'Damian Vance',
        title: 'The Smooth Operator',
        avatar: '🐺',
        difficulty: 'Charming Trickster',
        quote: '"A toast to an easy partnership! I am locking in the split right now."',
        bio: 'Charming socialite who acts like your best friend while secretly planning to steal.',
        initialDialogue: "What a marvelous evening! On my honor, I'm choosing SPLIT. Lock it in with me and let's celebrate!",
        tellNote: 'Subtle micro-sweat and quick glances at the deposit box.',
        bluffs: [
          "I already pushed Split, my friend!",
          "We both win tonight. Just choose Split.",
          "Why would I ruin such a wonderful evening?",
          "Cheers to our win-win!"
        ]
      },
      jax: {
        name: 'Jax Vega',
        title: 'The High-Roller Playmaker',
        avatar: '⚡',
        difficulty: 'Bold Gambler',
        quote: '"Where is the thrill in playing it safe?! Let us see who dares!"',
        bio: 'Daring high-roller who loves testing the nerves of his counterparties.',
        initialDialogue: "The stakes in this suite are unforgettable! Are we sharing the prize or fighting for all of it?!",
        tellNote: 'Restless smile, lively energy.',
        bluffs: [
          "Split or seize, what is your move?!",
          "Let's make this round one to remember!",
          "Trust your instincts!",
          "Let the best hand win!"
        ]
      },
      nash: {
        name: 'Dr. Arthur Nash',
        title: 'The Game Theorist',
        avatar: '📊',
        difficulty: 'Rational Strategist',
        quote: '"A mutual split minimizes risk and guarantees substantial returns."',
        bio: 'Calculated scholar who values clean, low-variance splits.',
        initialDialogue: "The mathematical payout strongly recommends a 50/50 split. Mutual defect results in total loss.",
        tellNote: 'Steady breathing, focused analysis.',
        bluffs: [
          "Splitting guarantees an optimal payout.",
          "Attempting to seize creates catastrophic failure risk.",
          "Let us act rationally and split.",
          "Logic always wins."
        ]
      }
    },
    hedge: {
      title: '🛡️ Concierge Escrow Guarantee',
      badge: 'ESCROW',
      desc: 'Forfeit 10% of diplomatic division to guarantee a 20% suite reserve if counterparty seizes pot.'
    },
    announcements: {
      roundStart: "Welcome to the Penthouse Suite! A massive fortune in the room safe... will you share like royalty or run a dirty hustle?!",
      tenSeconds: "Checkout in ten seconds! Final decision time!",
      reveal: "Keys on the counter! Let's pop the champagne and reveal!",
      splitWin: "Magnificent! A lavish 50/50 split! Champagne for everyone!",
      stealWin: "Pure scandal! You slipped out the back door with the entire inheritance!",
      stealLose: "Betrayed in paradise! Opponent took the keys and left you with the bill!",
      mutualLose: "Absolute catastrophe! Both tried to steal and the hotel seized everything!",
      hedgeDeflect: "Concierge escrow activated! Twenty percent diplomatic reserve preserved!"
    }
  },

  bank_vault: {
    id: 'bank_vault',
    name: 'Bank / Cash Vault',
    icon: '🔒',
    brandTitle: 'THE VAULT',
    brandBadge: 'SECURE FORTRESS',
    heroSubtitle: 'Subterranean Armored Vault',
    heroHeadline: 'THE VAULT',
    heroTagline: 'Two infiltrators. One master cash vault. Will you share the gold 50/50, or trigger a solo heist to steal it all?',
    currencyName: 'Bullion',
    currencyLabel: 'VAULT:',
    potLabel: 'VAULT GOLD RESERVES',
    splitLabel: '50% Share',
    stealLabel: '100% Raid',
    ballSplitText: 'SHARE',
    ballStealText: 'RAID',
    decisionPrompt: '🔒 Enter Confidential Safe Code',
    scanBtnLabel: '🔍 Read Biometrics',
    scanTitle: 'Vault Biometric Security Scan',
    hotline: {
      icon: '📻',
      title: 'Getaway Radio:',
      status: 'Encrypted Van Channel 4',
      btnText: '📻 Radio Check',
      whispers: [
        '📻 Getaway Van: "Security cameras looped for 30 more seconds. Secure the bullion now!"',
        '📻 Hacker: "Thermal drill at 98%. Silent alarms remain dormant... choose wisely."',
        '📻 Lookout: "Guard patrol approaching subterranean sector B in 20 seconds!"',
        '📻 Demolitions: "Charges are armed. Grab your share and head for the escape tunnel."'
      ]
    },
    modes: {
      ai: { title: 'Vault Infiltration Duel', desc: 'Crack the vault against 5 master safe-crackers and security pros.' },
      multiplayer: { title: 'Private Vault Chamber', desc: 'Connect to an encrypted vault chamber with another player in real time.' },
      pass_play: { title: 'Local Chamber Duel', desc: 'Pass the device to enter secret keypad codes before the time lock opens.' },
      ladder: { title: 'Vault Security Ladder', desc: 'Work your way from $25,000 Safety Deposit to the $10,000,000 Central Reserve.' }
    },
    bluffs: [
      { text: "I'm entering the 50/50 SHARE code. Let's split the gold.", label: "🤝 '100% Share'" },
      { text: "If we both raid, the security lockdown triggers ($0 for both).", label: "⚠️ 'Both Raid = $0'" },
      { text: "I am taking the full haul. Your only safe payout is to share.", label: "💼 'Raid in Progress'" },
      { text: "50/50 share! We both get out rich with the gold.", label: "💰 'Split the Gold!'" }
    ],
    ticker: [
      { text: '🔒 HYPER-ARMORED TIME LOCK ACTIVE', type: 'neutral' },
      { text: '▲ CENTRAL RESERVE: $2,000,000 GOLD', type: 'up' },
      { text: '◈ TIME LOCK DECAY: 45 SECONDS', type: 'neutral' },
      { text: '▲ 50/50 MUTUAL SHARE OR 100% RAID', type: 'up' }
    ],
    tiers: [
      { id: 'tier1', name: 'Safety Deposit Box', stake: 25000, minBankroll: 0, desc: 'Standard security box with modest cash stacks.', icon: '🗝️' },
      { id: 'tier2', name: 'Armored Cash Transit', stake: 100000, minBankroll: 25000, desc: 'Heavily guarded cash shipment.', icon: '🚚' },
      { id: 'tier3', name: 'Swiss Diamond Chamber', stake: 500000, minBankroll: 150000, desc: 'Subterranean diamond and bullion vault.', icon: '💎' },
      { id: 'tier4', name: 'Federal Gold Depository', stake: 2000000, minBankroll: 750000, desc: 'Fort Knox grade titanium reserve.', icon: '🏛️' },
      { id: 'tier5', name: 'Sovereign Central Reserve', stake: 10000000, minBankroll: 2500000, desc: 'The ultimate $10,000,000 gold bullion heist.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'Rookie Safe-Cracker', icon: '🗝️', color: '#94a3b8' },
      saint: { title: 'Master Partner', icon: '💰', color: '#22c55e' },
      thief: { title: 'Apex Heist Master', icon: '🦈', color: '#ef4444' },
      predator: { title: 'Vault Enforcer', icon: '⚡', color: '#eab308' },
      balancer: { title: 'Security Architect', icon: '⚖️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'Nick Corrigan',
        title: 'The Enforcer',
        avatar: '🤠',
        difficulty: 'Ruthless Raider',
        quote: '"I am taking the full haul. Share the pot or we both trigger the security alarm."',
        bio: 'Tough vault raider who forces counterparties into taking the split.',
        initialDialogue: "I am entering the RAID code. Enter SHARE to take half, or we both trigger lockdown and walk away with $0.",
        tellNote: 'Heavy steady breathing, unblinking focus on the safe dial.',
        bluffs: [
          "My code is set to Raid.",
          "Don't trigger the security lockdown for nothing.",
          "Take your half of the gold and walk.",
          "I never back down."
        ]
      },
      sarah: {
        name: 'Sarah Evans',
        title: 'The Master Hacker',
        avatar: '👑',
        difficulty: 'Honest Partner',
        quote: '"Clean split, clean getaway. Let us share the gold 50/50."',
        bio: 'Professional safe-cracker who values precision and fair cuts.',
        initialDialogue: "The vault door is open. I am entering SHARE. Let's take our half and get out clean.",
        tellNote: 'Calm biometrics, zero alarms detected.',
        bluffs: [
          "I am locking in Share, 100%.",
          "Let's split the haul and celebrate.",
          "Greed triggers alarms. Share the gold.",
          "Count on me."
        ]
      },
      damian: {
        name: 'Damian Vance',
        title: 'The Grifter',
        avatar: '🐺',
        difficulty: 'Sneaky Infiltrator',
        quote: '"On my life, I have entered the Share code! We are in this together!"',
        bio: 'Fast-talking rogue who promises equal shares while pocketing everything.',
        initialDialogue: "Jackpot! The gold is ours! I've already locked in SHARE. Enter Share with me!",
        tellNote: 'Sweating palms, quick side-glances at the exit.',
        bluffs: [
          "I already entered the Share code, partner!",
          "We both get out rich today. Just hit Share.",
          "Why would I cross a teammate? Let's split it!",
          "Hurry before the timer runs out!"
        ]
      },
      jax: {
        name: 'Jax Vega',
        title: 'The Demolitions Expert',
        avatar: '⚡',
        difficulty: 'High-Voltage Rogue',
        quote: '"Blow the hinges and take the loot! Let us see who grabs it!"',
        bio: 'Chaotic infiltrator who loves explosive risks.',
        initialDialogue: "The vault timer is counting down! Are we sharing the loot or grabbing the whole bag?!",
        tellNote: 'Erratic pulse spikes.',
        bluffs: [
          "Share or raid, what is your call?!",
          "Time is ticking down fast!",
          "Make your move!",
          "Big risks, big rewards!"
        ]
      },
      nash: {
        name: 'Dr. Arthur Nash',
        title: 'The Cryptanalyst',
        avatar: '📊',
        difficulty: 'Math Strategist',
        quote: '"Sharing the reserves eliminates all lockdown risk."',
        bio: 'Mathematical cryptanalyst who designs optimal cipher splits.',
        initialDialogue: "Cipher analysis shows a mutual share yields optimal returns. Raiding risks total vault lockdown.",
        tellNote: 'Flatline pulse, purely analytical posture.',
        bluffs: [
          "Sharing guarantees an optimal payout.",
          "Raiding carries unacceptable lockdown risk.",
          "Let's act logically and share the gold.",
          "Data over greed."
        ]
      }
    },
    hedge: {
      title: '🛡️ Dead-Man Vault Reserve',
      badge: 'PROTECTED',
      desc: 'Commit 10% split fee to lock in a guaranteed 20% subterranean reserve if counterparty raids pot.'
    },
    announcements: {
      roundStart: "The vault door is cracked! Solid gold bars on the floor... will you split the loot or betray your partner in crime?!",
      tenSeconds: "Silent alarm in ten seconds! Grab the bag and lock it in!",
      reveal: "Duffel bags on the table... three, two, one, unmask!",
      splitWin: "Clean getaway! Honor among thieves, both walking away filthy rich!",
      stealWin: "Masterclass heist! You double-crossed your crew and took every last bar of gold!",
      stealLose: "Left in the dust! Your partner ghosted you and took the entire loot!",
      mutualLose: "Greed triggered the alarm! Laser grid tripped, both get arrested with zero!",
      hedgeDeflect: "Subterranean vault reserve locked! Twenty percent gold bullion recovered from the heist!"
    }
  },

  military_intelligence: {
    id: 'military_intelligence',
    name: 'Military Intelligence / Black Ops',
    icon: '🎯',
    brandTitle: 'WAR ROOM',
    brandBadge: 'DEFCON COMMAND',
    heroSubtitle: 'DEFCON Subterranean War Room',
    heroHeadline: 'WAR ROOM: DEFCON',
    heroTagline: 'Two commanders. One classified defense fund. Will you honor the joint pact, or launch a unilateral strike to seize 100%?',
    currencyName: 'Budget',
    currencyLabel: 'BUDGET:',
    potLabel: 'CLASSIFIED WAR CHEST',
    splitLabel: '50% Pact',
    stealLabel: '100% Strike',
    ballSplitText: 'PACT',
    ballStealText: 'STRIKE',
    decisionPrompt: '🎯 Turn Secret Launch Key',
    scanBtnLabel: '📡 Read Radar',
    scanTitle: 'Tactical Deception Radar',
    hotline: {
      icon: '🔴',
      title: 'Pentagon Hotline:',
      status: 'DEFCON 1 Red Phone Link',
      btnText: '🔴 Red Phone',
      whispers: [
        '🔴 Pentagon Hotline: "DEFCON 1 protocol verified. Confirm split or defect authorization."',
        '🔴 Tactical Comms: "Satellite telemetry shows lock-in sequence initiated by counterpart."',
        '🔴 Joint Command: "Nuclear handshake encryption code verified. Zero second delay."',
        '🔴 Recon Alpha: "Thermal scan confirms opponent finger hovering over the launch key."'
      ]
    },
    modes: {
      ai: { title: 'War Room AI Duel', desc: 'Engage in game-theoretic standoff against 5 high-ranking commanders.' },
      multiplayer: { title: 'Encrypted Deal Room', desc: 'Establish a secure command link with another operative in real time.' },
      pass_play: { title: 'Local Command Console', desc: 'Pass the tactical console to enter secret launch keys before reveal.' },
      ladder: { title: 'DEFCON Stakes Ladder', desc: 'Advance from $25,000 Tactical Recon to the $10,000,000 Strategic Command.' }
    },
    bluffs: [
      { text: "I am locking in the 50/50 PACT. Let's maintain stability.", label: "🤝 '100% Joint Pact'" },
      { text: "If we both strike, mutual destruction triggers ($0 for both).", label: "⚠️ 'Both Strike = $0'" },
      { text: "I am launching the strike. Your only safe return is to pact.", label: "🎯 'Strike Armed'" },
      { text: "Honor the pact and secure our equal shares!", label: "🎖️ 'Honor the Pact!'" }
    ],
    ticker: [
      { text: '🎯 DEFCON 1 RADAR ACTIVE', type: 'neutral' },
      { text: '▲ DEFENSE FUND: $1,000,000', type: 'up' },
      { text: '◈ LAUNCH WINDOW: 45 SECONDS', type: 'neutral' },
      { text: '▲ 50/50 JOINT PACT OR 100% STRIKE', type: 'up' }
    ],
    tiers: [
      { id: 'tier1', name: 'Tactical Recon Desk', stake: 25000, minBankroll: 0, desc: 'Standard intelligence briefing to build tactical reserves.', icon: '📡' },
      { id: 'tier2', name: 'Special Ops Division', stake: 100000, minBankroll: 25000, desc: 'Classified operations with six-figure defense budgets.', icon: '🎯' },
      { id: 'tier3', name: 'Joint Chiefs Briefing', stake: 500000, minBankroll: 150000, desc: 'High-level war room operations.', icon: '🎖️' },
      { id: 'tier4', name: 'Black Budget Vault', stake: 2000000, minBankroll: 750000, desc: 'Top-secret covert defense budget.', icon: '⚡' },
      { id: 'tier5', name: 'Strategic Command $10M', stake: 10000000, minBankroll: 2500000, desc: 'The ultimate $10,000,000 DEFCON command showdown.', icon: '👑' }
    ],
    archetypes: {
      novice: { title: 'Field Operative', icon: '📡', color: '#94a3b8' },
      saint: { title: 'Honorable Commander', icon: '🎖️', color: '#22c55e' },
      thief: { title: 'Rogue Infiltrator', icon: '🦈', color: '#ef4444' },
      predator: { title: 'DEFCON Enforcer', icon: '⚡', color: '#eab308' },
      balancer: { title: 'Strategic Tactician', icon: '⚖️', color: '#38bdf8' }
    },
    ai: {
      nick: {
        name: 'General Nick Corrigan',
        title: 'The War Room Hawk',
        avatar: '🤠',
        difficulty: 'Dominant Hawk',
        quote: '"I am turning the Strike key. Turn the Pact key or we both face total $0 wipeout."',
        bio: 'Unyielding general who demands counterparties honor the pact while he strikes.',
        initialDialogue: "I am turning the STRIKE key. Your only sensible play is to turn PACT and take half. Mutual strike means mutual destruction.",
        tellNote: 'Unwavering gaze, rock-solid military posture.',
        bluffs: [
          "My launch key is turned to Strike.",
          "Don't cause mutual wipeout for both commands.",
          "Accept the pact and walk away with your half.",
          "I never back down."
        ]
      },
      sarah: {
        name: 'Agent Sarah Evans',
        title: 'The Directorate Chief',
        avatar: '👑',
        difficulty: 'Honest Partner',
        quote: '"Strategic stability requires honoring the joint pact. Let us share the budget."',
        bio: 'Disciplined operative who always honors mutual pacts.',
        initialDialogue: "Strategic stability is vital. I am locking in the PACT. Let's secure our shared objective.",
        tellNote: 'Calm biometric telemetry, zero deception detected.',
        bluffs: [
          "I am turning the Pact key, 100%.",
          "Let's share the defense budget fairly.",
          "Mutual trust guarantees success.",
          "Stand with me on Pact."
        ]
      },
      damian: {
        name: 'Major Damian Vance',
        title: 'The Rogue Agent',
        avatar: '🐺',
        difficulty: 'Deceptive Rogue',
        quote: '"Commander, on my rank, I have entered the Pact key! Turn Pact with me!"',
        bio: 'Smooth rogue operative who feigns loyalty while aiming to seize the entire budget.',
        initialDialogue: "Objective within reach! On my rank, I've turned the PACT key. Confirm Pact with me!",
        tellNote: 'Spike in micro-sweat and elevated blink rate. High deception tell.',
        bluffs: [
          "I already confirmed the Pact key!",
          "We both accomplish the mission today. Just hit Pact.",
          "Why doubt an ally? Let's split it!",
          "Time is running out on the radar!"
        ]
      },
      jax: {
        name: 'Jax Vega',
        title: 'The Saboteur',
        avatar: '⚡',
        difficulty: 'Wild Operative',
        quote: '"All ciphers unlocked! Let us see who triggers the launch!"',
        bio: 'High-octane operative who loves extreme-stakes chaos.',
        initialDialogue: "Command radar is blazing! Are we honoring the pact or seizing the whole budget?!",
        tellNote: 'Elevated heart rate and rapid movements.',
        bluffs: [
          "Pact or strike, what does your gut say?!",
          "Launch window is closing fast!",
          "Make your move, Commander!",
          "No risk, no glory!"
        ]
      },
      nash: {
        name: 'Colonel Arthur Nash',
        title: 'The Strategic Analyst',
        avatar: '📊',
        difficulty: 'Game Theorist',
        quote: '"Deterrence theory confirms mutual pact is the optimal Nash Equilibrium."',
        bio: 'Military game theorist who calculates stability outcomes.',
        initialDialogue: "Game theory models prove a mutual pact prevents mutual wipeout and secures substantial capital.",
        tellNote: 'Composed, steady vital signs.',
        bluffs: [
          "A mutual pact ensures strategic equilibrium.",
          "Striking introduces unacceptable wipeout risk.",
          "Follow the strategic analysis and choose Pact.",
          "Discipline ensures victory."
        ]
      }
    },
    hedge: {
      title: '🛡️ DEFCON Contingency Protocol',
      badge: 'DEFCON-SEC',
      desc: 'Deduct 10% pact allowance to guarantee a 20% asset extraction if hostile strike occurs.'
    },
    announcements: {
      roundStart: "DEFCON 1 classified channel active! Two commanders at the terminal... will you sign the treaty or execute a surprise strike?!",
      tenSeconds: "Launch sequence in ten seconds! Authorize your final cipher!",
      reveal: "Nuclear football unlocked... decoding orders... SHOWDOWN!",
      splitWin: "Peace treaty signed! Both nations survive and claim joint victory!",
      stealWin: "Flawless espionage! Direct tactical strike, you captured 100% of the defense budget!",
      stealLose: "Ambushed! The enemy counter-intelligence operation wiped you out!",
      mutualLose: "Mutual Assured Destruction! Both launched strikes, complete strategic wipeout!",
      hedgeDeflect: "DEFCON contingency protocol executed! Twenty percent strategic reserves extracted!"
    }
  }
};

window.THEMES_DATA = THEMES_DATA;
