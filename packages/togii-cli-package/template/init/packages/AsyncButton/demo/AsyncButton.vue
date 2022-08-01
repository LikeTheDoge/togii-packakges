<template>
  <div>
    <async-button :click="() => submit()" type="primary">
      异步提交按钮
    </async-button>
  </div>
</template>
<script>
export default {
  methods: {
    submit() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('Promise___');
        }, 1000 * 3);
      });
    },
  },
};
</script>
