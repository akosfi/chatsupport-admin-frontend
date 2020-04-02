import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminPanel from '../pages/AdminPanel';

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
            path: '/chat',
            component: AdminPanel,
            beforeEnter: requireAuth,
        },
    ]
});


function requireAuth(to, from, next) {
   if(store.getters['user/isIdentificationAttempted']) {
       return next();
   }
   return next('/login');
}