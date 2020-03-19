import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import chatClient from './modules/chatClient';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        chatClient,
        //chat,
    },
    strict: true,
});