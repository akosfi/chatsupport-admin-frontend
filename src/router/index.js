import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminPanel from '../pages/AdminPanel';
import Chat from '../components/Chat';
import ChatAdmins from '../components/ChatAdmins';

import store from '../store';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/',
            component: AdminPanel,
            children: [
                {
                    path: '/chat',
                    component: Chat
                },
                {
                    path: '/admins',
                    component: ChatAdmins
                },
            ],
        },
    ]
});
