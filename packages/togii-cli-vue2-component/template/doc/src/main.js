import Vue from 'vue';
import Antd from 'ant-design-vue';
import './style/root-var.css';
import './style/variables.scss';
import './style/mixin.scss';
import 'ant-design-vue/dist/antd.less';
import './style/normalize.scss';
import './style/base.scss';
import './style/antoverlay.scss';
import App from './App.vue';
import router from './router';
import VueRouter from 'vue-router';
import Components from '../../packages/components';
import MarkDownPostCodeView from './MarkDownPostCodeView.vue';
import MarkDownPost from './MarkDownPost.vue';
import DemoArea from './DemoArea'
import 'github-markdown-css';
import './theme/markdown.less';
import 'highlight.js/styles/atom-one-light.css';

Vue.config.productionTip = false;

Vue.component('DemoArea',DemoArea)
Vue.component('MarkDownPost', MarkDownPost);
Vue.component('MarkDownPostCodeView', MarkDownPostCodeView);

Vue.use(Antd);
Vue.use(VueRouter);
Vue.use(Components);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
