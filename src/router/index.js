import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // name: 'Home',
        redirect: '/search',
        // component: Home
    },
    {
        path: '/brores',
        name: 'BroRes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/browse/BrowseResult.vue'),

        children: [
            {
                path: '/brores/per',
                name: 'BroResPer',
                component: () => import('../views/browse/BrowseResultPerson'),

            },
            {
                path: '/brores/journals',
                name: 'BroResJour',
                component: () => import('../views/browse/BrowseResultJournal'),

            },
            {
                path: '/brores/conf',
                name: 'BroResConf',
                component: () => import('../views/browse/BrowseResultConf'),

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
                redirect: '/search/publicat'
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
    {
        path: '/resJou',
        name:'resjou',
        component: () => import('../views/Result/ResultJournal')
    },
    {
        path: '/charts',
        name:'charts',
        component: () => import('../views/charts/Charts')
    },
]

const router = new VueRouter({
    routes
})

export default router
