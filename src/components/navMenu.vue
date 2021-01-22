<template>
  <div id="menuHolder">
    <button
      id="navControl"
      :style="{
        background: `linear-gradient( to right, hsl(${theme.hsla.h},${
          theme.hsla.s
        }%,${theme.hsla.l}%), hsl(${theme.hsla.h - 23},${theme.hsla.s}%,${
          theme.hsla.l
        }%))`
      }"
      @click="menu.open = !menu.open"
    >
      x
    </button>
    <div id="menuBox" v-if="menu.open">
      <div>
        <link-component path="/" title="Home"></link-component> |
        <link-component path="/Projects" title="Projects"></link-component> |
        <link-component path="/Content" title="Content"></link-component> |
        <link-component path="/About" title="About"></link-component>
      </div>
      <div>
        dynamic
      </div>
      <div>
        theme controls
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import linkComponent from "@/components/linkComponent.vue";
export default defineComponent({
  name: "navMenu",
  components: { linkComponent },
  props: {
    theme: {
      type: Object
    }
  },
  setup() {
    const menu = reactive({
      open: true
    });
    return { menu };
  }
});
</script>

<style scoped lang="scss">
#menuHolder {
  position: relative;
  z-index: 100;
  display: grid;
  width: 100px;

  height: 49px;
}
#menuBox {
  position: absolute;
  background: hsla(100, 100%, 0%, 0.9);
  width: 400px;
  min-height: 500px;
  margin-right: 2rem;
  margin-top: 2rem;
  grid-area: 1/1/1/1;
  padding: 1rem;
  box-sizing: border-box;
  justify-self: end;
  overflow: hidden;
  @media (max-width: 640px) {
    width: 250px;
  }
}
#navControl {
  position: absolute;
  border-radius: 360px;
  justify-self: end;
  z-index: 200;
  height: 50px;
  width: 50px;
  border: none;
  box-shadow: 0 0 5px 3px black;
  color: white;
  margin: 0;
  cursor: pointer;
  grid-area: 1/1/1/1;
  &:focus {
    outline: none;
  }
}
</style>
