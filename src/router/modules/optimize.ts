import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/optimize',
    component: Layout,
    redirect: '/optimize/dimension-lowering',
    alwayShow: true,
    meta: { title: '优化管理', icon: 'sfont system-menu' ,roles: ['admin', 'user']},
    children: [
      {
        path: 'dimension-lowering',
        component: createNameComponent(() => import('@/components/menu/index.vue')),
        redirect: '/optimize/dimension-lowering/PCA',
        meta: { title: '降维' },
        children: [
          {
            path: 'PCA',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-1.vue')),
            //meta: { title: 'message.menu.menu.menu_1' }
            meta: { title: '主成分分析' }
          },
          {
            path: 'low-2',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-2.vue')),
            meta: { title: '因子分析' }
          },
          {
            path: 'low-3',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-3.vue')),
            meta: { title: 'K-Means' }
          }
        ]
      },
      {
        path: 'merge',
        component: createNameComponent(() => import('@/components/menu/index.vue')),
        //meta: { title: 'message.menu.menu.menu_1' }
        redirect: '/optimize/merge/merge-1',
        meta: { title: '合并' },
        children: [
          {
            path: 'merge-1',
            component: createNameComponent(() => import('@/views/main/optimize/merge/merge-1.vue')),
            //meta: { title: 'message.menu.menu.menu_1' }
            meta: { title: 'Spearman' }
          },
          {
            path: 'merge-2',
            component: createNameComponent(() => import('@/views/main/optimize/merge/merge-2.vue')),
            meta: { title: 'Pearson' }
          }
        ]
      },
      {
        path: 'weight',
        component: createNameComponent(() => import('@/components/menu/index.vue')),
        redirect: '/optimize/weight/entropy',
        //meta: { title: 'message.menu.menu.menu_1' }
        meta: { title: '权重分析' },
        children: [
          {
            path: 'entropy',
            component: createNameComponent(() => import('@/views/main/optimize/weight/entropy.vue')),
            //meta: { title: 'message.menu.menu.menu_1' }
            meta: { title: '熵权法' }
          }
        ]
      }
    ]
  }
]

export default route
