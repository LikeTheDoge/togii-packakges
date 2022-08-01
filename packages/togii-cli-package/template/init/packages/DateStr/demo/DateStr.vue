<template>
  <div>
    <flex-row>
      <flex-fill>
        <date-str />
      </flex-fill>
      <flex-fill>
        <date-str :date="moment().subtract(20, 'minutes')" />
      </flex-fill>
      <flex-fill>
        <date-str :date="moment().subtract(1, 'days')" />
      </flex-fill>
      <flex-fill>
        <date-str :date="moment().subtract(1, 'years')" />
      </flex-fill>
    </flex-row>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      moment,
    };
  },
};
</script>
