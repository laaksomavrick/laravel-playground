import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Login from './views/Login'
import Create from './views/Create'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { auth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/create',
            name: 'create',
            component: Create
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authRequired = to.matched.some(route => route.meta.auth)
    const authed = false //TODO
    authRequired && !authed ? next('/login') : next()
})

export default router
