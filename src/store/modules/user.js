import { makeRequestToServer } from "../../util";

const state = {
    chatConnectionToken: '',
    user: null,
    identificationAttempted: false,
    loginErrors: [],
    registrationErrors: [],
};

const getters = {};

const actions = {
    registerUserAction ({commit, state}, user) {
        makeRequestToServer('/api/user/register', {user}, 'POST')
        .then(r => {
            return commit('saveUserToStore', r.user);
        });
    },
    loginUserAction({commit}, username, password){
        makeRequestToServer('/api/user/login', {username, password}, 'POST')
        .then(r => {
            return commit('saveUserToStore', r.user);
        });
    },
    isUserLoggedInAction({commit}) {
        makeRequestToServer('/api/user/me')
        .then(r => {
            commit('setIdentificationAttempted');
            return commit('saveUserToStore', r.user);
        });
    },
    getChatConnectionToken({commit}) {
        makeRequestToServer('/api/user/chat')
        .then(r => {
            return commit('setChatToken', r.user);
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
    setLoginErrors(state, errors) {
        state.loginErrors = errors;
    },
    setRegistrationErrors(state, errors) {
        state.registrationErrors = errors;
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