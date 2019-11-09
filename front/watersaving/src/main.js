import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import store from './store'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts'
import VueNativeSock from 'vue-native-websocket'
import * as VeeValidate from 'vee-validate';
import validatorMessage from 'vee-validate/dist/locale/fr'

VeeValidate.Validator.localize({fr : validatorMessage})
const options = {
  locale : 'fr'
}

Vue.use(VeeValidate,options)

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

Vue.use(VueNativeSock, 'ws://localhost:3001/', {
  connectManually: true,
})

const token = localStorage.getItem('jwtToken')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
