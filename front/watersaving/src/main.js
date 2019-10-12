import Vue from 'vue'
import App from './App.vue'
//import * as VueGoogleMaps from 'vue2-google-maps'
import router from './router'
import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

Vue.use(vuetify, {
  iconfont: 'md',
})

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
