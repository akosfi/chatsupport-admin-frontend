import {makeRequestToServer} from '../../util/';
import _ from 'lodash';

const state = {
    client: null,
    userHasClient: false,
    guests: [],
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
    setClientAction({commit, state}, chatClient) {
        commit('saveClientToStore', chatClient);
        commit('setUserHasClient', chatClient);
        return;
    },
    getClientAction ({dispatch, commit, state}) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/chat')
            .then(r => {
                if(r.code === 200) {
                    dispatch('setClientAction', r.chatClient);
                    return resolve();
                }
                return reject();
            });
        });
    },
    createClientAction({dispatch, commit, state}) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/chat', {}, 'POST')
            .then(r => {
                if(r.code === 200) {
                    dispatch('setClientAction', r.chatClient);
                    return resolve();
                }
                return reject();
            });
        });
    },
    getGuestsOfClientAction({commit, state}, clientId) {
        return new Promise((resolve, reject) => {
            makeRequestToServer(`/api/chat/${clientId}/guest`)
            .then(r => {
                if(r.code === 200) {
                    commit('saveGuestsToStore', r.guests);//!!!!!!!!!!!!!!!!4
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