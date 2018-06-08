// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App'
import router from './router'
import store from './store'
import env from './env'

window.axios = axios;
axios.defaults.baseURL = env.API_URL

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if(router.app.$route.meta.logged) {

    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    } else {
      router.push({path: '/login'})
    }
  }
  return config
})

axios.interceptors.response.use((config) => {
  return config
}, error => {
  if(error.response.status === 401) {
    localStorage.removeItem('token')
    router.push({path: '/login/error'})
  }
})

Vue.use(Vuetify, { theme: {
  primary: '#EF6C00',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
