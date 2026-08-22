#!/usr/bin/env python3
"""
Unit tests for Downside Hedge covered-call option mechanic across all game states,
decisions, hedge permutations, and pool sizes.
"""
import sys

def calculate_payout(player_a, player_b, pool_size):
    if pool_size <= 0:
        return {'player_a': 0, 'player_b': 0}

    choice_a = player_a['choice']
    hedged_a = player_a.get('hasHedged', False)

    choice_b = player_b['choice']
    hedged_b = player_b.get('hasHedged', False)

    # 1. Both Steal -> All hedges voided, both receive $0
    if choice_a == 'STEAL' and choice_b == 'STEAL':
        return {'player_a': 0, 'player_b': 0}

    # 2. Both Split -> 50% base payout; hedgers pay 10% premium on their split share
    if choice_a == 'SPLIT' and choice_b == 'SPLIT':
        base_split = pool_size * 0.5
        hedged_split = base_split * 0.9 # 10% premium forfeiture
        return {
            'player_a': hedged_split if hedged_a else base_split,
            'player_b': hedged_split if hedged_b else base_split
        }

    # 3. Player A Splits & Player B Steals (Hostile Takeover by Player B)
    if choice_a == 'SPLIT' and choice_b == 'STEAL':
        if hedged_a:
            protected_floor = pool_size * 0.20 # 20% guaranteed floor
            return {
                'player_a': protected_floor,
                'player_b': pool_size - protected_floor # Steal reduced to 80%
            }
        return {
            'player_a': 0,
            'player_b': pool_size
        }

    # 4. Player A Steals & Player B Splits (Hostile Takeover by Player A)
    if choice_a == 'STEAL' and choice_b == 'SPLIT':
        if hedged_b:
            protected_floor = pool_size * 0.20 # 20% guaranteed floor
            return {
                'player_a': pool_size - protected_floor, # Steal reduced to 80%
                'player_b': protected_floor
            }
        return {
            'player_a': pool_size,
            'player_b': 0
        }

    return {'player_a': 0, 'player_b': 0}

print("=== STARTING DOWNSIDE HEDGE PAYOFF SUITE ===")
pool = 100000

# Test 1: Split (Unhedged) vs Split (Unhedged) -> $50k each
t1 = calculate_payout({'choice': 'SPLIT', 'hasHedged': False}, {'choice': 'SPLIT', 'hasHedged': False}, pool)
assert t1['player_a'] == 50000 and t1['player_b'] == 50000, f"T1 failed: {t1}"
print(" [PASS] Test 1: Split (No Hedge) vs Split (No Hedge) -> $50k / $50k")

# Test 2: Split (Hedged) vs Split (Unhedged) -> Player A pays 10% premium ($45k), Player B gets full ($50k)
t2 = calculate_payout({'choice': 'SPLIT', 'hasHedged': True}, {'choice': 'SPLIT', 'hasHedged': False}, pool)
assert t2['player_a'] == 45000 and t2['player_b'] == 50000, f"T2 failed: {t2}"
print(" [PASS] Test 2: Split (Hedged) vs Split (No Hedge) -> $45k / $50k (10% premium deducted from A)")

# Test 3: Split (Hedged) vs Split (Hedged) -> Both pay 10% premium ($45k / $45k)
t3 = calculate_payout({'choice': 'SPLIT', 'hasHedged': True}, {'choice': 'SPLIT', 'hasHedged': True}, pool)
assert t3['player_a'] == 45000 and t3['player_b'] == 45000, f"T3 failed: {t3}"
print(" [PASS] Test 3: Split (Hedged) vs Split (Hedged) -> $45k / $45k (Both pay 10% premium)")

# Test 4: Split (Hedged) vs Steal (Unhedged) -> Hostile steal! Player A recovers 20% floor ($20k), Player B gets 80% ($80k)
t4 = calculate_payout({'choice': 'SPLIT', 'hasHedged': True}, {'choice': 'STEAL', 'hasHedged': False}, pool)
assert t4['player_a'] == 20000 and t4['player_b'] == 80000, f"T4 failed: {t4}"
print(" [PASS] Test 4: Split (Hedged) vs Steal (No Hedge) -> $20k floor to A / $80k capped steal to B")

# Test 5: Split (Hedged) vs Steal (Hedged) -> Player A recovers 20% floor ($20k), Player B gets 80% ($80k)
t5 = calculate_payout({'choice': 'SPLIT', 'hasHedged': True}, {'choice': 'STEAL', 'hasHedged': True}, pool)
assert t5['player_a'] == 20000 and t5['player_b'] == 80000, f"T5 failed: {t5}"
print(" [PASS] Test 5: Split (Hedged) vs Steal (Hedged) -> $20k floor to A / $80k capped steal to B")

# Test 6: Split (Unhedged) vs Steal (Unhedged) -> Total wipeout of A ($0 / $100k)
t6 = calculate_payout({'choice': 'SPLIT', 'hasHedged': False}, {'choice': 'STEAL', 'hasHedged': False}, pool)
assert t6['player_a'] == 0 and t6['player_b'] == 100000, f"T6 failed: {t6}"
print(" [PASS] Test 6: Split (No Hedge) vs Steal (No Hedge) -> $0 / $100k (Full Steal)")

# Test 7: Steal (Unhedged) vs Split (Hedged) -> Player A steals 80% ($80k), Player B recovers 20% floor ($20k)
t7 = calculate_payout({'choice': 'STEAL', 'hasHedged': False}, {'choice': 'SPLIT', 'hasHedged': True}, pool)
assert t7['player_a'] == 80000 and t7['player_b'] == 20000, f"T7 failed: {t7}"
print(" [PASS] Test 7: Steal (No Hedge) vs Split (Hedged) -> $80k to A / $20k floor to B")

# Test 8: Steal (Hedged) vs Steal (Hedged) -> Total wipeout, both get $0, all hedges voided
t8 = calculate_payout({'choice': 'STEAL', 'hasHedged': True}, {'choice': 'STEAL', 'hasHedged': True}, pool)
assert t8['player_a'] == 0 and t8['player_b'] == 0, f"T8 failed: {t8}"
print(" [PASS] Test 8: Steal (Hedged) vs Steal (Hedged) -> $0 / $0 (Mutual destruction voiding hedges)")

# Test 9: Steal (Hedged) vs Steal (Unhedged) -> $0 / $0
t9 = calculate_payout({'choice': 'STEAL', 'hasHedged': True}, {'choice': 'STEAL', 'hasHedged': False}, pool)
assert t9['player_a'] == 0 and t9['player_b'] == 0, f"T9 failed: {t9}"
print(" [PASS] Test 9: Steal (Hedged) vs Steal (No Hedge) -> $0 / $0 (Mutual destruction)")

# Test 10: Edge case - Zero Pool
t10 = calculate_payout({'choice': 'SPLIT', 'hasHedged': True}, {'choice': 'SPLIT', 'hasHedged': True}, 0)
assert t10['player_a'] == 0 and t10['player_b'] == 0, f"T10 failed: {t10}"
print(" [PASS] Test 10: Zero Pool Size -> $0 / $0")

# Test 11: Decamillionaire scale pool ($10,000,000)
pool_large = 10000000
t11 = calculate_payout({'choice': 'SPLIT', 'hasHedged': True}, {'choice': 'STEAL', 'hasHedged': False}, pool_large)
assert t11['player_a'] == 2000000 and t11['player_b'] == 8000000, f"T11 failed: {t11}"
print(" [PASS] Test 11: $10M High-Roller Pool -> $2,000,000 Floor / $8,000,000 Capped Steal")

print("\n?? ALL DOWNSIDE HEDGE PAYOFF LOGIC TESTS PASSED 100%!")
