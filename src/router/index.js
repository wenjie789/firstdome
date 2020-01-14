import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import login from '@/components/login.vue'
import logo from '@/components/behavior/logo.vue'
import togo from '@/components/behavior/togo.vue'
import home from '@/components/ASS/home.vue'

import { checkServerIdentity } from 'tls'

Vue.use(Router)
export default new Router({
  routes: [
 
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/',
      redirect: {
        name: 'login'
    }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/logo',
      name: 'logo',
      component: logo
    },
    {path: '/togo',
      name: 'togo',
      component:togo
    },
    {path:'/home',
      name: 'home',
      component:home
    },

    ]
  })
