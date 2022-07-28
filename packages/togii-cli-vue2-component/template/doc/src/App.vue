<template>
    <div id="root">
        <div id="app">
            <!-- <app-header class="header"></app-header> -->
            <app-sidebar></app-sidebar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AppSidebar from "./AppSidebar.vue";
import AppHeader from "./AppHeader.vue";
import { nav } from "../build/route.js";
export default {
    components: { AppSidebar, AppHeader },
    data() {
        return {
            nav,
        };
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
#root {
    font-weight: 400px;
    background: #fff;
}

#app {
    max-width: 1504px;
    display: flex;
    margin: 0 auto;
}
</style>
