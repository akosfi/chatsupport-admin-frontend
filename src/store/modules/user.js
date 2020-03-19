import { makeRequestToServer } from "../../util";

const state = {
    chatConnectionToken: null,
    user: null,
    identificationAttempted: false,
};

const getters = {
    isUserIdentified: (state) => {
        return ((state.user != null) && state.identificationAttempted);
    }
};

const actions = {
    registerUserAction ({commit, state}, user) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/user/register', user, 'POST')
            .then(r => {
                if(r.code === 200) {
                    commit('saveUserToStore', r.user);
                    return resolve();
                }
                return reject();
            });
        });
    },
    loginUserAction({commit}, user){
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/user/login', user, 'POST')
            .then(r => {
                if(r.code === 200) {
                    commit('saveUserToStore', r.user);
                    return resolve();
                }
                return reject();
            });
        });
        
    },
    isUserLoggedInAction({commit}) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/user/me')
            .then(r => {
                if(r.code == 200) {
                    commit('saveUserToStore', r.user);
                    commit('setIdentificationAttempted');
                    return resolve();
                }
                else {
                    return reject();
                }
            });
        });
        
    },
    getChatConnectionToken({commit}) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/user/chat')
            .then(r => {
                if(r.code == 200) {
                    commit('setChatToken', r.user);
                    return resolve();
                }
                else {
                    return reject();
                }
            });
        });
    }
};

const mutations = {
    saveUserToStore(state, user){
        state.user = user;
    },
    removeUserFromStore(state, user) {
        state.user = user;
    },
    setIdentificationAttempted(state) {
        state.identificationAttempted = true;
    },
    setChatToken(state, token) {
        state.chatConnectionToken = token;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};