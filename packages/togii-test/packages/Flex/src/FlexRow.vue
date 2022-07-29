<template>
  <div class="flex-row">
    <slot />
  </div>
</template>

<script>
export default {
  name:'FlexRow',
};
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
}
</style>
