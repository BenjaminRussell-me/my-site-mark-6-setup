<template>
  <div>
    <router-link
      v-for="(item, index) in projects.data"
      :key="index"
      :to="`/Projects/Project?projectName=${item.data.id}`"
    >
      <div>
        {{ item.data.title }}
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "Projects",
  props: {
    projects: {
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
