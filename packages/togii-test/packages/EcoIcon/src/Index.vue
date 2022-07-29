<template>
  <svg
  class="eco-icon"
  :style="{fontSize:`${typeof size === 'number'?size+'px':size }`,color:color}"
  aria-hidden="true">
      <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
import * as icon from './icon';

console.log(icon);

export default {
  name: 'EcoIcon',
  props: {
    size: {
      default: 'inherit',
    },
    name: {
      default: 'search',
    },
    color: {
      default: 'inherit',
    },
  },
};
</script>

<style>
    .eco-icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
