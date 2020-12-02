<template>
  <div>
    <h1>HI</h1>
    <h2>HI</h2>
    <h3>HI</h3>
    <h4>HI</h4>
    <h5>HI</h5>
    <p>HI</p>
    <ul>
      <li>HI</li>
    </ul>
    <button>HI</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  props: {
    theme: {
      type: Object
    }
  }
});
</script>
