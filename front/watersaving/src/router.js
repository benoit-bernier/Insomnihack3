import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import Stats from '@/views/Stats'
import Settings from '@/views/Settings'
import History from '@/views/History'
import Login from '@/views/Login'
import store from '@/store'
Vue.use(Router)


function isAuth (to, from, next) {
  if(!!store.getters.isAuth) {
    next()}
  else{
    next('/')
  }
 }

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Map,
      beforeEnter : isAuth
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
      beforeEnter : isAuth
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
      beforeEnter : isAuth,
      props : true
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      beforeEnter : isAuth
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      beforeEnter : isAuth
    }
  ]
})
