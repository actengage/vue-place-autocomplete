import Vue from 'vue';
import install from '.';
import App from './App.vue';

Vue.use(install);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
