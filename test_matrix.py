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

print("\nRunning Profile Handle & 4-Digit PIN Security Tests...")

def format_username(raw):
    if not raw: return ''
    clean = raw.strip()
    if not clean.startswith('@'):
        clean = '@' + clean
    handle_body = ''.join(c for c in clean[1:] if c.isalnum() or c == '_')
    return '@' + handle_body

def validate_pin(pin):
    return len(pin) == 4 and pin.isdigit()

# Test 5: Handle auto-formatting
h1 = format_username("ApexShark")
assert h1 == "@ApexShark", f"Failed handle formatting: {h1}"
h2 = format_username("@WallStreet_99")
assert h2 == "@WallStreet_99", f"Failed handle formatting: {h2}"
print(" [PASS] Handle Auto-formatting prepends '@' and sanitizes characters")

# Test 6: 4-digit PIN validation
assert validate_pin("1234") == True, "Failed valid PIN"
assert validate_pin("0000") == True, "Failed 0000 PIN"
assert validate_pin("123") == False, "Failed short PIN rejection"
assert validate_pin("12345") == False, "Failed long PIN rejection"
assert validate_pin("12a4") == False, "Failed alphanumeric PIN rejection"
print(" [PASS] 4-Digit PIN Validator correctly accepts [0-9]{4} and rejects invalid formats")

# Test 7: Profile Save & Restore Simulation
saved_db = {}

def claim_profile(handle, pin, stats):
    f_handle = format_username(handle)
    if not validate_pin(pin):
        return {'success': False, 'error': 'Invalid PIN'}
    key = f_handle.lower()
    if key in saved_db and saved_db[key]['pin'] != pin:
        return {'success': False, 'error': 'PIN mismatch'}
    saved_db[key] = {'username': f_handle, 'pin': pin, 'stats': dict(stats)}
    return {'success': True, 'username': f_handle}

def login_profile(handle, pin):
    f_handle = format_username(handle)
    key = f_handle.lower()
    if key not in saved_db:
        return {'success': False, 'error': 'Not found'}
    if saved_db[key]['pin'] != pin:
        return {'success': False, 'error': 'Wrong PIN'}
    return {'success': True, 'stats': saved_db[key]['stats']}

# Claim initial profile
claim_res = claim_profile("ApexShark", "7890", {'bankroll': 150000, 'trust': 85})
assert claim_res['success'] == True and claim_res['username'] == "@ApexShark"
print(" [PASS] Profile successfully claimed and secured with 4-digit PIN")

# Login with right PIN
login_good = login_profile("@ApexShark", "7890")
assert login_good['success'] == True and login_good['stats']['bankroll'] == 150000
print(" [PASS] Profile successfully restored with valid PIN (Bankroll: $150k preserved)")

# Login with wrong PIN
login_bad = login_profile("@ApexShark", "0000")
assert login_bad['success'] == False
print(" [PASS] Profile restore correctly blocked with incorrect PIN")

print("\n All Game Matrix, Payoff, Handle & PIN Security Tests Passed!")
