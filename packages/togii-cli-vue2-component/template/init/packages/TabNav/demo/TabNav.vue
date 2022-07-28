<template>
  <div>
    <tab-nav :fixedNav="fixedNav" />
  </div>
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
