import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
    {
        path: '/scene',
        component: Layout,
        redirect: '/scene/manage',
        meta: { title: '指标体系树管理', icon: 'sfont system-home', roles: ['admin', 'user'] },
        children: [
            {
                path: 'manage',
                component: createNameComponent(() => import('@/views/main/scene/manage/index.vue')),
                meta: { title: '指标体系树管理', icon: 'sfont system-home', hideClose: true }
            },
            // {
            //     path: 'test',
            //     component: createNameComponent(()=>import('@/views/main/scene/test.vue')),
            //     meta: {title: '场景二测试',icon:'sfont system-home', hideClose: true}
            // }
        ]
    }
]

export default route
