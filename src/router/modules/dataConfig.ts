import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/dataConfig',
        meta: { title: 'message.menu.dataConfig.name', icon: 'sfont system-home' },
        children: [
            {
                path: 'dataConfig',
                component: createNameComponent(() => import('@/views/main/dashboard/index.vue')),
                meta: { title: 'message.menu.dashboard.index', icon: 'sfont system-home', hideClose: true }
            }
        ]
    }
]

export default route
