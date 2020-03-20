import {makeRequestToServer} from '../../util/';


const state = {
    client: null,
    userHasClient: false,
    guests: [],
};
const getters = {
    getGuests: state => {
        return state.guests;
    },
    getClient: state => {
        return state.client;
    },
};
const actions = {
    getClientAction ({commit, state}) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/chat')
            .then(r => {
                if(r.code === 200) {

                    commit('saveClientToStore', r.client);
                    commit('setUserHasClient', r.client);
                    return resolve();
                }
                return reject();
            });
        });
    },
    createClientAction({commit, state}) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/chat', {}, 'POST')
            .then(r => {
                if(r.code === 200) {
                    commit('saveClientToStore', r.client);
                    commit('setUserHasClient', r.client);
                    return resolve();
                }
                return reject();
            });
        });
    },
    getGuestsOfClientAction({commit, state}, clientId) {
        return new Promise((resolve, reject) => {
            makeRequestToServer(`/api/chat${clientId}/guest`)
            .then(r => {
                if(r.code === 200) {
                    commit('saveClientToStore', r.client);
                    commit('setUserHasClient', r.client);
                    return resolve();
                }
                return reject();
            });
        });
    }
};
const mutations = {
    saveClientToStore(state, client){
        state.client = client;
    },
    setUserHasClient() {
        state.userHasClient = true;
    },
    saveGuestsToStore(state, guests){
        state.guests = guests;
    },
    addGuestToStore(state, guest) {
        state.guests = [...state.guests, guest];
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};