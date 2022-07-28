<template>
  <div style="overflow: hidden;border:1px solid #eee">
    <flex-row style="align-items: center;background:#d6e5ff;">
      <flex-fixed style="width: auto;padding-left:24px">
        <h5>{{ title }}</h5>
      </flex-fixed>
      <flex-fill style="text-align: right">
        <slot name="extra"></slot>
      </flex-fill>
      <flex-fixed class="fixed-right" v-if="hasMore">
        <span @click="toMore"
          >更多
          <eco-icon name="arrow-right" />
        </span>
      </flex-fixed>
    </flex-row>
    <slot></slot>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '标题',
    },
    toMore: {
      type: Function,
      default: undefined,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.fixed-right {
  color: #56575c;
  font-size: 12px;
  line-height: 17px;
  margin-left: 40px;
  span {
    cursor: pointer;
  }
}
</style>
