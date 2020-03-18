import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login';
import Register from '../pages/Register';

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
    ]
});