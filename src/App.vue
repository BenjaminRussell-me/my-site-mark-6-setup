<template>
  <div
    id="mainGrid"
    :style="{
      color: `hsl(${themes.dynamicTheme.textColor.h},${themes.dynamicTheme.textColor.s}%,${themes.dynamicTheme.textColor.l}%)`
    }"
  >
    <div id="backgroundHolder">
      <background :theme="themes.dynamicTheme"></background>
      <div id="backgroundMuter"></div>
    </div>
    <div id="contentHolder">
      <div id="topGrid">
        <div>
          <h4>logo area</h4>
        </div>
        <nav-menu :theme="themes.dynamicTheme"></nav-menu>
      </div>
      <div id="displayArea">
        <div
          id="displayLine"
          :style="{
            background: `linear-gradient( to right, hsl(${
              themes.dynamicTheme.hsla.h
            },${themes.dynamicTheme.hsla.s}%,${
              themes.dynamicTheme.hsla.l
            }%), hsl(${themes.dynamicTheme.hsla.h - 23},${
              themes.dynamicTheme.hsla.s
            }%,${themes.dynamicTheme.hsla.l}%))`
          }"
        ></div>
        <div id="displayContent">
          <router-view
            :theme="themes.dynamicTheme"
            :projects="query.value"
            :hsla="themes.dark.hsla"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed } from "vue";
import faunadb from "faunadb";
import Background from "@/components/background.vue";
import navMenu from "@/components/navMenu.vue";
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
interface Themes {
  themeControl: boolean;
  dynamicTheme: object;
  light: object;
  dark: object;
}
interface Content {
  project: string;
  title: string;
}
export default defineComponent({
  components: { Background, navMenu },
  setup() {
    const q = faunadb.query;
    const themes: Themes = reactive({
      themeControl: false,
      dynamicTheme: computed(() => {
        if (!themes.themeControl) {
          return themes.light;
        } else {
          return themes.dark;
        }
      }),
      light: {
        hsla: { h: 208, s: 70, l: 40, a: 1 },
        accent: { h: 166, s: 70, l: 40, a: 1 },
        textColor: { h: 185, s: 100, l: 10, a: 1 },
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
  src: url("../node_modules/@ibm/plex/IBM-Plex-Sans-Variable/fonts/complete/ttf/IBMPlexSansVar-Roman.ttf");
  font-weight: 100 1000;
  font-stretch: 25% 151%;
}
@font-face {
  font-family: "IBM Plex Sans Italic";
  src: url("../node_modules/@ibm/plex/IBM-Plex-Sans-Variable/fonts/complete/ttf/IBMPlexSansVar-Italic.ttf");
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
  display: grid;
  #backgroundMuter {
    height: 100%;
    width: 100%;
    grid-area: 1/1/1/1;
    background: hsla(100, 0%, 100%, 0.6);
    backdrop-filter: brightness(100%);
  }
}
#mainGrid {
  display: grid;
  grid-template-columns: 1fr;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  grid-gap: 1rem;
  overflow-x: hidden;
  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
  #topGrid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }
  #contentHolder {
    justify-self: center;
    width: 90%;
  }
  #displayArea {
    justify-self: center;
    backdrop-filter: blur(5px);
    box-sizing: border-box;
    background: hsla(100, 100%, 100%, 0.5);
    box-shadow: 0 0 5px 3px;

    margin: 1rem 0 1rem 0;
    height: 85vh;
    overflow-y: auto;
    display: grid;
    grid-template-rows: auto 1fr;
    @media screen and (max-width: 1080px) {
      width: 100%;
      height: 80vh;
    }
    #displayLine {
      height: 5px;
      background: linear-gradient(to right, red, blue);
    }
    #displayContent {
      padding: 1rem 1rem 4rem 1rem;
      display: grid;
    }
  }
}
$textMargin: clamp(0.1em, 1vw / 2.7, 0.5em);

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
  font-family: IBM Plex Sans, serif;
}

h1 {
  font-size: clamp(2rem, 10 * 1vw / 2, 6rem);
  font-weight: 1000;
  margin: $textMargin 0 $textMargin 0;
}
h2 {
  font-size: clamp(1.7rem, 10 * 1vw / 2.2, 4rem);
  font-weight: 900;
  margin: $textMargin 0 $textMargin 0;
}
h3 {
  font-size: clamp(1.3rem, 10 * 1vw / 2.4, 3rem);
  margin: $textMargin 0 $textMargin 0;
  font-weight: 800;
}
h4 {
  font-size: clamp(1.1rem, 10 * 1vw / 2.6, 2.3rem);
  margin: $textMargin 0 $textMargin 0;
  font-weight: 700;
}
h5 {
  font-size: clamp(0.8rem, 10 * 1vw / 2.8, 1.5rem);
  margin: $textMargin 0 $textMargin 0;
  font-weight: 600;
}
p,
li,
button,
label,
textarea,
a,
input {
  margin: $textMargin 0 $textMargin 0;
  font-size: clamp(0.8rem, 10 * 1vw / 2.8, 1.5rem);
  font-weight: 500;
}
em {
  font-family: IBM Plex Sans Italic, sans-serif;
  font-style: italic;
}
</style>
