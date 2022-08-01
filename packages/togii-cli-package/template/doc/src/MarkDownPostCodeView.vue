<template>
    <div>
      <div class="code-box-actions">
        <a-tooltip>
          <template slot="title">
            {{ copied?'复制成功':'复制' }}
          </template>
          <a-icon
            type="copy"
            class="code-copy"
            style="cursor:pointer;margin-right:16px"
            @click="copy($event)"
          />
        </a-tooltip>
        <a-icon
        type="code"
        style="cursor:pointer"
        @click="expand=!expand"
        />
      </div>
      <section :class="[{'highlight-wrapper-expand':expand},'highlight-wrapper']">
          <div v-html="sourceCode">
          </div>
      </section>
    </div>

</template>

<script>
// import mavonEditor from 'mavon-editor';
import hljs from 'highlight.js'; // 导入代码高亮文件
// 代码块复制
import ClipboardJS from 'clipboard/dist/clipboard';
export default {
  props: ['code'],
  data() {
    return {
      expand: false,
      sourceCode: '',
      copied: false,
    };
  },
  mounted() {
    this.sourceCode = this.code
    this.$nextTick().then(() => {
      this.highlighthandle(document.querySelector('body'));
    });
  },
  methods: {
    async highlighthandle(dom) {
      await hljs;
      const highlight = dom.querySelectorAll('pre code');
      console.log('highlight___', highlight);
      highlight.forEach(block => {
        if (!block.classList.contains('hljs')) {
          // if (
          //   block.className === "lang-language" ||
          //   block.classList.length === 1
          // ) {
          //   block.className = "lang-";
          // }
          hljs.highlightElement(block);
        }
      });
      // addCopyBtn(this, document.querySelector(".question-detail-container"));
    },
    copy(e) {
      const { innerText } = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.highlight-wrapper');
      console.log('innerText___', innerText);
      this.copyCode('code-copy', innerText, this.showTip);
    },
    showTip() {
      this.copied = true;
    },
    copyCode(className, text, callback) {
      const clipboard = new ClipboardJS(`.${className}`, {
        text() {
          return text;
        },
      });
      clipboard.on('success', e => {
        callback();
        clipboard.destroy();
      });
      clipboard.on('error', e => {
        // $vm.$message.success('复制失败,需手动复制链接！')
        clipboard.destroy();
      });
      // 其他处理的代码不能写在外面，会导致复制失败
    },
  },
};
</script>

<style lang="scss" scope>
.code-box-actions {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  border-top: 1px dashed #f0f0f0;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.highlight-wrapper {
  display: none;
  overflow: auto;
  border-radius: 0 0 2px 2px;
}
.highlight-wrapper-expand {
  display: block;
}
</style>
