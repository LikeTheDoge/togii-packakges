<template>
    <div class="breadcumb">
        <ul>
          <li v-for="(v,i) in lists" :key="i">
            <router-link :to="{path:v.path}" tag="span">{{(v.meta&&v.meta.title) || v.name}}</router-link>
            <span class="separator" v-if="i<lists.length-1">{{separator}}</span>
          </li>
        </ul>
      </div>
</template>

<script>

export default {
  name: 'BreadNav',
  props: {
    fixedNav: {
      type: Object,
      default: () => {},
    },
    separator: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      lists: [],
    };
  },
  // 监听路由变化
  watch: {
    $route(to, from) {
      let { matched } = to; // this.$route.matched
      if (matched.length && matched[0].name !== this.fixedNav.name) {
        matched = [this.fixedNav, ...matched];
      }
      this.lists = matched;
    },
  },
  mounted() {
    let { matched } = this.$route;
    if (matched.length && matched[0].name !== this.fixedNav.name) {
      matched = [this.fixedNav, ...matched];
    }
    this.lists = matched;
  },
};
</script>
<style lang="scss" scoped>
.breadcumb ul>li {
  display: inline-block;
  &:not(:last-child){
    cursor: pointer;
  }
  span.separator {
    margin: 0 12px;
  }
}
</style>
