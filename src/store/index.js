import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import client from './modules/client';
import socket from './modules/socket';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        client,
        socket,
    },
    strict: true,
});