<template>
  <div id="mainGrid">
    <div id="navArea">
      <div id="logoHolder">
        <div
          :style="{ background: `hsl(${hsla.h},${hsla.s}%,${hsla.l}%)` }"
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
    <div id="displayArea">
      <router-view :projects="query.value" :hsla="hsla" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import faunadb from "faunadb";

interface Hsla {
  h: number;
  s: number;
  l: number;
  a: number;
}
interface Content {
  project: string;
  title: string;
}
export default defineComponent({
  setup() {
    const q = faunadb.query;
    const hsla = reactive({ h: 185, s: 100, l: 45, a: 1 }) as Hsla;
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
    return { hsla, query };
  }
});
</script>

<style lang="scss">
html {
  body {
    margin: 0;
  }
}
#mainGrid {
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  #navArea {
    display: grid;
    grid-template-rows: auto 1fr;
    width: 25vw;
    background: grey;
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
  }
}
</style>
