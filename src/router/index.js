import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/car',
                    component: () => import(/* webpackChunkName: "car" */ '../components/page/car.vue'),
                    meta: { title: '购物车' }
                },
                {
                    path: '/order',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/order.vue'),
                    meta: { title: '我的订单' }
                },
                {
                    path: '/pre',
                    component: () => import(/* webpackChunkName: "pre" */ '../components/page/pre.vue'),
                    meta: { title: '我的预约' }
                },
                {
                    path: '/member',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/member.vue'),
                    meta: { title: '会员中心' }
                },
                {
                    path: '/help',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/help.vue'),
                    meta: { title: '帮助中心' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "register" */ '../components/page/register.vue'),
            meta: { title: '注册用户' }
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
