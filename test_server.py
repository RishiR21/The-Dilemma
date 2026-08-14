#!/usr/bin/env python3
import urllib.request
import sys

endpoints = [
    '/index.html',
    '/css/style.css',
    '/js/soundEngine.js',
    '/js/aiEngine.js',
    '/js/gameMatrix.js',
    '/js/multiplayer.js',
    '/js/app.js',
    '/manifest.json',
    '/icons/icon.svg'
]

print("Verifying Web Server Endpoints on 127.0.0.1:8000...", flush=True)
all_ok = True
for ep in endpoints:
    url = f"http://127.0.0.1:8000{ep}"
    try:
        req_obj = urllib.request.Request(url, headers={'Connection': 'close', 'User-Agent': 'TestClient'})
        with urllib.request.urlopen(req_obj, timeout=2) as req:
            _ = req.read()
            content_type = req.headers.get('Content-Type')
            print(f" [PASS] {ep} -> Status: {req.status} | Content-Type: {content_type}", flush=True)
    except Exception as e:
        print(f" [FAIL] {ep} -> {e}", flush=True)
        all_ok = False

if all_ok:
    print("\n All assets and endpoints verified successfully!", flush=True)
else:
    sys.exit(1)
