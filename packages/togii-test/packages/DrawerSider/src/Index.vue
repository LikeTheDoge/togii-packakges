<template>
    <div :class="{'drawer-sider':true,open}">
        <flex-col class="drawer-sider-inner">
            <flex-fixed class="drawer-sider-head">{{title}}</flex-fixed>
            <flex-fill class="drawer-sider-body">
                <slot name="body"></slot>
            </flex-fill>
            <flex-fixed class="drawer-sider-foot">
                <slot name="foot"></slot>
            </flex-fixed>
        </flex-col>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '核实信息',
      open: false,
    },
  },
  data: () => ({
    open: false,
  }),
  methods: {
    triggle() {
      this.open = !this.open;
    },
    $$open() {
      document.querySelector('body').style.overflowY = 'hidden';
      this.open = true;
    },
    $$close() {
      this.open = false;
      this.$nextTick(() => {
        document.querySelector('body').style.overflowY = 'initial';
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.drawer-sider {
    width: 0;
    opacity: 0;
    &.open {
        width: 800px;
        opacity: 1;
    }
    transition: all 0.5s ease-out;
    background: #fff;
    position: fixed;
    right: 0;
    overflow: hidden;
    top: 0;
    bottom: 0;
    box-shadow: -12px 0px 36px 0 rgb(0 0 0 / 6%);
    z-index: 100;
    .drawer-sider-inner {
        width: 800px;
        height: 100%;

        .drawer-sider-head {
            height: 60px;
            line-height: 59px;
            border-bottom: 1px solid #e9edf1 !important;
            font-size: 18px;
            padding: 0 28px;
        }
        .drawer-sider-body {
            padding: 12px 28px;
            overflow-y: auto;
        }
        .drawer-sider-foot {
            border-top: 1px solid #e9edf1 !important;
        }
        .toolbar-button {
            text-align: right;
            padding: 16px;
            button {
                height: 48px;
                width: 165px;
                margin-left: 16px;
            }
        }
    }
}
</style>
