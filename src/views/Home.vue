<template>
  <div id="home">
    <div id="blocksHolder">
      <div
        class="block"
        v-for="color in blocks.colors"
        :key="color.h"
        :style="{ background: `hsl(${color.h},${color.s}%,${color.l}%)` }"
      ></div>
    </div>
    <welcome :theme="theme"></welcome>
    <div class="textGrid">
      <div class="textHolder">
        <h5>
          This is my <em>Benjamin Russell's</em> website. I am a passionate
          developer / designer
        </h5>
        <h5>
          Want to know more? Come learn more
          <link-component path="/About">About Me</link-component>
        </h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import welcome from "@/components/welcome.vue";
import linkComponent from "@/components/linkComponent.vue";
export default defineComponent({
  name: "Home",
  components: { welcome, linkComponent },
  props: {
    theme: {
      type: Object
    }
  },
  setup() {
    const blocks = {
      colors: [
        { h: 208, s: 70, l: 40 },
        { h: 196, s: 70, l: 40 },
        { h: 181, s: 70, l: 40 },
        { h: 166, s: 70, l: 40 }
      ]
    };
    return { blocks };
  }
});
</script>

<style scoped lang="scss">
#blocksHolder{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.5vw;
  width: 31.7vw;
  height: 7.5vw;
  margin-left: 1.7vw;
  margin-bottom: 1vw;
}
.textGrid {
  display: grid;
  margin-left: 1.7vw;
  .textHolder {
  }
}
.block {
  height: 100%;
  width: 100%;
}
.holder {
  width: 60px;
  height: 60px;
}
</style>
