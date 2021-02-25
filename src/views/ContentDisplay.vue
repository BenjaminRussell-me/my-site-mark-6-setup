<template>
  <div id="content">
    <router-link :to="'/Content'">
      <button>back</button>
    </router-link>
    <h1>{{ dataState?.data?.content[contentName]?.data?.title }}</h1>
    <div>
      <p>{{ dataState?.data?.content[contentName]?.data?.about }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { dataStore } from "../store/data"
export default defineComponent({
  name: "ContentDisplay",
  props: {
    contentName: {
      type: String, //comes from vue router
      required: true,
    }
  },
  setup(props) {
    onMounted(() => {dataStore.getData(false,"content_by_id","content", props.contentName)});
    return {dataState: dataStore.getState()};
  }
});
</script>

<style scoped lang="scss">
#content {
  max-width: 1000px;
  justify-self: center;
}
</style>
