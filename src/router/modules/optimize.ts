import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/optimize',
    component: Layout,
    redirect: '/optimize/dimension-lowering/low-1',
    alwayShow: true,
    meta: { title: '优化管理', icon: 'sfont system-menu' ,roles: ['admin', 'user']},
    children: [
      {
        path: 'low-1',
        component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-1/low-1-1.vue')),
        redirect: '/optimize/dimension-lowering/low-1/low-1-1',
        meta: { title: '降维' },
        children: [
          {
            path: 'low-1-1',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-1/low-1-1.vue')),
            //meta: { title: 'message.menu.menu.menu_1' }
            meta: { title: '主成分分析' }
          },
          {
            path: 'low-1-2',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-1/low-1-2.vue')),
            meta: { title: '因子分析' }
          },
          {
            path: 'low-1-3',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-1/low-1-3.vue')),
            meta: { title: 'K-Means' }
          }
        ]
      },
      {
        path: 'low-2',
        component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-2/low-2-1.vue')),
        //meta: { title: 'message.menu.menu.menu_1' }
        redirect: '/optimize/dimension-lowering/low-2/low-2-1',
        meta: { title: '合并' },
        children: [
          {
            path: 'low-2-1',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-2/low-2-1.vue')),
            //meta: { title: 'message.menu.menu.menu_1' }
            meta: { title: 'Spearman' }
          },
          {
            path: 'low-2-2',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-2/low-2-2.vue')),
            meta: { title: 'Pearson' }
          },
          {
            path: 'low-2-3',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-2/low-2-3.vue')),
            meta: { title: '矩形图' }
          }
        ]
      },
      {
        path: 'low-3',
        component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-3/low-3-1.vue')),
        redirect: '/optimize/dimension-lowering/low-3/low-3-1',
        //meta: { title: 'message.menu.menu.menu_1' }
        meta: { title: '权重分析' },
        children: [
          {
            path: 'low-3-1',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-3/low-3-1.vue')),
            //meta: { title: 'message.menu.menu.menu_1' }
            meta: { title: '径向树状图' }
          },
          {
            path: 'low-3-2',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-3/low-3-2.vue')),
            meta: { title: '普通树状图' }
          },
          {
            path: 'low-3-3',
            component: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/low-3/low-3-3.vue')),
            meta: { title: '矩形图' }
          }
        ]
      }
    ]
  }
]

export default route
