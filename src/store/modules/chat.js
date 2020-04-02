const state = {
    messages: [
        {
            id: 0,
            date: new Date(),
            text: "Hi!",
            fromAdmin: false,
        },
        {
            id: 1,
            date: new Date(),
            text: "Heyy!",
            fromAdmin: true,
        },
    ],
};
const getters = {
    getMessages: state => {
        return state.messages;
    },
};
const actions = {};
const mutations = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};