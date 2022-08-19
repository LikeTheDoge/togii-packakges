import { routes, base } from '../build/route.js';
import VueRouter from 'vue-router';

export default new VueRouter({
    base,
    mode: 'history',
    linkActiveClass: 'active',
    routes,
    scrollBehavior: (to) => {
        if (to.hash) {
            return {
                selector: to.hash,
            };
        } else {
            return { top: 0 }
        }
    },

});