import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(vuetify, {
  iconfont: 'md',
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
