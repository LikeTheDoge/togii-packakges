<template>
  <a-tabs
    :active-key="activePage"
    hide-add
    type="editable-card"
    size="small"
    :tabBarStyle="{ 'margin-top': '5px' }"
    @edit="onEdit"
    @change="changePage"
    @tabClick="tabClick"
  >
    <a-tab-pane
      :id="page.path"
      :key="page.path"
      v-for="page in pageList"
      :closable="page.path !== fixedNav.path"
    >
      <span
        slot="tab"
        :style="page.path !== fixedNav.path ? 'margin-right:20px;' : ''"
        @mousedown="mousedown($event, page)"
        @mouseup="mouseup($event, page)"
      >
        <span
          :pagekey="page.path"
          :class="
            page.path === fixedNav.path
              ? 'tab-title-span tab-header-span'
              : 'tab-title-span'
          "
          :title="(page.query && page.query.name) || page.name"
          :style="{
            height: '30px',
            'line-height': '35px',
          }"
        >{{ (page.query && page.query.name) || page.name }}</span>
        <!-- <eco-icon
          v-if="page.path === $route.path"
          name="refresh"
          class="tab-reload"
          style="color: rgba(0, 0, 0, 0.45); font-size: 12px"
          @click="onReload"
        ></eco-icon> -->
        <a-icon
          type="sync"
          v-if="page.path === $route.path"
          class="tab-reload"
          style="color: rgba(0, 0, 0, 0.45); font-size: 12px"
          @click="onReload"
           />
      </span>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
const HOME = '/';
const BLANK = '/';
export default {
  props: {
    fixedNav: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      pageList: [],
      linkList: [],
      activePage: '',
      actPage: {},
    };
  },
  created() {
    if (this.$route.path !== this.fixedNav.path) {
      this.addIndexToFirst();
    }
    const currentRoute = Object.assign({}, this.$route);
    currentRoute.meta = Object.assign({}, currentRoute.meta);
    if (currentRoute.path === HOME || currentRoute.path === BLANK) {
      return;
    }
    this.pageList.push(currentRoute);
    this.linkList.push(currentRoute.path);
    this.activePage = currentRoute.path;
  },
  mounted() {
    // this.$eco.msgEvent.on('handleClose', this.onEdit);
  },
  computed: {},
  watch: {
    $route(newRoute) {
      this.activePage = newRoute.path;
      if (this.activePage === HOME || this.activePage === BLANK) {
        return;
      }
      if (this.linkList.indexOf(newRoute.path) < 0) {
        this.linkList.push(newRoute.path);
        this.pageList.push(Object.assign({}, newRoute));
      } else if (this.linkList.indexOf(newRoute.path) >= 0) {
        const oldIndex = this.linkList.indexOf(newRoute.path);
        const oldPositionRoute = this.pageList[oldIndex];
        this.pageList.splice(oldIndex, 1, Object.assign({}, newRoute, { meta: oldPositionRoute.meta }));
      }
    },
    activePage(key) {
      if (key === BLANK) {
        return;
      }
      const index = this.linkList.lastIndexOf(key);
      const waitRouter = this.pageList[index];
      if (waitRouter && waitRouter.path !== this.$route.path) {
        this.$router.push(Object.assign({}, waitRouter));
      }
    },
  },
  methods: {
    mouseup(e, page) {
      if (e.button === 1 && page.fullPath === this.actPage.fullPath) {
        this.onEdit(page.path);
      }
    },
    mousedown(e, page) {
      if (e.button === 1) {
        this.actPage = page;
      }
    },
    addIndexToFirst() {
      this.pageList.splice(0, 0, this.fixedNav);
      this.linkList.splice(0, 0, this.fixedNav.path);
    },
    onReload() {
      this.$emit('onReload');
      // this.$router.replace(this.activePage);
    },
    onEdit(key) {
      if (key === this.fixedNav.path) {
        this.$message.warning('首页不能关闭!');
        return;
      }
      if (this.pageList.length === 1) {
        this.$message.warning('这是最后一页，不能再关闭了啦');
        return;
      }
      this.pageList = this.pageList.filter(item => item.path !== key);
      let index = this.linkList.indexOf(key);
      this.linkList = this.linkList.filter(item => item !== key);
      if (this.linkList.find(item => item === this.activePage)) {
        return;
      }
      index = index >= this.linkList.length ? this.linkList.length - 1 : index;
      this.activePage = this.linkList[index];
    },
    changePage(key) {
      this.activePage = key;
    },
    tabClick() {},
    backAndCloseCurrentPage(path) {
      const { activePage } = this;
      this.$router.push(path).then(() => {
        this.pageList = this.pageList.filter(item => item.path !== activePage);
        this.linkList = this.linkList.filter(item => item !== activePage);
      });
    },
  },
  destroyed() {
    // this.$eco.msgEvent.off('handleClose', this.onEdit);
  },
};
</script>

<style lang="scss" scoped>
$color-primary:#3d6ade;
.ant-tabs {
  background: #fff;
}

::v-deep .ant-tabs-bar {
  margin: 5px 0 0 0 !important;
  // position: relative;
  border: none;
  .ant-tabs-nav {
    width: 100%;
    // margin-left: 30px;
    // height: 32px !important;
  }
  .ant-tabs-nav-container {
    margin-left: 30px;
  }
  .ant-tabs-tab {
    // font-weight: initial !important;
    // border-radius: 2px 2px 0 0 !important;
    border: none !important;
    // margin-top: 3px !important;
    background: #f5f6f7 !important;
    padding: 0 4px 0 20px !important;
    .ant-tabs-close-x {
      // margin-top: 1px !important;
      margin-right: 2px !important;
    }
  }
  .ant-tabs-tab-active {
    background: #e1eeff !important;
    color: $color-primary !important;
    height: 40px !important;
    font-weight: 400 !important;
  }
  .tab-title-span {
    margin-right: 16px;
    margin-top: 1px;
    max-width: 137px;
    display: inline-block;
    @include single-line-ellipsis;
  }
  i.anticon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    &:hover {
      color: #f00 !important;
    }
  }
}
::v-deep .ant-tabs-tab-prev-icon,
::v-deep .ant-tabs-tab-next-icon {
  position: unset;
}

.tab-reload {
  position: relative!important;
  display: inline-block;
  margin-right: 12px !important;
  // width: 14px;
  line-height: 22px;
  // height: 24px;
  overflow: hidden;
  vertical-align: 0;
  color: rgba(0, 0, 0, 0.45);
  margin-right: 0!important;
  transform: translateY(0%)!important;
}
.ant-tabs-bar .tab-reload:hover {
  color: #1890ff !important;
}
</style>
