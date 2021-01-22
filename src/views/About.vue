<template>
  <div id="about">
    <div>
      <h2>Hello! My Name Is Benjamin Russell.</h2>
      <p>As I'm sure you have gathered by now.</p>
      <p>
        I am a web developer / designer and have been working as such for
        {{ new Date().getFullYear() - 2018 }} years. I love to combine my skills
        and interests in Javascript, Css, design, SVG, layout, WebAssembly,
        animation UI and more. To create functionally beautiful products.
      </p>
      <p>
        Wanna work on something together? Let me know! I'm always down for a new
        interesting challenge.
      </p>
    </div>
    <link-component path="/Resume">Resume</link-component>
  </div>
</template>

<script lang="ts">
import linkComponent from "@/components/linkComponent.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { linkComponent }
});
</script>

<style scoped lang="scss">
#about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3rem;
}
</style>
