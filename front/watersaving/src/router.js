import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import Stats from '@/views/Stats'
import Settings from '@/views/Settings'

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Map,
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    }
  ]
})
