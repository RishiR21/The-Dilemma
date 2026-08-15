import subprocess
import time
import json
import urllib.request
import socket
import os
import struct
import base64
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

def test_mobile_responsive_experience():
    chrome_path = r'C:\Users\rramc\AppData\Local\Google\Chrome\Application\chrome.exe'
    cmd = [
        chrome_path,
        '--headless=new',
        '--remote-debugging-port=9222',
        '--disable-gpu',
        '--no-sandbox',
        '--autoplay-policy=no-user-gesture-required',
        '--window-size=390,844', # iPhone 14 / 15 dimensions
        'http://127.0.0.1:8000'
    ]

    print("=== STARTING COMPREHENSIVE MOBILE RESPONSIVE SUITE TEST ===")
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

        print("\n--- TEST 1: Mobile Viewport Dimensions & Overflow Inspection ---")
        t1 = eval_js("""
            (() => {
                const docWidth = document.documentElement.offsetWidth;
                const scrollWidth = document.documentElement.scrollWidth;
                const appElem = document.getElementById('app');
                return {
                    docWidth: docWidth,
                    scrollWidth: scrollWidth,
                    hasHorizontalOverflow: scrollWidth > docWidth + 1,
                    headerHeight: document.querySelector('.app-header').offsetHeight
                };
            })()
        """)
        print("T1 Mobile Viewport:", t1)
        assert not t1['hasHorizontalOverflow']
        print(" [PASS] Zero horizontal overflow on mobile viewport!")

        print("\n--- TEST 2: Deal Room Mobile Layout & Touch Target Verification ---")
        t2 = eval_js("""
            (() => {
                window.app.currentStake = 25000;
                window.app.startAIGameplay();
                const splitBall = document.getElementById('ballSplit');
                const stealBall = document.getElementById('ballSteal');
                const lockBtn = document.getElementById('btnLockChoice');
                const splitRect = splitBall.getBoundingClientRect();
                const stealRect = stealBall.getBoundingClientRect();
                const lockRect = lockBtn.getBoundingClientRect();
                return {
                    splitWidth: splitRect.width,
                    splitHeight: splitRect.height,
                    stealWidth: stealRect.width,
                    stealHeight: stealRect.height,
                    lockHeight: lockRect.height,
                    ballsSideBySide: Math.abs(splitRect.top - stealRect.top) < 30
                };
            })()
        """)
        print("T2 Deal Room Mobile:", t2)
        assert t2['splitWidth'] >= 80 and t2['splitWidth'] <= 160
        assert t2['lockHeight'] >= 44
        assert t2['ballsSideBySide']
        print(" [PASS] Deal room tokens and action buttons perfectly sized and positioned for mobile thumbs!")

        print("\n--- TEST 3: Mobile Touch Decision Flow & Reveal Stage ---")
        t3 = eval_js("""
            (() => {
                // Simulate mobile user tapping SPLIT token
                document.getElementById('ballSplit').click();
                const isSelected = document.getElementById('ballSplit').classList.contains('selected');
                const btnEnabled = !document.getElementById('btnLockChoice').disabled;
                
                // Tap lock button
                document.getElementById('btnLockChoice').click();
                
                return {
                    isSelected: isSelected,
                    btnEnabled: btnEnabled,
                    selectedBall: window.app.selectedBall
                };
            })()
        """)
        print("T3 Mobile Decision Flow:", t3)
        assert t3['isSelected'] and t3['btnEnabled'] and t3['selectedBall'] == 'SPLIT'
        print(" [PASS] Mobile tap selection and secret decision lock verified!")

        time.sleep(1.8) # Wait for reveal countdown
        t4 = eval_js("""
            (() => {
                const revealScreen = document.getElementById('screenReveal');
                const isVisible = !revealScreen.classList.contains('hidden');
                const p1Ball = document.getElementById('revealBallP1').getBoundingClientRect();
                const p2Ball = document.getElementById('revealBallP2').getBoundingClientRect();
                return {
                    revealVisible: isVisible,
                    p1Width: p1Ball.width,
                    p2Width: p2Ball.width,
                    sideBySide: Math.abs(p1Ball.top - p2Ball.top) < 40
                };
            })()
        """)
        print("T4 Reveal Screen on Mobile:", t4)
        assert t4['revealVisible'] and t4['sideBySide']
        print(" [PASS] Mobile dramatic reveal screen perfectly positioned without clipping!")

        print("\n--- TEST 4: Mobile Native Bottom Sheet Modal Testing ---")
        t5 = eval_js("""
            (async () => {
                window.app.openProfileModal();
                await new Promise(r => setTimeout(r, 380));
                const modal = document.getElementById('profileModal');
                const modalBox = document.querySelector('#profileModal .modal-box');
                const rect = modalBox.getBoundingClientRect();
                const screenHeight = window.innerHeight;
                return {
                    modalVisible: !modal.classList.contains('hidden'),
                    screenHeight: screenHeight,
                    rectBottom: rect.bottom,
                    diff: Math.abs(screenHeight - rect.bottom),
                    isBottomAttached: Math.abs(screenHeight - rect.bottom) < 10
                };
            })()
        """)
        print("T5 Mobile Bottom Sheet:", t5)
        assert t5['modalVisible'] and t5['isBottomAttached']
        print(" [PASS] Mobile bottom sheet modal drawer functions seamlessly!")

        ws.close()
        print("\n🎉 ALL MOBILE RESPONSIVE TESTS PASSED 100%!")

    finally:
        proc.terminate()

if __name__ == '__main__':
    test_mobile_responsive_experience()
