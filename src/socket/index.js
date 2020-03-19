import io from 'socket.io-client';
import Cookies from 'js-cookie';
import {CONNECTED, DISCONNECTED, INCOMING_MESSAGE} from './contsants';


class ChatSocket {
    constructor() {
        this.socket = null;
        this.port = 3000;
        this.chat_token = null;
        this.onChange = null;
        this.onConnectError = null;
        this.onMessage = null;

        this._identify = this._identify.bind(this);
        this._connect = this._connect.bind(this);
        this._onConnected = this._onConnected.bind(this);
        this._onError = this._onError.bind(this);
        //this._setGuest = this._setGuest.bind(this);
    }
    _connect() {
        const host = `http://localhost:${this.port}`;
        
        this.socket = io(host);

        this.socket.on(CONNECTED, this._onConnected);
        this.socket.on(DISCONNECTED, this._onDisconnected);
        //this.socket.on(CONNECT_ERR, this._onError);
        //this.socket.on(GUEST_SET, this._setGuest);
    }

    _identify() {
        this.socket.emit(IDENTIFY_USER, this.chat_token);
    }

    _onDisconnected() {
        this.onChange(false);
    }

    _sendIm(message) {
        this.socket.emit(INCOMING_MESSAGE, message);
    }

    _disconnect() {
        this._onDisconnected();
        this.socket.close();
    }

    _onError(message) {
        this.onConnectError();
        this._disconnect();
    };
}

export default new ChatSocket();