import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import User from '../views/user.vue'
import nav from '../views/nav.vue'

import TeamManage from '../views/TeamManage.vue'
import ProjectManage from '../views/ProjectManage.vue'
import InviteForm from '../views/InviteForm.vue'
import TeamChat from '../views/TeamChat.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:  '/nav',
    },
    {
      path: '/nav',
      name: 'nav',
      component:nav,
      children:[
        //需要用到一级侧边导航的组件路由需要写入这里的子组件，
        //并在nav的相关部分写入$router.push()
        //可以直接呼叫我来写
        {
          path: '/nav/User',
          name: 'User',
          component: User
        },
        {
          path: '/nav/TeamManage',
          name: 'TeamManage',
          component: TeamManage
        },
        {
          path: '/ProjectManage',
          name: 'ProjectManage',
          component: ProjectManage
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
<<<<<<< HEAD
    {
      path: '/TeamManage',
      name: 'TeamManage',
      component: TeamManage
    },
    {
      path: '/ProjectManage',
      name: 'ProjectManage',
      component: ProjectManage
    },
    {
      path: '/ProjectManage',
      name: 'ProjectManage',
      component: ProjectManage
    },    {
      path: '/TeamChat',
      name: 'TeamChat',
      component: TeamChat
    },
=======
>>>>>>> 0274f88c3ee2798419b8e5910cdcf0c7e5d0af87
  ]
})

export default router
