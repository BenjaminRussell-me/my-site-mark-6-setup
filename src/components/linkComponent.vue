<template>
  <router-link :to="path" @click="$emit('clicked')"
    ><span
      :style="{
        background: `linear-gradient( to right, hsl(${theme.hsla.h},${
          theme.hsla.s
        }%,${theme.hsla.l}%), hsl(${theme.hsla.h - 20},${theme.hsla.s}%,${
          theme.hsla.l
        }%))`,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent'
      }"
      >{{ title }}<slot></slot></span
  ></router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "linkComponent",
  props: {
    path: {
      type: String
    },
    title: {
      type: String
    },
    theme: {
      type: Object,
      default() {
        return {
          hsla: { h: 185, s: 100, l: 45, a: 1 },
          accent: { h: 185, s: 100, l: 45, a: 1 },
          textColor: { h: 185, s: 100, l: 10, a: 1 },
          isDark: false
        };
      }
    }
  }
});
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
