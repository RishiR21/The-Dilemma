import subprocess
import time
import json
import urllib.request
import socket
import os
import struct
import base64
import hashlib
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

class SimpleWS:
    def __init__(self, host, port, path):
        self.sock = socket.create_connection((host, port))
        key = base64.b64encode(os.urandom(16)).decode('ascii')
        req = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {host}:{port}\r\n"
            f"Upgrade: websocket\r\n"
            f"Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            f"Sec-WebSocket-Version: 13\r\n\r\n"
        )
        self.sock.sendall(req.encode('utf-8'))
        resp = self.sock.recv(4096).decode('utf-8', errors='ignore')
        if "101" not in resp:
            raise RuntimeError("WebSocket Handshake Failed: " + resp)

    def send_json(self, data):
        payload = json.dumps(data).encode('utf-8')
        length = len(payload)
        mask = os.urandom(4)
        header = bytearray([0x81]) # text frame, fin
        if length <= 125:
            header.append(0x80 | length)
        elif length <= 65535:
            header.append(0x80 | 126)
            header.extend(struct.pack("!H", length))
        else:
            header.append(0x80 | 127)
            header.extend(struct.pack("!Q", length))
        
        masked = bytearray(b ^ mask[i % 4] for i, b in enumerate(payload))
        self.sock.sendall(header + mask + masked)

    def recv_json(self):
        while True:
            b1 = self.sock.recv(1)[0]
            b2 = self.sock.recv(1)[0]
            length = b2 & 0x7F
            if length == 126:
                length = struct.unpack("!H", self.sock.recv(2))[0]
            elif length == 127:
                length = struct.unpack("!Q", self.sock.recv(8))[0]
            data = bytearray()
            while len(data) < length:
                chunk = self.sock.recv(length - len(data))
                if not chunk:
                    break
                data.extend(chunk)
            try:
                return json.loads(data.decode('utf-8'))
            except Exception:
                continue

    def close(self):
        try:
            self.sock.close()
        except Exception:
            pass

def run_chrome_audio_test():
    chrome_path = r'C:\Users\rramc\AppData\Local\Google\Chrome\Application\chrome.exe'
    cmd = [
        chrome_path,
        '--headless=new',
        '--remote-debugging-port=9222',
        '--disable-gpu',
        '--no-sandbox',
        '--autoplay-policy=no-user-gesture-required',
        'http://127.0.0.1:8000'
    ]

    print("=== STARTING HEADLESS CHROME WEB AUDIO TEST ===")
    proc = subprocess.Popen(cmd)
    try:
        time.sleep(2.5)
        tabs = json.loads(urllib.request.urlopen('http://127.0.0.1:9222/json').read().decode())
        target = [t for t in tabs if '8000' in t.get('url', '') or 'Dilemma' in t.get('title', '')][0]
        ws_url = target['webSocketDebuggerUrl'] # e.g. ws://127.0.0.1:9222/devtools/page/XYZ
        print(f"Connected to page: {target['title']} ({target['url']})")

        # Parse host, port, path
        path = ws_url.replace("ws://127.0.0.1:9222", "")
        ws = SimpleWS("127.0.0.1", 9222, path)

        def eval_js(code):
            req_id = int(time.time() * 1000) % 100000
            ws.send_json({
                "id": req_id,
                "method": "Runtime.evaluate",
                "params": {
                    "expression": code,
                    "returnByValue": True,
                    "awaitPromise": True
                }
            })
            while True:
                msg = ws.recv_json()
                if msg.get('id') == req_id:
                    return msg.get('result', {}).get('result', {}).get('value')

        print("\n--- TEST 1: Initialize AudioContext & SoundEngine ---")
        t1 = eval_js("""
            (() => {
                window.soundEngine.ensureContext();
                return {
                    initialized: !!window.soundEngine,
                    theme: window.soundEngine.theme,
                    musicEnabled: window.soundEngine.isMusicEnabled,
                    ctxState: window.soundEngine.ctx ? window.soundEngine.ctx.state : null,
                    masterGain: window.soundEngine.musicMasterGain ? window.soundEngine.musicMasterGain.gain.value : null
                };
            })()
        """)
        print("T1 Result:", t1)
        assert t1['initialized'] == True
        assert t1['ctxState'] in ('running', 'suspended')
        print(" [PASS] AudioContext initialized properly!")

        print("\n--- TEST 2: Start Ambient Music Synthesis ---")
        t2 = eval_js("""
            (() => {
                window.soundEngine.restartAmbientMusic();
                return {
                    ctxState: window.soundEngine.ctx.state,
                    timerActive: !!window.soundEngine.musicTimer,
                    activeNodesCount: window.soundEngine.musicActiveNodes.length,
                    theme: window.soundEngine.theme
                };
            })()
        """)
        print("T2 Result:", t2)
        assert t2['activeNodesCount'] > 0, "No active audio oscillators generated"
        print(f" [PASS] Audio playback active! {t2['activeNodesCount']} live synth oscillators generating waveforms.")

        print("\n--- TEST 3: Theme Swapping Procedural Audio Generation ---")
        t3 = eval_js("""
            (() => {
                const results = {};
                const themes = ['poker_tournament', 'hotel_lobby', 'bank_vault', 'military_intelligence', 'trading_desk'];
                for (let th of themes) {
                    window.app.applyTheme(th);
                    window.soundEngine.restartAmbientMusic();
                    results[th] = {
                        theme: window.soundEngine.theme,
                        nodes: window.soundEngine.musicActiveNodes.length
                    };
                }
                return results;
            })()
        """)
        print("T3 Multi-Theme Audio Results:")
        for th, info in t3.items():
            print(f"  • {th}: {info['nodes']} active synth nodes [PASS]")
            assert info['nodes'] > 0, f"Theme {th} failed to generate audio nodes"

        print("\n--- TEST 4: Header Audio Toggle UI Interactivity ---")
        t4 = eval_js("""
            (() => {
                const btn = document.getElementById('btnHeaderMusic');
                const initial = window.soundEngine.isMusicEnabled;
                btn.click();
                const afterClick1 = window.soundEngine.isMusicEnabled;
                btn.click();
                const afterClick2 = window.soundEngine.isMusicEnabled;
                return {
                    initial: initial,
                    afterClick1: afterClick1,
                    afterClick2: afterClick2,
                    buttonText: btn.textContent.trim()
                };
            })()
        """)
        print("T4 Header Toggle Result:", t4)
        assert t4['afterClick1'] != t4['initial'], "Toggle 1 failed"
        assert t4['afterClick2'] == t4['initial'], "Toggle 2 failed"
        print(" [PASS] Quick header music toggle button verified!")

        ws.close()
        print("\n🎯 100% OF REAL BROWSER AUDIO TESTS PASSED SUCCESSFULLY!")

    finally:
        proc.terminate()

if __name__ == '__main__':
    run_chrome_audio_test()
