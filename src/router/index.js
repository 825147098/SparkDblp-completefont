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
        component: () => import('../views/search/Search'),
        children: [
            //默认页面
            {
                path: '/',
                redirect: '/search/complete'
            }, {
                path: '/search/rules',
                name: 'rule',
                component: () => import('../views/search/SearchRule')
            },{
                path: '/search/author',
                name: 'author',
                component: () => import('../views/search/SearchAuthor')
            },{
                path: '/search/complete',
                name:'complete',
                component: () => import('../views/search/SearchComplete')
            },{
                path: '/search/venue',
                name:'venue',
                component: () => import('../views/search/SearchVenue')
            },{
                path: '/search/publicat',
                name:'publicat',
                component: () => import('../views/search/SearchPublication')
            }
        ]
    },
    {
        path: '/resAut',
        name:'resaut',
        component: () => import('../views/Result/ResultAuthor')
    },
    {
        path: '/resVen',
        name:'resven',
        component: () => import('../views/Result/ResultVenue')
    },
]

const router = new VueRouter({
    routes
})

export default router
