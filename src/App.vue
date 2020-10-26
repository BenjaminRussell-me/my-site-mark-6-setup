<template>
  <div id="mainGrid">
    <div id="navArea">
      <div id="logoHolder">
        <div
          :style="{ background: `hsl(${hsla.h},${hsla.s}%,${hsla.l}%)` }"
          class="logo"
        ></div>
        <p>link to</p>
      </div>
      <div id="navHolder">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <div id="displayArea">
      <router-view :hsla="hsla" />
      <div></div>
      <p v-for="(item, index) in query.value.data" :key="index">
        {{ item.data.title }} {{ item.data.project }}
      </p>
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
      console.log(process.env.VUE_APP_KEY);
      const idk = client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("content_by_project"), "testProject")),
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
