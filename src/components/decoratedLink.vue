<template>
  <div class="decLink">
    <div class="hexHolder">
      <hexagon :id-edit="idEdit" :theme="theme"></hexagon>
    </div>
    <div>
      <link-component
        :theme="theme"
        :title="title"
        :path="path"
      ></link-component>
      <div
        class="line"
        :style="{
          background: `hsl(${theme.textColor.h},${theme.textColor.s}%,${theme.textColor.l}%)`
        }"
      ></div>
      <p>{{ date }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import hexagon from "./hexagon.vue";
import linkComponent from "./linkComponent.vue";
export default defineComponent({
  name: "decoratedLink",
  components: {
    hexagon,
    linkComponent
  },
  props: {
    title: {
      type: String
    },
    path: {
      type: String
    },
    date: {
      type: String
    },
    img: {
      type: String
    },
    theme: {
      type: Object
    },
    idEdit: {
      type: Number
    }
  }
});
</script>

<style scoped lang="scss">
.decLink {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: 1rem;
}
.hexHolder {
  height: 50px;
  width: 50px;
}
.line {
  height: 2px;
}
</style>
