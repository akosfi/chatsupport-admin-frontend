
const state = {
    connected: false,
    triedConnecting: false,
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
    connectionChangedAction({commit, state}, connected) {
        return new Promise((resolve) => {
            commit('connectionChanged', connected);
            resolve();
        });
    },
}

const mutations = {
    connectionChanged (state, connected) {
        state.triedConnecting = true;
        state.connected = connected;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}