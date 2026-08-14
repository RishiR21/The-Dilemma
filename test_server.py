import urllib.request
import sys

endpoints = [
    ("/index.html", "text/html"),
    ("/css/style.css", "text/css"),
    ("/js/themeContent.js", "application/javascript"),
    ("/js/soundEngine.js", "application/javascript"),
    ("/js/aiEngine.js", "application/javascript"),
    ("/js/gameMatrix.js", "application/javascript"),
    ("/js/multiplayer.js", "application/javascript"),
    ("/js/app.js", "application/javascript"),
    ("/manifest.json", "application/manifest+json"),
    ("/icons/icon.svg", "image/svg+xml"),
]

base = "http://127.0.0.1:8000"
print(f"Verifying Web Server Endpoints on 127.0.0.1:8000...")
all_passed = True

for path, expected_type in endpoints:
    url = base + path
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=3) as resp:
            status = resp.status
            content_type = resp.headers.get('Content-Type', '')
            if status == 200:
                print(f" [PASS] {path} -> Status: {status} | Content-Type: {content_type}")
            else:
                print(f" [FAIL] {path} -> Status: {status}")
                all_passed = False
    except Exception as e:
        print(f" [ERROR] {path} -> {e}")
        all_passed = False

if all_passed:
    print("\n All assets and endpoints verified successfully!")
    sys.exit(0)
else:
    print("\n Verification failed.")
    sys.exit(1)
