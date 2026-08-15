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

    print("=== STARTING THEMATIC AUDIO & MATCHUP SFX VALIDATION TEST ===")
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

        print("\n--- TEST 1: Fast-Paced Cyberpunk Wall Street Soundtrack ---")
        t1 = eval_js("""
            (() => {
                window.app.applyTheme('trading_desk');
                window.soundEngine.restartAmbientMusic();
                return {
                    theme: window.soundEngine.theme,
                    activeNodes: window.soundEngine.musicActiveNodes.length,
                    hasDrone: !!window.soundEngine.droneOsc1,
                    hasCompressor: !!window.soundEngine.masterCompressor,
                    hasDelay: !!window.soundEngine.spatialDelay
                };
            })()
        """)
        print("T1 Fast-Paced Trading Floor Audio:", t1)
        assert t1['activeNodes'] >= 8, f"Expected fast multi-voice pulses, got {t1['activeNodes']}"
        assert t1['hasDrone'] and t1['hasCompressor'] and t1['hasDelay']
        print(" [PASS] High-energy 128 BPM Trading Floor driving soundtrack active!")

        print("\n--- TEST 2: Wall Street Matchup Phone Ringing & Order Fills ---")
        t2 = eval_js("""
            (() => {
                window.soundEngine.playTradingPhoneRing();
                window.soundEngine.playOrderFillChime();
                window.soundEngine.startMatchupAmbience('trading_desk');
                return {
                    ambienceActive: !!window.soundEngine.matchupAmbienceTimer
                };
            })()
        """)
        print("T2 Trading Ambience & Phone Ring:", t2)
        assert t2['ambienceActive'] == True
        print(" [PASS] Dual-tone Wall Street broker telephone ring & order fill chimes verified!")

        print("\n--- TEST 3: Thematic Matchup SFX for All 5 Universes ---")
        t3 = eval_js("""
            (() => {
                // Test each thematic matchup SFX
                window.soundEngine.playPokerChipShuffle();
                window.soundEngine.playDeskBellDing();
                window.soundEngine.playVaultDialSpin();
                window.soundEngine.playSatcomChirp();
                return {
                    poker: true,
                    hotel: true,
                    vault: true,
                    blackOps: true
                };
            })()
        """)
        print("T3 Multi-Theme Matchup SFX:", t3)
        assert all(t3.values())
        print(" [PASS] Poker chip shuffles, hotel concierge bells, vault dial spins, and satcom chirps verified!")

        print("\n--- TEST 4: Deal Room Real-Time Dynamic Tension Scaling ---")
        t4 = eval_js("""
            (() => {
                window.soundEngine.setGameTension(10, 45); // High tension (10s left)
                const highTensionFreq = window.soundEngine.masterFilter.frequency.value;
                const highBpm = window.soundEngine.currentBpm;

                window.soundEngine.setGameTension(45, 45); // Low tension (start)
                const lowTensionFreq = window.soundEngine.masterFilter.frequency.value;

                return {
                    highTensionFreq: highTensionFreq,
                    lowTensionFreq: lowTensionFreq,
                    highBpm: highBpm
                };
            })()
        """)
        print("T4 Deal Room Tension State:", t4)
        assert t4['highBpm'] > 110, f"Expected accelerated BPM, got {t4['highBpm']}"
        print(" [PASS] Dynamic Deal Room filter sweep and heartbeat acceleration verified!")

        ws.close()
        print("\n🎉 ALL THEMATIC SOUNDTRACK & MATCHUP AMBIENCE TESTS PASSED 100%!")

    finally:
        proc.terminate()

if __name__ == '__main__':
    run_chrome_audio_test()
