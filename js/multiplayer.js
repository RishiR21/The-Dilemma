/**
 * MultiplayerEngine - Real-Time 1v1 Room Matchmaking & Synchronization
 * Supports Python WebSocket Server + Cross-Tab BroadcastChannel fallback
 */

class MultiplayerEngine {
  constructor() {
    this.socket = null;
    this.isWsConnected = false;
    this.broadcastChannel = null;
    this.roomCode = null;
    this.isHost = false;
    this.playerId = 'p_' + Math.random().toString(36).substring(2, 9);
    this.playerName = 'Player_' + Math.floor(100 + Math.random() * 900);
    this.opponent = null;
    this.currentRoomState = null;
    
    // Event listeners
    this.listeners = {
      onRoomCreated: [],
      onPlayerJoined: [],
      onPlayerLeft: [],
      onChatMessage: [],
      onOpponentLocked: [],
      onGameStart: [],
      onTimerTick: [],
      onReveal: [],
      onError: []
    };

    this.initBroadcastChannel();
    this.initWebSocket();
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try { cb(data); } catch (e) { console.error('Listener error', e); }
      });
    }
  }

  initBroadcastChannel() {
    if ('BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('sos_multiplayer_channel');
      this.broadcastChannel.onmessage = (event) => {
        this.handleMessage(event.data);
      };
    }
  }

  initWebSocket() {
    const wsProto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = window.location.hostname || 'localhost';
    const wsPort = window.location.port ? `:${window.location.port}` : ':8000';
    const wsUrl = `${wsProto}//${wsHost}${wsPort}/ws`;

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        this.isWsConnected = true;
        console.log('Connected to Split or Steal WebSocket Server');
      };

      this.socket.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.handleMessage(msg);
        } catch (_) {}
      };

      this.socket.onclose = () => {
        this.isWsConnected = false;
      };

      this.socket.onerror = () => {
        this.isWsConnected = false;
      };
    } catch (_) {
      this.isWsConnected = false;
    }
  }

  send(message) {
    const payload = { ...message, senderId: this.playerId, senderName: this.playerName, roomCode: this.roomCode };
    
    // 1. Send via WebSocket if available
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload));
    }

    // 2. Broadcast locally for multi-tab testing
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage(payload);
    }
  }

  generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  createRoom(jackpot = 50000, hostName = null) {
    this.playerName = hostName || window.gameMatrix?.stats?.username || this.playerName;
    this.roomCode = this.generateRoomCode();
    this.isHost = true;
    this.opponent = null;

    this.currentRoomState = {
      roomCode: this.roomCode,
      jackpot,
      host: { id: this.playerId, name: this.playerName, choice: null, ready: false },
      guest: null,
      status: 'LOBBY',
      messages: []
    };

    // Store in localStorage for cross-tab sharing
    localStorage.setItem(`sos_room_${this.roomCode}`, JSON.stringify(this.currentRoomState));

    this.send({
      type: 'ROOM_CREATED',
      room: this.currentRoomState
    });

    this.emit('onRoomCreated', {
      roomCode: this.roomCode,
      jackpot,
      shareUrl: `${window.location.origin}${window.location.pathname}?room=${this.roomCode}`
    });

    return this.roomCode;
  }

  joinRoom(roomCode, guestName = null) {
    this.roomCode = roomCode.toUpperCase().trim();
    this.playerName = guestName || window.gameMatrix?.stats?.username || this.playerName;
    this.isHost = false;

    // Check localStorage fallback
    const saved = localStorage.getItem(`sos_room_${this.roomCode}`);
    if (saved) {
      this.currentRoomState = JSON.parse(saved);
      this.currentRoomState.guest = { id: this.playerId, name: this.playerName, choice: null, ready: false };
      this.currentRoomState.status = 'READY';
      localStorage.setItem(`sos_room_${this.roomCode}`, JSON.stringify(this.currentRoomState));
      this.opponent = this.currentRoomState.host;
    }

    this.send({
      type: 'JOIN_ROOM',
      roomCode: this.roomCode,
      guest: { id: this.playerId, name: this.playerName }
    });

    return true;
  }

  sendChat(text) {
    const msg = {
      id: 'm_' + Date.now(),
      senderId: this.playerId,
      senderName: this.playerName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    this.send({
      type: 'CHAT_MESSAGE',
      message: msg
    });

    // Local echo
    this.emit('onChatMessage', msg);
  }

  sendQuickBluff(bluffText) {
    this.sendChat(`📢 ${bluffText}`);
  }

  startMatch() {
    if (!this.isHost) return;
    this.send({
      type: 'START_MATCH',
      roomCode: this.roomCode
    });
    this.emit('onGameStart', { roomCode: this.roomCode, duration: 45 });
  }

  lockChoice(choice) {
    this.send({
      type: 'LOCK_CHOICE',
      roomCode: this.roomCode,
      choice
    });
  }

  handleMessage(data) {
    if (!data || !data.type) return;

    // Filter messages for our room
    if (data.roomCode && this.roomCode && data.roomCode !== this.roomCode) return;
    if (data.senderId === this.playerId && data.type !== 'ROOM_SYNC') return; // Ignore own echoes unless sync

    switch (data.type) {
      case 'ROOM_CREATED':
        break;

      case 'JOIN_ROOM':
        if (this.isHost && (!this.opponent || this.opponent.id !== data.senderId)) {
          this.opponent = data.guest;
          if (this.currentRoomState) {
            this.currentRoomState.guest = data.guest;
            this.currentRoomState.status = 'READY';
            localStorage.setItem(`sos_room_${this.roomCode}`, JSON.stringify(this.currentRoomState));
          }

          // Acknowledge back to guest
          this.send({
            type: 'ROOM_SYNC',
            roomState: this.currentRoomState
          });

          this.emit('onPlayerJoined', data.guest);
        }
        break;

      case 'ROOM_SYNC':
        if (!this.isHost && data.roomState) {
          this.currentRoomState = data.roomState;
          this.opponent = data.roomState.host;
          this.emit('onPlayerJoined', this.opponent);
        }
        break;

      case 'CHAT_MESSAGE':
        this.emit('onChatMessage', data.message);
        break;

      case 'START_MATCH':
        this.emit('onGameStart', { roomCode: this.roomCode, duration: 45 });
        break;

      case 'LOCK_CHOICE':
        this.emit('onOpponentLocked', { opponentName: data.senderName, choice: data.choice });
        break;

      case 'REVEAL_OUTCOME':
        this.emit('onReveal', data.outcome);
        break;

      case 'PLAYER_LEFT':
        this.emit('onPlayerLeft', { name: data.senderName });
        break;
    }
  }

  leaveRoom() {
    if (this.roomCode) {
      this.send({ type: 'PLAYER_LEFT' });
      localStorage.removeItem(`sos_room_${this.roomCode}`);
      this.roomCode = null;
      this.opponent = null;
      this.currentRoomState = null;
    }
  }
}

window.multiplayerEngine = new MultiplayerEngine();
