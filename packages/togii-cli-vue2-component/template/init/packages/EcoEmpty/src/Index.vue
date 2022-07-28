<template>
  <div class="empty-wrap">
    <div v-if="loading">
      <a-spin tip="正在加载" :spinning="loading" style="margin-top: 60px" />
    </div>
    <div v-else>
      <img
        v-if="imgSrc"
        :src="imgSrc"
        :style="{ width: width + 'px' }"
      />
      <img-default v-else />
      <p :style="{ fontSize: fontSize + 'px' }">{{ text }}</p>
    </div>
  </div>
</template>
<script>
import imgDefault from './null.svg';
export default {
  props: {
    // 缺省文案
    text: {
      type: String,
      default: '暂无数据',
    },
    // 图片路径
    imgSrc: {
      type: String,
      default: '',
    },
    // 图片宽度
    width: {
      type: Number,
      default: 100,
    },
    // 字体大小
    fontSize: {
      type: Number,
      default: 14,
    },
    loading: {
      default: false,
    },
  },
  components: {
    imgDefault,
  },
};
</script>
<style lang="scss">
.empty-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 24px;
    color: #777777;
    font-weight: 400;
    text-align: center;
  }
}
</style>
