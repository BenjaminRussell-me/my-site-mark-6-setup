<template>
  <div>
    <link-component
      v-for="(item, index) in projects.data"
      :key="index"
      :path="`/Projects/Project?projectName=${item.data.id}`"
      :title="item.data.title"
    ></link-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import linkComponent from "@/components/linkComponent.vue";
export default defineComponent({
  name: "Projects",
  components: { linkComponent },
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
