<template>
  <div id="about">
    <div>
      <h2>Hello! My Name Is Benjamin Russell.</h2>
      <em>As I'm sure you have gathered by now.</em>
      <p>
        I have been working as a developer / designer for the last
        {{ new Date().getFullYear() - 2018 }} years. I strive to combine my skills
        and interests in Javascript, Css, design, SVG, layout, WebAssembly,
        animation UI and more. To create functional and visually interesting products.
      </p>
      <p>
        Wanna work on something together? Let me know! I'm always down for a new
        interesting challenge.
      </p>
    </div>
    <div id="socialMedia">
      <router-link :to="'/Resume'">
        <button class="contactButton" :style="gradient">
          Resume
        </button>
      </router-link>
      <div id="socialButtonGrid">
        <social-button 
         :icon="0"
         link="https://www.instagram.com/benjaminrussell.me/"
        >
        </social-button>
        <social-button
          :color="{ h: 194, s: 82, l: 30 }"
          :icon="1"

          link="https://www.youtube.com/channel/UCulLR-tPpj_sx8gtEIEU4Og"
        ></social-button>
        <social-button
          :color="{ h: 180, s: 82, l: 30 }"
          :icon="2"
          link="https://twitter.com/BenR_me"
        ></social-button>
        <social-button
          :color="{ h: 165, s: 82, l: 30 }"
          :icon="3"
          link="https://codepen.io/benjamin-me/pens/public"
        ></social-button>
      </div>
      <button class="contactButton" :style="gradient">
        Contact
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import socialButton from "@/components/socialButton.vue";
export default defineComponent({
  components: { socialButton },
  props: {
    theme: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const gradient = {
      theme: props.theme,
      background: `linear-gradient( to right, hsl(${props.theme.hsla.h},${
        props.theme.hsla.s
      }%,${props.theme.hsla.l}%), hsl(${props.theme.hsla.h - 23},${
        props.theme.hsla.s
      }%,${props.theme.hsla.l}%))`
    };
    return { gradient };
  }
});
</script>

<style scoped lang="scss">
#about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3rem;
  align-self: center;
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
}
#socialButtonGrid {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  grid-gap: 1rem;
  height: 300px;
}
.contactButton {
  width: 100%;
  padding: 1rem 0 1rem 0;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 3px 1px black;
  &:focus {
    outline: none;
  }
  &:active {
    transition: 0.01s !important;
    transform: scale(0.99) !important;
    box-shadow: 0 0 1px 1px black !important;
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 6px 3px black;
  }
}
</style>
