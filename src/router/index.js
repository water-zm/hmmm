import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import {
    Message
} from 'element-ui'
import {
    localRemove
} from '@/utils/local'

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
        component: login,
        meta: {
            title: '登录',
            roles: ['超级管理员', '管理员', '老师', '学生']
        }
    }, {
        path: '/login',
        component: login,
        meta: {
            title: '登录',
            roles: ['超级管理员', '管理员', '老师', '学生']
        }
    }, {
        path: '/layout',
        component: layout,
        redirect: '/layout/subject',
        children: [{
            path: 'dataOverview',
            component: dataOverview,
            meta: {
                title: '数据概览',
                icon: 'el-icon-pie-chart',
                roles: ['超级管理员', '管理员', '老师']
            }
        }, {
            path: 'userList',
            component: userList,
            meta: {
                title: '用户列表',
                icon: 'el-icon-user',
                roles: ['超级管理员', '管理员']
            }
        }, {
            path: 'question',
            component: question,
            meta: {
                title: '题库列表',
                icon: 'el-icon-edit-outline',
                roles: ['超级管理员', '管理员', '老师']
            }
        }, {
            path: 'company',
            component: company,
            meta: {
                title: '企业列表',
                icon: 'el-icon-office-building',
                roles: ['超级管理员', '管理员', '老师']
            }
        }, {
            path: 'subject',
            component: subject,
            meta: {
                title: '学科列表',
                icon: 'el-icon-notebook-2',
                roles: ['超级管理员', '管理员', '老师', '学生']
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
    if (!to.meta.roles.includes(store.state.roleInit)) {
        Message.error('你没有权限访问该页面，请重新登录')
        localRemove()
        next('/')
    } else {
        next()
    }
})
router.afterEach((to) => {
    document.title = to.meta.title
    Nprogress.done()
})

export default router