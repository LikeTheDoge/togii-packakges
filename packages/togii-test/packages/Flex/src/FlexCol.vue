<template>
  <div :class="['flex-col'].concat(fill ? ['flex-col_fill'] : [])">
    <slot />
  </div>
</template>

<script>
export default {
  name:'FlexCol',
  props: ["fill"],
};
</script>

<style scoped>
.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-col_fill {
  height: 100%;
  flex: auto;
}
</style>
