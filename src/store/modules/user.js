import { makeRequestToServer } from "../../util";

const state = {
    chatConnectionToken: null,
    user: null,
    identificationAttempted: false,
};

const getters = {
    isUserIdentified: (state) => {
        return (state.user != null);
    },
    isIdentificationAttempted: (state) => {
        return state.identificationAttempted;
    },
    getUser: (state) => {
        return state.user;
    }
};

const actions = {
    registerUserAction ({commit, state}, user) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/user/register', user, 'POST')
            .then(r => {
                if(r.code === 200) {
                    commit('saveUserToStore', r.user);
                    return resolve(r);
                }
                return reject(r);
            });
        });
    },
    loginUserAction({commit}, user){
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/user/login', user, 'POST')
            .then(r => {
                if(r.code === 200) {
                    commit('saveUserToStore', r.user);
                    return resolve(r);
                }
                return reject(r);
            });
        });
        
    },
    logoutUserAction({commit}, user){
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/user/logout')
            .then(r => {
                commit('deleteUser');
                resolve();
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
                commit('setIdentificationAttempted');
                return reject();

            });
        });
        
    },
    getChatConnectionToken({commit}) {
        return new Promise((resolve, reject) => {
            makeRequestToServer('/api/user/chat-token')
            .then(r => {
                if(r.code == 200) {
                    commit('setChatToken', r.chat_token);
                    return resolve(r.chat_token);
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
    },
    deleteUser(state){
        state.user = null;
        state.identificationAttempted = false;
        state.chatConnectionToken = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};