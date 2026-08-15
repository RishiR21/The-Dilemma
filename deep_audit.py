import re
import os
import glob

def run_audit():
    print("=== DEEP CODEBASE AUDIT ===")
    
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. HTML ID audit
    html_ids = set(re.findall(r'id=["\']([a-zA-Z0-9_-]+)["\']', html))
    print(f"Total HTML IDs found: {len(html_ids)}")

    js_files = glob.glob('js/*.js')
    all_missing_ids = {}

    for js_file in js_files:
        with open(js_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        get_ids = set(re.findall(r'getElementById\(["\']([a-zA-Z0-9_-]+)["\']\)', content))
        missing = [i for i in get_ids if i not in html_ids]
        if missing:
            all_missing_ids[js_file] = missing
            print(f"[WARN] {js_file} references missing HTML IDs: {missing}")
        else:
            print(f"[PASS] {js_file}: All getElementById calls exist in HTML.")

    # 2. Check for button IDs in HTML without event listeners
    print("\nChecking interactive button listeners...")
    button_ids = set(re.findall(r'<button[^>]*id=["\']([a-zA-Z0-9_-]+)["\']', html))
    
    combined_js = ""
    for js_file in js_files:
        with open(js_file, 'r', encoding='utf-8') as f:
            combined_js += f.read() + "\n"

    unbound_buttons = []
    for b_id in button_ids:
        if b_id not in combined_js and f"'{b_id}'" not in combined_js and f'"{b_id}"' not in combined_js:
            unbound_buttons.append(b_id)

    if unbound_buttons:
        print(f"[WARN] Potentially unbound buttons in HTML: {unbound_buttons}")
    else:
        print(f"[PASS] All {len(button_ids)} HTML buttons have JS references.")

    print("\nAudit completed!")

if __name__ == '__main__':
    run_audit()
