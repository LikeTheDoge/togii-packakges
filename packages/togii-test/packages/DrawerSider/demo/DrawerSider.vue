<template>
  <div>
    <a-button @click="open" type="primary">Open</a-button>
    <drawer-sider ref="drawerSider" title="标题">
      <template #body>
        <div style="height:1200px">
          这是body部分
        </div>
      </template>
      <template #foot>
        <div style="text-align:right;margin:24px">
          <a-button @click="close">关闭</a-button>
        </div>
      </template>
    </drawer-sider>
  </div>
</template>
<script>
export default {
  methods: {
    open() {
      this.$refs.drawerSider.$$open();
    },
    close() {
      this.$refs.drawerSider.$$close();
    },
  },
};
</script>
