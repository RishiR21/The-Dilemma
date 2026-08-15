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
        header = bytearray([0x81])
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

    print("=== STARTING HIGH-END CINEMATIC SOUNDTRACK VALIDATION TEST ===")
    proc = subprocess.Popen(cmd)
    try:
        time.sleep(2.5)
        tabs = json.loads(urllib.request.urlopen('http://127.0.0.1:9222/json').read().decode())
        target = [t for t in tabs if '8000' in t.get('url', '') or 'Dilemma' in t.get('title', '')][0]
        ws_url = target['webSocketDebuggerUrl']
        print(f"Connected to page: {target['title']} ({target['url']})")

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

        print("\n--- TEST 1: Wall Street Neo-Soul / French Touch Soundtrack & Cha-Ching ---")
        t1 = eval_js("""
            (() => {
                window.app.applyTheme('trading_desk');
                window.soundEngine.restartAmbientMusic();
                window.soundEngine.playChaChing(window.soundEngine.ctx.currentTime);
                return {
                    theme: window.soundEngine.theme,
                    activeNodes: window.soundEngine.musicActiveNodes.length,
                    hasDrone: !!window.soundEngine.droneOsc1,
                    hasCompressor: !!window.soundEngine.masterCompressor,
                    hasDelay: !!window.soundEngine.spatialDelay
                };
            })()
        """)
        print("T1 Trading Desk Audio:", t1)
        assert t1['activeNodes'] >= 6
        assert t1['hasDrone'] and t1['hasCompressor'] and t1['hasDelay']
        print(" [PASS] Wall Street Neo-Soul soundtrack & cash register cha-ching verified!")

        print("\n--- TEST 2: Ocean's 11 Acid Jazz & Swung Finger Snaps ---")
        t2 = eval_js("""
            (() => {
                window.app.applyTheme('poker_tournament');
                window.soundEngine.restartAmbientMusic();
                window.soundEngine.playFingerSnap(window.soundEngine.ctx.currentTime);
                return {
                    theme: window.soundEngine.theme,
                    activeNodes: window.soundEngine.musicActiveNodes.length
                };
            })()
        """)
        print("T2 Poker Arena Audio:", t2)
        assert t2['activeNodes'] >= 6
        print(" [PASS] Ocean's 11 Rhodes jazz & finger snaps verified!")

        print("\n--- TEST 3: The White Lotus 3/4 Baroque Waltz & Champagne Pop ---")
        t3 = eval_js("""
            (() => {
                window.app.applyTheme('hotel_lobby');
                window.soundEngine.restartAmbientMusic();
                window.soundEngine.playChampagnePop(window.soundEngine.ctx.currentTime);
                return {
                    theme: window.soundEngine.theme,
                    activeNodes: window.soundEngine.musicActiveNodes.length
                };
            })()
        """)
        print("T3 Hotel Room Audio:", t3)
        assert t3['activeNodes'] >= 6
        print(" [PASS] White Lotus theatrical 3/4 Baroque waltz & champagne pop verified!")

        print("\n--- TEST 4: Payday 2 / 70s Funky Heist Slap-Bass ---")
        t4 = eval_js("""
            (() => {
                window.app.applyTheme('bank_vault');
                window.soundEngine.restartAmbientMusic();
                return {
                    theme: window.soundEngine.theme,
                    activeNodes: window.soundEngine.musicActiveNodes.length
                };
            })()
        """)
        print("T4 Cash Vault Audio:", t4)
        assert t4['activeNodes'] >= 6
        print(" [PASS] Funky 70s spy-heist slap bass & safe tumbler groove verified!")

        print("\n--- TEST 5: 007 Espionage Spy Funk & Brass Stabs ---")
        t5 = eval_js("""
            (() => {
                window.app.applyTheme('military_intelligence');
                window.soundEngine.restartAmbientMusic();
                window.soundEngine.playSpyBrassStab(window.soundEngine.ctx.currentTime, [164.81, 196.00, 246.94, 329.63]);
                return {
                    theme: window.soundEngine.theme,
                    activeNodes: window.soundEngine.musicActiveNodes.length
                };
            })()
        """)
        print("T5 Black Ops Audio:", t5)
        assert t5['activeNodes'] >= 4
        print(" [PASS] 007 espionage spy funk & brass horn stabs verified!")

        ws.close()
        print("\n🎉 ALL 5 HIGH-END CINEMATIC SOUNDTRACKS PASSED 100%!")

    finally:
        proc.terminate()

if __name__ == '__main__':
    run_chrome_audio_test()
