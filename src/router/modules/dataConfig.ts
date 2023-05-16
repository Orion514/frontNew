import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
    {
        path: '/dataConfig',
        component: Layout,
        redirect: '/dataConfig/downAndUpload',
        meta: { title: '数据配置', icon: 'sfont system-home', roles: ['admin', 'user'] },
        children: [
            {
                path: 'downAndUpload',
                component: createNameComponent(() => import('@/views/main/dataConfig/downAndUpload/index.vue')),
                meta: { title: '数据配置管理', icon: 'sfont system-home', hideClose: true }
            }
        ]
    }
]

export default route
