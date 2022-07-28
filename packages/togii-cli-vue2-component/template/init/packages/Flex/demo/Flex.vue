<template>
  <div>
    <h4>横向</h4>
    <flex-row class="flex-row-box">
      <flex-fixed>flex-fixed</flex-fixed>
      <flex-fill>flex-fill</flex-fill>
    </flex-row>
    <h4>纵向</h4>
    <flex-col class="flex-col-box" :fill="true" style="margin-bottom:24px">
      <flex-fixed>flex-fixed</flex-fixed>
      <flex-fill>flex-fill</flex-fill>
    </flex-col>
    <flex-col class="flex-col-box">
      <flex-fixed>flex-fixed</flex-fixed>
      <flex-fill>flex-fill</flex-fill>
    </flex-col>
  </div>
</template>
<style scoped lang="scss">
.flex-row-box {
  margin-bottom:24px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  vertical-align: middle;
  .flex-fixed {
    color: #fff;
    width:200px;
    background:#3363ff
  }
  .flex-fill {
    background:#d6e5ff;
  }
}
.flex-col-box {
  text-align: center;
  height:200px;
  .flex-fixed {
    color: #fff;
    height:100px;
    background:#3363ff;

  }
  .flex-fill {
    background:#d6e5ff
  }
}
</style>
