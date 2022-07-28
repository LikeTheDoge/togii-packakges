<template>
  <div class="flex-fixed">
    <slot />
  </div>
</template>

<script>
export default {
  name:'FlexFixed',
};
</script>

<style scoped>
.flex-fixed {
  flex: none;
}
</style>
