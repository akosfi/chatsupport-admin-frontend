import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import client from './modules/client';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        client,
        //chat,
    },
    strict: true,
});