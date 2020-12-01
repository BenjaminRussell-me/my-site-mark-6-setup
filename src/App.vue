<template>
  <div id="mainGrid">
    <div id="backgroundHolder">
      <background></background>
    </div>
    <div id="navPlaceholder">
      <div id="navArea">
        <div id="logoHolder">
          <div
            :style="{
              background: `hsl(${themes.dark.hsla.h},${themes.dark.hsla.s}%,${themes.dark.hsla.l}%)`
            }"
            class="logo"
          ></div>
          <router-link to="/"><p>link to</p></router-link>
        </div>
        <div id="navHolder">
          <router-link to="/Content">Content</router-link>
          <router-link to="/Projects">Projects</router-link>
          <router-link to="/About">About</router-link>
        </div>
      </div>
    </div>
    <div id="displayArea">
      <router-view :projects="query.value" :hsla="themes.dark.hsla" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import faunadb from "faunadb";
import Background from "@/components/background.vue";

interface Hsla {
  h: number;
  s: number;
  l: number;
  a: number;
}
interface Theme {
  hsla: object;
  accent: object;
  textColor: object;
  isDark: boolean;
}
interface Content {
  project: string;
  title: string;
}
export default defineComponent({
  components: { Background },
  setup() {
    const q = faunadb.query;
    const themes = reactive({
      light: {
        hsla: { h: 185, s: 100, l: 45, a: 1 },
        accent: { h: 185, s: 100, l: 45, a: 1 },
        textColor: { h: 185, s: 100, l: 45, a: 1 },
        isDark: false
      },
      dark: {
        hsla: { h: 185, s: 100, l: 45, a: 1 },
        accent: { h: 185, s: 100, l: 45, a: 1 },
        textColor: { h: 185, s: 100, l: 45, a: 1 },
        isDark: true
      }
    });
    const query = reactive({ value: {} });
    function apiCall() {
      const client = new faunadb.Client({
        secret: process.env.VUE_APP_KEY
      });
      const idk = client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_projects"))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      );
      idk.then(function(response) {
        query.value = response;
        console.log(query.value);
      });
    }
    onMounted(() => apiCall());
    return { themes, query };
  }
});
</script>

<style lang="scss">
@font-face {
  font-family: "IBM Plex Sans";
  src: url("assets/fonts/IBMPlexSansVar-Roman.ttf");
  font-weight: 100 1000;
  font-stretch: 25% 151%;
}
html {
  body {
    margin: 0;
  }
}
#backgroundHolder {
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
#mainGrid {
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  grid-gap: 1rem;
  overflow-y: scroll;
  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
  #navPlaceholder {
    width: 25vw;
    height: 95vh;
  }
  #navArea {
    display: grid;
    grid-template-rows: auto 1fr;
    width: 25vw;
    border-right: 1px solid black;
    height: 95vh;
    position: fixed;
    #logoHolder {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      .logo {
        height: 30px;
        width: 30px;
        background-color: blue;
      }
    }
    #navHolder {
      align-self: end;
    }
  }
  #displayArea {
    justify-self: center;
    width: 85%;
    background: hsla(100, 100%, 100%, 0.5);
    padding: 1rem 1rem 4rem 1rem;
  }
}
$textMargin: clamp(0.5rem, 1vw / 2.7, 1rem);

h1,
h2,
h3,
h4,
h5,
p,
li,
button,
label,
textarea,
a,
input {
  font-family: IBM Plex Sans, sans-serif;
}

h1 {
  font-size: clamp(2rem, 10 * 1vw / 2, 6rem);
  font-weight: clamp(100, 10 * 1vw / 2, 200);
  margin: $textMargin 0 $textMargin 0;
}
h2 {
  font-size: clamp(1.7rem, 10 * 1vw / 2, 4.5rem);
  margin: $textMargin 0 $textMargin 0;
}
h3 {
  font-size: clamp(1.5rem, 10 * 1vw / 2, 3rem);
  margin: $textMargin 0 $textMargin 0;
}
h4 {
  font-size: clamp(1.3rem, 10 * 1vw / 2, 2.5rem);
  margin: $textMargin 0 $textMargin 0;
}
h5 {
  font-size: clamp(0.8rem, 10 * 1vw / 2, 1.5rem);
  margin: $textMargin 0 $textMargin 0;
}
p,
li,
button,
label,
textarea,
a,
input {
  margin: $textMargin 0 $textMargin 0;
  font-size: clamp(0.8rem, 10 * 1vw / 2, 1.5rem);
}
</style>
