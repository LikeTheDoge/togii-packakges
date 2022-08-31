<template>
    <div class="cntr">
        <div
            class="content"
            ref="content"
            @scroll="contentOnScroll"
        >
            <slot></slot>
        </div>
        <div
            class="sider"
            ref="sider"
        >

            <div class="title">
                快速导航
            </div>
            <div class="list">

                <div
                    v-for="v in list"
                    :key="v.key"
                    :class="{
                        focus:v === focus
                    }"
                    @click="scrollTo(v)"
                >{{v.title}}</div>

            </div>
        </div>
    </div>
</template>


<script>
import Vue from 'vue';
export default {

  props: {
    list: {
      default: [],
    },
  },
  data: () => ({
    focus: null,
    topMap: new Map(),
  }),
  mounted() {
    this.focus = this.list[0];
    // 工作日志锚点全局挂载
    const that = this;
    Vue.prototype.$locationWork = function () {
      that.$refs.content.scrollTop = that.list[1].target().offsetTop + 180;
    };
    Vue.prototype.$locationWorkList = function () {
      that.$refs.content.scrollTop = that.list[1].target().offsetTop;
    };
  },
  methods: {
    contentOnScroll() {
      if (this.list.length === 0) return;
      this.calcuItemTop();

      const curTop = this.$refs.content.scrollTop;
      let focus = null;

      this.list.forEach(v => {
        const { bottom, top } = this.topMap.get(v);

        if ((curTop >= top)) focus = v;
      });

      this.focus = focus;
    },
    calcuItemTop() {
      if (this.$calcu) return;
      this.$calcu = true;

      const innerheight = this.$refs.content.scrollHeight - this.$refs.content.clientHeight;
      const outerheight = this.$refs.content.scrollHeight;
      const heightArr = this.list.map(v => v.target().clientHeight);
      const calcuHeightArr = heightArr.map(h => h * innerheight / outerheight);

      this.list.forEach((_, i) => {
        const pre = calcuHeightArr[i - 1];
        const cur = calcuHeightArr[i];
        if (!pre) {
          calcuHeightArr[i] = { top: 0, bottom: cur };
        } else {
          calcuHeightArr[i] = { top: pre.bottom, bottom: pre.bottom + cur };
        }
      });
            
      this.list.forEach((v, i) => {
        this.topMap.set(v, calcuHeightArr[i]);
      });
            
      setTimeout(() => {
        this.$calcu = false;
      }, 2000);
    },
    calcuFocusLine() {
      if (this.$calcuLine) return;
      this.$calcuLine = true;

      setTimeout(() => {
        this.$calcuLine = false;
      }, 2000);
    },
    scrollTo(v) {
      this.calcuItemTop();
      const s = this.topMap.get(v);
      if (s) {
        const { top, bottom } = s;

        const i = this.list.findIndex(m => v == m);

        let stop = 0;
        if (this.list.length === 0) return;
        if (this.list.length > 1) {
          stop = top + (bottom - top) * (i / (this.list.length - 1));
        }

        this.$refs.content.scrollTo({
          top: stop,
          behavior: 'smooth',
        });
        this.focus = s;
      }
    },
    $$update() {
      this.contentOnScroll();
    },

  },
};
</script>


<style scoped lang="scss">
.cntr {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    background: #F8F9FD !important;
    .content {
        height: 100%;
        padding-right: 300px;
        padding-top: 16px;
        padding-left: 32px;
        overflow: auto;
    }
    .sider {
        position: absolute;
        top: 0;
        right: 120px;
        max-height: 100%;
        // width: 0;
        padding-left: 0;

        &::before {
            content: "";
            position: absolute;
            left: 9px;
            top: 86px;
            bottom: 27px;
            border-left: 1px solid rgba(159, 161, 164, 0.5);
        }

        .title {
            margin-top: 27px;
            color: #292a2c;
            font-size: 14px;
            word-break: keep-all;
            line-height: 32px;
            margin-bottom: 12px;
        }
        .list > div {
            color: #5a6072;
            font-size: 14px;
            line-height: 32px;
            word-break: keep-all;
            margin-bottom: 12px;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease-out;
            padding-left: 30px;

            &::before {
                content: "";
                transition: all 0.3s ease-out;
                margin-left: 5px;
                height: 8px;
                left: 0;
                top: 0;
                width: 8px;
                display: block;
                position: absolute;
                margin-top: 12px;
                border: 1px solid rgba(159, 161, 164, 0.5);
                background: #fff;
                border-radius: 50%;
            }

            &.focus {
                &::before {
                    border: 1px solid #487afd;
                    background: #487afd;
                    margin-left: 0;
                    width: 18px;
                    border-radius: 0 4px 4px 0;
                }
                color: #487afd;
            }
        }
    }
}
</style>
