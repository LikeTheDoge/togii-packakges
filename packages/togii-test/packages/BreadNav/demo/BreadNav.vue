<template>
  <bread-nav :fixedNav="fixedNav" :separator="'>'"/>
</template>
<script>
export default {
  data() {
    return {
      fixedNav: {
        name: '介绍',
        path: '/intro',
      },
    };
  },
};
</script>
