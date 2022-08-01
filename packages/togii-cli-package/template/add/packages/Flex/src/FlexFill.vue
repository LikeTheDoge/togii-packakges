<template>
  <div class="flex-fill">
    <slot />
  </div>
</template>

<script>
export default {
  name:'FlexFill',
};
</script>

<style scoped>
.flex-fill {
  flex: auto;
}
</style>
