import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login//login'
import layout from '@/views/layout/layout'
import dataOverview from '@/views/layout/dataOverview/dataOverview.vue'
import userList from '@/views/layout/userList/userList.vue'
import question from '@/views/layout/question/question.vue'
import company from '@/views/layout/company/company.vue'
import subject from '@/views/layout/subject/subject.vue'

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
        }, {
            path: 'userList',
            component: userList
        }, {
            path: 'question',
            component: question
        }, {
            path: 'company',
            component: company
        }, {
            path: 'subject',
            component: subject
        }]
    }]
})
export default router