<template>
    <a-button
        :disabled="disabled"
        :ghost="ghost"
        :htmlType="htmlType"
        :icon="icon"
        :loading="loading"
        :shape="shape"
        :size="size"
        :block="block"
        :type="type"
        @click="(...arg) => onClick(...arg)"
    >
        <slot></slot>
    </a-button>
</template>

<script>
export default {
  props: [
    'disabled',
    'ghost',
    'htmlType',
    'icon',
    'shape',
    'size',
    'type',
    'block',
    'click',
  ],
  data: () => ({
    loading: false,
  }),
  methods: {
    onClick(...arg) {
      if (!this.click) return;

      this.loading = true;
      
      Promise
        .resolve(this.click(...arg))
        .finally(() => { this.loading = false; });
    },
  },
};
</script>

<style></style>
