import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login//login'
import layout from '@/views/layout/layout'
import dataOverview from '@/views/layout/dataOverview/dataOverview.vue'

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
        path: '/',
        component: login
    }, {
        path: '/login',
        component: login
    }, {
        path: '/layout',
        component: layout,
        redirect: '/layout/dataOverview',
        children: [{
            path: 'dataOverview',
            component: dataOverview
        }]
    }]
})
export default router