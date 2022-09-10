import './style/root-var.css';
import './style/variables.scss';
import './style/mixin.scss';
import 'ant-design-vue/dist/antd.less';
import './style/normalize.scss';
import './style/base.scss';
import './style/antoverlay.scss';
import 'github-markdown-css';
import './theme/markdown.less';
import 'highlight.js/styles/atom-one-light.css';
// import './style/theme.scss'

import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import DemoArea from './DemoArea'

Vue.config.productionTip = false;

Vue.use(Antd);

Vue.component('DemoArea',DemoArea)

new Vue({
    render: h => h(App),
}).$mount('#app');