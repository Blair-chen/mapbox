// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mapboxgl from 'mapbox-gl'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.config.productionTip = false
// mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhaXItY2hlbiIsImEiOiJjaml0d2tkaXYxNXJpM3drYjNreDNhanY5In0.pC79Wh1HPeYqjZXYQOth9g';
// const map = new mapboxgl.Map({
//     container: "<div id='map'></div>",
//     style: 'mapbox://styles/mapbox/streets-v9'
// });

/* eslint-disable no-new */
Vue.use(iView);
new Vue({
  el: '#app',
  router,
  components: { App, mapboxgl },
  template: '<App/>'
})
