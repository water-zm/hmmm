import Vue from 'vue'
import VueRouter from 'vue-router'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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
            component: dataOverview,
            meta: {
                title: '数据概览'
            }
        }, {
            path: 'userList',
            component: userList,
            meta: {
                title: '用户列表'
            }
        }, {
            path: 'question',
            component: question,
            meta: {
                title: '题库列表'
            }
        }, {
            path: 'company',
            component: company,
            meta: {
                title: '企业列表'
            }
        }, {
            path: 'subject',
            component: subject,
            meta: {
                title: '学科列表'
            }
        }]
    }]
})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

router.beforeEach((to, from, next) => {
    Nprogress.start()
    next()
})
router.afterEach((to) => {
    document.title = to.meta.title
    Nprogress.done()
})

export default router