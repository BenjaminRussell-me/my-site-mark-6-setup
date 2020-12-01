<template>
  <div>
    <h1>h1</h1>
    <h2>h2</h2>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    <p>p</p>
    <ul>
      <li>li</li>
    </ul>
    <button>button</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  props: {
    hsla: {
      type: Object
    }
  }
});
</script>
