import io from 'socket.io-client';
import Cookies from 'js-cookie';
import {CONNECTED, DISCONNECTED, INCOMING_MESSAGE, IDENTIFY_USER} from './contsants';


class ChatSocket {
    constructor() {
        this.port = 3000;
        this.chat_token = null;
        this.user_id = null;
        this.onChange = null;
        this.onMessage = null;

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.sendIm = this.sendIm.bind(this);
        this._identify = this._identify.bind(this);
        this._onConnected = this._onConnected.bind(this);
        this._onDisconnected = this._onDisconnected.bind(this);
        this._onError = this._onError.bind(this);
    }
    connect() {
        const host = process.env.VUE_APP_SERVER_URL;
        
        this.socket = io(host);

        this.socket.on(CONNECTED, this._onConnected);
        this.socket.on(DISCONNECTED, this._onDisconnected);
    }

    sendIm(message) {
        this.socket.emit(INCOMING_MESSAGE, message);
    }

    _identify() {
        this.socket.emit(IDENTIFY_USER, {token: this.chat_token, id: this.user_id});
    }

    _onConnected() {
        this._identify();
        this.socket.on(INCOMING_MESSAGE, this.onMessage);
        this.onChange(true);
    }

    _onDisconnected() {
        this.onChange(false);
    }

    disconnect() {
        this._onDisconnected();
        this.socket.close();
    }

    _onError() {
        this._disconnect();
    };
}

export default new ChatSocket();