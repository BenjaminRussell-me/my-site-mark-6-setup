<template>
  <div>
    <decorated-link
      v-for="(item, index) in projects.data"
      :key="index"
      :path="`/Projects/Project?projectName=${item.data.id}`"
      :title="item.data.title"
      :theme="theme"
      :id-edit="index"
      :date="item.data.date"
    ></decorated-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import decoratedLink from "@/components/decoratedLink.vue";
export default defineComponent({
  name: "Projects",
  components: { decoratedLink },
  props: {
    projects: {
      type: Object
    },
    theme: {
      type: Object
    }
  },
  setup() {
    const projectData = reactive({
      open: false,
      title: ""
    });
    function openProject(title: string) {
      projectData.title = title;
      projectData.open = true;
    }
    return { projectData, openProject };
  }
});
</script>

<style scoped></style>
