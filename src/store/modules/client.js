import {makeRequestToServer} from '../../util';
import _ from 'lodash';

const state = {
    client: null,
    guests: null,
    currentGuest: null,
};
const getters = {
    getGuests: state => {
        return state.guests;
    },
    getClient: state => {
        return state.client;
    },
    getCurrentGuest: state => {
        return state.currentGuest;
    }
};
const actions = {
    setClientAction({commit, state}, client) {
        commit('saveClientToStore', client);
        return;
    },
    getClientAction ({dispatch, commit, state}) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/client')
            .then(r => {
                if(r.code === 200) {
                    dispatch('setClientAction', r.client);
                    return resolve();
                }
                return reject();
            });
        });
    },
    createClientAction({dispatch, commit, state}) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/client', {}, 'POST')
            .then(r => {
                if(r.code === 200) {
                    dispatch('setClientAction', r.client);
                    commit('saveGuestsToStore', []);
                    return resolve();
                }
                return reject();
            });
        });
    },
    getGuestsOfClientAction({commit, state}, clientId) {
        return new Promise((resolve, reject) => {
            makeRequestToServer(`/api/client/${clientId}/guest`)
            .then(r => {
                if(r.code === 200) {
                    commit('saveGuestsToStore', r.guests);
                    return resolve();
                }
                return reject();
            });
        });
    },
    setCurrentGuestAction({commit, state}, guestId) {
        commit('setCurrentGuest', guestId);
    },
};
const mutations = {
    saveClientToStore(state, client){
        state.client = client;
    },
    saveGuestsToStore(state, guests){
        state.guests = guests;
    },
    addGuestToStore(state, guest) {
        state.guests = [...state.guests, guest];
    },
    setCurrentGuest(state, guestId) {
        if(guestId === -1) return state.currentGuest = null;
        const guest = _.find(state.guests, {id: guestId});
        state.currentGuest = guest;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};