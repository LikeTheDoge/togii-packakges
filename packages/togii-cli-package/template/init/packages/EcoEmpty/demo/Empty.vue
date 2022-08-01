<template>
  <div>
    <eco-empty :loading="loading" />
  </div>
</template>
<script>
import imgSrc from '../images/logo.png';
export default {
  data() {
    return {
      imgSrc,
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
