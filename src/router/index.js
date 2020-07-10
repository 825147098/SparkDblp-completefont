import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/brores',
        name: 'BroRes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/browse/BrowseResult.vue'),

        children: [
            {
                path: '/brores/per',
                name: 'BroResPer',
                component: () => import('../views/browse/BrowseResultPerson'),

            }
        ]
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search/search'),
        children: [
            //默认页面
            {
                path: '/',
                redirect: '/search/rules'
            }, {
                path: '/search/rules',
                name: 'rule',
                component: () => import('../views/search/searchRule')
            },{
                path: '/search/author',
                name: 'author',
                component: () => import('../views/search/searchAuthor')
            }
        ]
    },
    {
        path: '/resAut',
        name:'resaut',
        component: () => import('../views/Result/resultAuthor')
    }
]

const router = new VueRouter({
    routes
})

export default router