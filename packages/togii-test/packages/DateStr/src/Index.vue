<template>
  <span>{{ str }}</span>
</template>
<script>
import moment from 'moment';

moment.locale('zh-cn');

export default {
  name: 'DateStr',
  props: {
    date: {
      type: Object,
      default: () => moment(),
    },
  },
  computed: {
    str() {
      debugger
      const t = moment().valueOf() - this.date.valueOf();
      if (t < 1000 * 60) {
        return '刚刚';
      } if (t < 1000 * 60 * 60) {
        return this.date.startOf('minute').fromNow()
          .replace(' ', '');
      } if (t < 1000 * 60 * 60 * 24) {
        const h = Math.floor(t / (1000 * 60 * 60));
        return `${h}小时前`;
      } if (t < 1000 * 60 * 60 * 24 * 7) {
        const date = moment(this.date.format('YYYY-MM-DD'));
        const current = moment(moment().format('YYYY-MM-DD'));
        return date.startOf('day').from(current)
          .replace(' ', '');
      }
      return this.date.format('YYYY/MM/DD HH:mm');
    },
  },
};
</script>

<style scoped></style>
