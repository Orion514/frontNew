import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
    {
        path: '/user',
        component: Layout,
        redirect: '/user/userManager',
        meta: { title: '用户管理', icon: 'el-icon-document-copy' , roles: ['admin'] },
        children: [
            {
                path: 'userManager',
                component: createNameComponent(() => import('@/views/main/user/index.vue')),
                meta: { title: '用户管理', cache: false, hideClose:true,  roles: ['admin'] }
            }
        ]
    }
]

export default route
