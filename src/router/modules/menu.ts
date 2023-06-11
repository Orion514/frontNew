import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import MenuBox from '@/components/menu/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu/menu-1',
    alwayShow: true,
    meta: { title: '指标体系树', icon: 'sfont system-menu',roles: ['admin', 'user'] },
    children: [
      {
        path: 'menu-1',
        component: createNameComponent(() => import('@/components/menu/index.vue')),
        redirect: '/menu/menu-1/menu-1-1',
        meta: { title: '指标体系1' },
        children: [
          {
            path: 'menu-1-1',
            component: createNameComponent(() => import('@/components/menu/index.vue')),
            //meta: { title: 'message.menu.menu.menu_1' }
            meta: { title: '径向树状图' }
          },
          {
            path: 'menu-1-2',
            component: createNameComponent(() => import('@/views/main/menu/menu-1/menu-1-2.vue')),
            meta: { title: '普通树状图' }
          },
          {
            path: 'menu-1-3',
            component: createNameComponent(() => import('@/views/main/menu/menu-1/menu-1-3.vue')),
            meta: { title: '矩形图' }
          }
        ]
      },
      {
        path: 'menu-2',
        component: createNameComponent(() => import('@/components/menu/index.vue')),
        //meta: { title: 'message.menu.menu.menu_1' }
        meta: { title: '指标体系2' },
        redirect: '/menu/menu-2/menu-2-1',
        children: [
          {
            path: 'menu-2-1',
            component: createNameComponent(() => import('@/views/main/menu/menu-2/menu-2-1.vue')),
            //meta: { title: 'message.menu.menu.menu_1' }
            meta: { title: '径向树状图' }
          },
          {
            path: 'menu-2-2',
            component: createNameComponent(() => import('@/views/main/menu/menu-2/menu-2-2.vue')),
            meta: { title: '普通树状图' }
          },
          {
            path: 'menu-2-3',
            component: createNameComponent(() => import('@/views/main/menu/menu-2/menu-2-3.vue')),
            meta: { title: '矩形图' }
          }
        ]
      },
      {
        path: 'menu-3',
        component: createNameComponent(() => import('@/components/menu/index.vue')),
        //meta: { title: 'message.menu.menu.menu_1' }
        meta: { title: '指标体系3' },
        redirect: '/menu/menu-3/menu-3-1',
        children: [
          {
            path: 'menu-3-1',
            component: createNameComponent(() => import('@/views/main/menu/menu-3/menu-3-1.vue')),
            //meta: { title: 'message.menu.menu.menu_1' }
            meta: { title: '径向树状图' }
          },
          {
            path: 'menu-3-2',
            component: createNameComponent(() => import('@/views/main/menu/menu-3/menu-3-2.vue')),
            meta: { title: '普通树状图' }
          },
          {
            path: 'menu-3-3',
            component: createNameComponent(() => import('@/views/main/menu/menu-3/menu-3-3.vue')),
            meta: { title: '矩形图' }
          }
        ]
      }
    ]
  }
]

export default route
