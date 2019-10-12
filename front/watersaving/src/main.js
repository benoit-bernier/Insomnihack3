import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import axios from 'axios'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts'
import VueNativeSock from 'vue-native-websocket'



Vue.config.productionTip = false

Vue.use(vuetify, {
  iconfont: 'md',
})

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_API,
    libraries: 'places', 
  }
})

Vue.use(VueNativeSock, 'ws://ec2-3-83-159-102.compute-1.amazonaws.com:8080/', {
  connectManually: true,
})


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
