import io from 'socket.io-client';
import {getServerUrl} from '../../util';
import {CONNECTED, DISCONNECTED, INCOMING_MESSAGE, IDENTIFY_USER} from '../../socket/contsants';

let socket;

const state = {
    connected: false,
    triedConnecting: false,
    user_id: null,
    chat_token: null,
};

const getters = {
    isConnected: (state) => {
        return state.connected;
    },
    hasTriedConnecting: (state) => {
        return state.triedConnecting;
    }
}

const actions = {
    setCredentialsAction({commit, state}, {user_id, chat_token}) {
        return new Promise((resolve) => {
            commit('setCredentials', {user_id, chat_token});
            resolve();
        });
    },
    connectAction({commit, state, dispatch}) {
        return new Promise((resolve) => {
            const host = getServerUrl();
            socket = io(host);

            socket.on(CONNECTED, () => {
                dispatch('identifyUserAction');
                dispatch('connectionChangedAction', true);
            });
            socket.on(DISCONNECTED, () => dispatch('connectionChangedAction', false));
            socket.on(INCOMING_MESSAGE, (data) => dispatch('client/addMessageAction', data.message, {root:true}))

            resolve();
        });
    },
    connectionChangedAction({commit, state}, connected) {
        return new Promise((resolve) => {
            commit('connectionChanged', connected);
            resolve();
        });
    },
    sendMessageAction({commit, state}, message) {
        return new Promise((resolve) => {
            socket.emit(INCOMING_MESSAGE, message);
            resolve();
        });
    },
    identifyUserAction({commit, state}) {
        return new Promise((resolve) => {
            socket.emit(IDENTIFY_USER, {token: state.chat_token, id: state.user_id});
            resolve();
        });
    },
    disconnectAction({commit, state}) {
        return new Promise((resolve) => {
            socket.disconnect();
            socket = null;
            commit('resetSocket');
            resolve();
        });
    }
}

const mutations = {
    setCredentials(state, {user_id, chat_token}) {
        state.user_id = user_id;
        state.chat_token = chat_token;
    },
    connectionChanged (state, connected) {
        state.triedConnecting = true;
        state.connected = connected;
    },
    resetSocket() {
        state.connected = false;
        state.triedConnecting = false;
        state.user_id = null;
        state.chat_token = null;
    }
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}