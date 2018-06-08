import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import Graph from '@/components/Graph'
import Currencies from '@/components/Currencies'
import Notifications from '@/components/Notifications'

import Register from '@/components/Register'
import Login from '@/components/Login'
import ResetPass from '@/components/ResetPass'
import ResetForm from '@/components/ResetForm'
import ChangePass from '@/components/ChangePass'
import Chart from '@/components/Chart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: []
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: '/graph/:id/:time',
          name: 'Graph',
          component: Graph,
          meta: {
            logged:1
          }
        },
        {
          path: '/currencies',
          name: 'Currencies',
          component: Currencies,
          meta: {
            logged: 1
          }
        },
        {
          path: '/notifications',
          name: 'Notifications',
          component: Notifications,
          meta: {
            logged:1
          }
        },

        {
          path: '/changepass',
          name: 'changepass',
          component: ChangePass,
          meta: {
            logged:1
          }
        },
      ]
    },
    {
      path: '/login/:error?',
      name: 'Login',
      component: Login,
      meta: {
        logged: 0
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        logged: 0
      }
    },
    {
      path: '/reset',
      name: 'resetPass',
      component: ResetPass,
      meta: {
        logged: 0
      }
    },
    {
      path: '/password/reset/:token',
      name: 'resetform',
      component: ResetForm,
      meta: {
        logged: 0
      }
    },
    {
      path: '/chart/:id/:time',
      name: 'Chart',
      component: Chart,
      meta: {
        logged:0
      }
    },

  ]
})
