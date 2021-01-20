<template>
  <div>
    <div class="holder">
      <hexagon :theme="theme"></hexagon>
    </div>
    <welcome></welcome>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hexagon from "@/components/hexagon.vue";
import welcome from "@/components/welcome.vue"
export default defineComponent({
  name: "Home",
  components: {Hexagon, welcome},
  props: {
    theme: {
      type: Object
    }
  }
});
</script>

<style scoped lang="scss">
.holder{
  width: 60px;
  height: 60px;
}
</style>
