import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from './router';
import store from './store';
import $ from 'jquery';
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faPlus,
  faArrowLeft,
  faCircleNotch,
  faPhoneVolume,
  faCalendarDay,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

library.add(
  faPlus,
  faArrowLeft,
  faCircleNotch,
  faPhoneVolume,
  faCalendarDay,
  faCalendarCheck
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.directive('tooltip', function(el, binding){
  $(el).tooltip({
           title: binding.value,
           placement: binding.arg,
           trigger: 'hover'             
       })
})

Vue.config.productionTip = false

new Vue({
  router,
  store: new Vuex.Store(store),
  render: h => h(App),
}).$mount('#app')
