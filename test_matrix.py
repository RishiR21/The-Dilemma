#!/usr/bin/env python3
"""
Unit tests for Split or Steal Game Matrix, Payoff Logic, and Bankroll Net Changes
"""

def evaluate_matrix(p1_choice, p2_choice, total_jackpot):
    buy_in = total_jackpot / 2
    if p1_choice == 'SPLIT' and p2_choice == 'SPLIT':
        return {
            'outcome': 'SPLIT_SPLIT',
            'p1': total_jackpot / 2,
            'p2': total_jackpot / 2,
            'net_p1': 0
        }
    elif p1_choice == 'STEAL' and p2_choice == 'SPLIT':
        return {
            'outcome': 'P1_STEALS',
            'p1': total_jackpot,
            'p2': 0,
            'net_p1': buy_in
        }
    elif p1_choice == 'SPLIT' and p2_choice == 'STEAL':
        return {
            'outcome': 'P2_STEALS',
            'p1': 0,
            'p2': total_jackpot,
            'net_p1': -buy_in
        }
    else:
        return {
            'outcome': 'MUTUAL_STEAL',
            'p1': 0,
            'p2': 0,
            'net_p1': -buy_in
        }

print("Running Game Matrix Payoff Logic & Bankroll Tests...")
jackpot = 50000

# Test 1: Split / Split -> $25k payout ($0 net change)
res1 = evaluate_matrix('SPLIT', 'SPLIT', jackpot)
assert res1['outcome'] == 'SPLIT_SPLIT' and res1['p1'] == 25000 and res1['net_p1'] == 0, "Failed Split/Split"
print(" [PASS] Split / Split -> Payout: $25,000 | Net: $0 (Break-even stake returned)")

# Test 2: Steal / Split -> $50k payout (+$25k net profit)
res2 = evaluate_matrix('STEAL', 'SPLIT', jackpot)
assert res2['outcome'] == 'P1_STEALS' and res2['p1'] == 50000 and res2['net_p1'] == 25000, "Failed Steal/Split"
print(" [PASS] Steal / Split -> Payout: $50,000 | Net: +$25,000 Profit")

# Test 3: Split / Steal -> $0 payout (-$25k loss)
res3 = evaluate_matrix('SPLIT', 'STEAL', jackpot)
assert res3['outcome'] == 'P2_STEALS' and res3['p1'] == 0 and res3['net_p1'] == -25000, "Failed Split/Steal"
print(" [PASS] Split / Steal -> Payout: $0 | Net: -$25,000 Loss (Bankroll drops)")

# Test 4: Steal / Steal -> $0 payout (-$25k loss)
res4 = evaluate_matrix('STEAL', 'STEAL', jackpot)
assert res4['outcome'] == 'MUTUAL_STEAL' and res4['p1'] == 0 and res4['net_p1'] == -25000, "Failed Steal/Steal"
print(" [PASS] Steal / Steal -> Payout: $0 | Net: -$25,000 Loss (Bankroll drops)")

print("\n All Game Matrix Payoff & Bankroll Tests Passed!")
