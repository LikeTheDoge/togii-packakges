<template>
  <div class="nav-container">
    <anchor-nav :list="list">
      <div
        class="item"
        :id="v.key"
        :key="v.key"
        v-for="v in list"
      >
        {{v.title}}
      </div>
    </anchor-nav>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: [
      { title: '基本信息', key: 'jbxx', target: () => document.getElementById('jbxx') },
      { title: '环境信息', key: 'hjxx', target: () => document.getElementById('hjxx') },
      { title: '项目成果', key: 'xmcg', target: () => document.getElementById('xmcg') },
      { title: '服务授权', key: 'fwsq', target: () => document.getElementById('fwsq') },
      { title: '工作记录', key: 'gzjl', target: () => document.getElementById('gzjl') },
      { title: '联系人', key: 'lxr', target: () => document.getElementById('lxr') },
    ],
  }),
};
</script>

<style>
.nav-container {
  width: calc(100% - 700px);
  height: 100%;
  position: absolute;
  overflow-y: auto;
}
.item {
  height: 300px;
  line-height: 300px;
  background: #66ccff;
  font-size: 28px;
  margin: 12px 0;
  text-align: center;
}
.nav-container + div {
  margin-top: 1000px;
}
</style>
