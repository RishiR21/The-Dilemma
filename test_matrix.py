#!/usr/bin/env python3
"""
Unit tests for Split or Steal Game Matrix and Payoff Logic
"""

def evaluate_matrix(p1_choice, p2_choice, total_jackpot):
    if p1_choice == 'SPLIT' and p2_choice == 'SPLIT':
        return {
            'outcome': 'SPLIT_SPLIT',
            'p1': total_jackpot / 2,
            'p2': total_jackpot / 2
        }
    elif p1_choice == 'STEAL' and p2_choice == 'SPLIT':
        return {
            'outcome': 'P1_STEALS',
            'p1': total_jackpot,
            'p2': 0
        }
    elif p1_choice == 'SPLIT' and p2_choice == 'STEAL':
        return {
            'outcome': 'P2_STEALS',
            'p1': 0,
            'p2': total_jackpot
        }
    else:
        return {
            'outcome': 'MUTUAL_STEAL',
            'p1': 0,
            'p2': 0
        }

print("Running Game Matrix Payoff Logic Tests...")
jackpot = 100000

# Test 1: Split / Split
res1 = evaluate_matrix('SPLIT', 'SPLIT', jackpot)
assert res1['outcome'] == 'SPLIT_SPLIT' and res1['p1'] == 50000 and res1['p2'] == 50000, "Failed Split/Split"
print(" [PASS] Split / Split -> $50,000 / $50,000")

# Test 2: Steal / Split
res2 = evaluate_matrix('STEAL', 'SPLIT', jackpot)
assert res2['outcome'] == 'P1_STEALS' and res2['p1'] == 100000 and res2['p2'] == 0, "Failed Steal/Split"
print(" [PASS] Steal / Split -> $100,000 / $0 (Heist)")

# Test 3: Split / Steal
res3 = evaluate_matrix('SPLIT', 'STEAL', jackpot)
assert res3['outcome'] == 'P2_STEALS' and res3['p1'] == 0 and res3['p2'] == 100000, "Failed Split/Steal"
print(" [PASS] Split / Steal -> $0 / $100,000 (Betrayal)")

# Test 4: Steal / Steal
res4 = evaluate_matrix('STEAL', 'STEAL', jackpot)
assert res4['outcome'] == 'MUTUAL_STEAL' and res4['p1'] == 0 and res4['p2'] == 0, "Failed Steal/Steal"
print(" [PASS] Steal / Steal -> $0 / $0 (Mutual Destruction)")

print("\n All Game Matrix Payoff Unit Tests Passed!")
