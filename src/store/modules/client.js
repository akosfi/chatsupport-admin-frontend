import {makeRequestToServer} from '../../util';
import _ from 'lodash';

const state = {
    client: null,
    guests: null,
    currentGuest: null,
    currentGuestMessages: null,
    unseenMessagesCount: null,
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
    },
    getCurrentGuestMessages: state => {
        return state.currentGuestMessages;
    },
    getUnseenMessageCountForGuest: state => id => {
        if(!state.unseenMessagesCount) return 0;
        const guest = state.unseenMessagesCount.find(g => g.id === id);
        if(!guest) return 0;
        return state.unseenMessagesCount.find(g => g.id === id).messageCount;
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
    getUnseenMessagesOfClient({commit, state}, clientId) {
        return new Promise((resolve, reject) => {
            makeRequestToServer(`/api/client/${clientId}/unseen`)
            .then(r => {
                if(r.code === 200) {
                    commit('saveUnseenMessagesToStore', r.guests);
                    return resolve();
                }
                return reject();
            });
        });
    },
    setCurrentGuestAction({commit, dispatch}, guestId) {
        return new Promise((resolve, reject) => {
            makeRequestToServer(`/api/guest/${guestId}`)
            .then(r => {
                if(r.code === 200) {
                    commit('setCurrentGuest', guestId);
                    commit('saveGuestMessagesToStore', r.messages);

                    r.messages.forEach((message) => {
                        dispatch('socket/setMessageSeenAction', message, {root: true});
                    });

                    return resolve();
                }
                return reject();
            });
        });
    },
    addMessageAction({commit, state, dispatch}, message) {
        return new Promise((resolve, reject) => {
            dispatch('getUnseenMessagesOfClient', state.client.id);
            commit('saveMessageToStore', message);
            resolve();
        });
    },
    addGuestAction({commit, state, dispatch}, guest) {
        return new Promise((resolve, reject) => {
            commit('addGuestToStore', guest);
            resolve();
        });
    },
    setMessageSeenAction({commit, state}, message) {
        return new Promise((resolve, reject) => {
            commit('setMessageSeen', message);
            resolve();
        });
    }
};
const mutations = {
    saveClientToStore(state, client){
        state.client = client;
    },
    saveGuestsToStore(state, guests){
        state.guests = guests;
    },
    addGuestToStore(state, guest) {
        if(state.guests.find(g => g.id === guest.id)) return;
        state.guests = [...state.guests, guest];
    },
    setCurrentGuest(state, guestId) {
        if(guestId === -1) return state.currentGuest = null;
        const guest = _.find(state.guests, {id: guestId});
        state.currentGuest = guest;
    },
    saveGuestMessagesToStore(state, messages) {
        state.currentGuestMessages = messages;
    },
    saveMessageToStore(state, message) {
        if(message.guest_user_id !== state.currentGuest.id) return;
        state.currentGuestMessages.push(message);
    },
    setMessageSeen(state, message) {
        state.currentGuestMessages.find(m => m.id === message.id).seen = true;
    },
    saveUnseenMessagesToStore(state, messages) {
        state.unseenMessagesCount = messages;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};