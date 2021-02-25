<template>
  <div>
    <decorated-link
      v-for="(item, index) in dataState?.data?.content?.data"
      :key="index"
      :path="`/Content/ContDisplay?contentName=${item?.data?.id}`"
      :date="item?.data?.date"
      :title="item?.data?.title"
      :theme="theme"
    >
    </decorated-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted} from "vue";
import { dataStore } from "../store/data"
import decoratedLink from "@/components/decoratedLink.vue";
export default defineComponent({
  name: "Content",
  components: {
    decoratedLink
  },
  props: {
    theme: {
      type: Object
    }
  },
  setup() {
    onMounted(() => {dataStore.getData(true,"all_content",'content',null)})
    return { dataState: dataStore.getState() };
  }
});
</script>

<style scoped></style>
