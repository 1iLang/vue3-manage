import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path: '/',
        name: 'home',
        component: () => import('../views/home/home.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/mall/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/index.vue')
      },
      {
        path: '/other',
        name: 'other',
        component: () => import('../views/other/index.vue'),
        children: [
          {
            path: '/page1',
            name: 'page1',
            component: () => import('../views/other/page1.vue')
          },
          {
            path: '/page2',
            name: 'page2',
            component: () => import('../views/other/page2.vue')
          }
        ]
      },
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router