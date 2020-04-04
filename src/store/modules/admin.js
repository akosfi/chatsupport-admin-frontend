import { makeRequestToServer } from "../../util";

const state = {
    admins: null,
    adminAddingErrors: null,
};

const getters = {
    getAdmins: (state) => {
        return state.admins;
    },
    getAdminAddingErrors: (state) => {
        return state.adminAddingErrors;
    }
};
const actions = {
    getAdminsAction ({dispatch, commit, state}, clientId) {
        return new Promise((resolve, reject) => {
            makeRequestToServer(`/api/client/${clientId}/admin`)
            .then(r => {
                if(r.code === 200) {
                    commit('saveAdmins', r.admins);
                    return resolve();
                }
                return reject();
            });
        });
    },
    addAdminAction({dispatch, commit, state}, {email, clientId}){
        return new Promise((resolve, reject) => {
            makeRequestToServer(`/api/client/${clientId}/admin`, {email}, 'POST')
            .then(r => {
                if(r.code === 200) {
                    commit('addAdmin', r.admin);
                    return resolve();
                }
                return reject();
            });
        });
    }
};
const mutations = {
    saveAdmins(state, admins) {
        state.admins = admins;
    },
    addAdmin (state, admin) {
        state.admins.push(admin);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};