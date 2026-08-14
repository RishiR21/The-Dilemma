#!/usr/bin/env python3
"""
Split or Steal: High-Stakes Dilemma Game Server
Serves static web files with multi-threading and hosts real-time WebSocket matchmaking rooms.
"""

import os
import sys
import json
import socket
import asyncio
import mimetypes
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread

# Ensure utf-8 stdout
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Ensure proper MIME types for web files
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('application/json', '.json')
mimetypes.add_type('application/manifest+json', '.json')

PORT = int(os.environ.get('PORT', 8000))
WS_PORT = int(os.environ.get('WS_PORT', 8765))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Active multiplayer rooms: roomCode -> { host, guest, clients: set() }
ROOMS = {}

class CustomHTTPHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and PWA friendly headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Suppress routine GET logging for clean console output
        pass

def get_local_ip():
    """Finds the local network IP for mobile device testing."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

def run_http_server():
    server_address = ('0.0.0.0', PORT)
    httpd = ThreadingHTTPServer(server_address, CustomHTTPHandler)
    local_ip = get_local_ip()
    print("===============================================================")
    print(" SPLIT OR STEAL GAME SERVER IS LIVE!")
    print(f" Play in Browser: http://localhost:{PORT}")
    print(f" Play on Mobile (iOS / Safari): http://{local_ip}:{PORT}")
    print("===============================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()

async def ws_handler(websocket):
    current_room = None
    player_id = None

    try:
        async for message in websocket:
            try:
                data = json.loads(message)
                msg_type = data.get('type')
                room_code = data.get('roomCode')
                player_id = data.get('senderId')

                if msg_type == 'ROOM_CREATED':
                    current_room = room_code
                    ROOMS[room_code] = {
                        'host': data.get('senderName'),
                        'clients': {websocket}
                    }

                elif msg_type == 'JOIN_ROOM':
                    current_room = room_code
                    if room_code in ROOMS:
                        ROOMS[room_code]['clients'].add(websocket)
                        for client in ROOMS[room_code]['clients']:
                            if client != websocket and client.open:
                                await client.send(message)
                    else:
                        ROOMS[room_code] = {
                            'host': 'Unknown',
                            'clients': {websocket}
                        }

                else:
                    if room_code and room_code in ROOMS:
                        for client in ROOMS[room_code]['clients']:
                            if client != websocket and client.open:
                                await client.send(message)

            except json.JSONDecodeError:
                pass
    except Exception:
        pass
    finally:
        if current_room and current_room in ROOMS:
            ROOMS[current_room]['clients'].discard(websocket)
            if not ROOMS[current_room]['clients']:
                del ROOMS[current_room]

async def main_async():
    try:
        import websockets
        ws_server = await websockets.serve(ws_handler, "0.0.0.0", 8765)
        print(" Real-time WebSocket matchmaker running on ws://0.0.0.0:8765")
        await ws_server.wait_closed()
    except Exception as e:
        print(f"WebSocket note: {e}")

if __name__ == '__main__':
    http_thread = Thread(target=run_http_server, daemon=True)
    http_thread.start()

    try:
        asyncio.run(main_async())
    except KeyboardInterrupt:
        print("\nShutting down server...")
        sys.exit(0)
