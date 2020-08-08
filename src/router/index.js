import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: 'Login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/home',
        name: 'Home',
        redirect: '/welcome',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Home.vue'),
        children: [{
                meta: {
                    title: '首页'
                },
                path: '/welcome',
                component: () =>
                    import ('@/components/Welcome.vue')
            },
            {
                meta: {
                    title: '用户管理'
                },
                path: '/users',
                component: () =>
                    import ('@/views/user/index.vue')
            },
            {
                meta: {
                    title: '数据统计'
                },
                path: '/data',
                component: () =>
                    import ('@/views/data/index.vue')
            },
            {
                meta: {
                    title: '角色管理'
                },
                path: '/roles',
                component: () =>
                    import ('@/views/role/index.vue')
            },
            {
                meta: {
                    title: '权限管理'
                },
                path: '/rights',
                component: () =>
                    import ('@/views/right/index.vue')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

// 挂载前置路由导航守卫
router.beforeEach((to, from, next) => {
    console.log(to, from, next);
    document.title = to.meta.title;
    if (to.path === '/login') return next();
    //获取到sessionStorage存储的token
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) { // 如果token不存在 说明用户未登录 强制跳转到登录页面
        return next('/login');
    }
    // 如果token存在 说明用户已经登录 直接放行
    next();
})


export default router