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
      <span
        class="menuLine"
        :class="{ topLineClosed: !menu.open, topLineOpen: menu.open }"
      ></span>
      <span
        class="menuLine"
        :class="{ midLineClosed: !menu.open, midLineOpen: menu.open }"
      ></span>
      <span
        class="menuLine"
        :class="{ botLineClosed: !menu.open, botLineOpen: menu.open }"
      ></span>
    </button>
    <transition name="menu">
      <div id="menuBox" v-if="menu.open">
        <div>
          <link-component
            @clicked="menu.open = false"
            path="/"
            title="Home"
          ></link-component>
          |
          <link-component
            @clicked="menu.open = false"
            path="/Projects"
            title="Projects"
          ></link-component>
          |
          <link-component
            @clicked="menu.open = false"
            path="/Content"
            title="Content"
          ></link-component>
          |
          <link-component
            @clicked="menu.open = false"
            path="/About"
            title="About"
          ></link-component>
        </div>
        <div>
          <h2>dynamic</h2>
        </div>
        <ThemeController></ThemeController>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import linkComponent from "@/components/linkComponent.vue";
import ThemeController from "@/components/themeController.vue";
export default defineComponent({
  name: "navMenu",
  components: { ThemeController, linkComponent },
  props: {
    theme: {
      type: Object
    }
  },
  setup() {
    const menu = reactive({
      open: false
    });
    return { menu };
  }
});
</script>

<style scoped lang="scss">
.menuLine {
  height: 3px;
  width: 80%;
  background: #333b42;
  display: block;
  grid-area: 1/1/1/1;
  place-self: center;
  transition: 0.3s;
  user-focus: none;
  pointer-events: none;
}
.topLineClosed {
  margin-bottom: 20px;
}
.midLineClosed {
  opacity: 1;
}
.botLineClosed {
  margin-top: 20px;
}

.topLineOpen {
  transform: rotate(400deg);
}
.midLineOpen {
  transform: rotate(360deg);
  opacity: 0;
}
.botLineOpen {
  transform: rotate(500deg);
}

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
  backdrop-filter: blur(5px);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
  @media (max-width: 640px) {
    width: 250px;
  }
}
#navControl {
  display: grid;
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
  transition: 0.3s;
  &:focus {
    outline: none;
  }
  &:active {
    transition: 0.01s !important;
    transform: scale(0.9) !important;
  }
  &:hover {
    transform: scale(1.1);
  }
}
@keyframes slide {
  from {
    opacity: 0;
    transform: translateX(30px) translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0px) translateY(0px);
  }
}
.menu-enter-active {
  animation: slide 0.5s forwards;
}
.menu-enter,
.menu-leave-to {
  transition: 0.5s;
  opacity: 0;
  transform: translateX(30px) translateY(-30px);
}
</style>
