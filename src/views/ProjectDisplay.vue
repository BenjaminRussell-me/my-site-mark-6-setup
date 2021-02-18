<template>
  <div id="project">
    <router-link :to="'/Projects'">
      <button>To Projects</button>
    </router-link>
    <h1>{{ dataState?.data?.data?.title }}</h1>
    <ProjectsContent :projectName="projectName"></ProjectsContent>
    <div v-html="useMarkdown(dataState?.data?.data?.about)"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import {dataStore} from '../store/data'
import marked from "marked";
import DOMPurify from "dompurify";
import ProjectsContent from "@/components/projects/ProjectsContent.vue";
export default defineComponent({
  name: "ProjectDisplay",
  props: {
    projectName: {
      type: String, //comes from vue router
      required: true
    }
  },
  components: {
    ProjectsContent
  },
  setup(props) {
    function useMarkdown (text: string) {
     return marked(DOMPurify.sanitize(text));
    }
    onMounted(() => {dataStore.getData(false, 'projects_by_id', props.projectName)});
    return {useMarkdown, dataState: dataStore.getState() };
  }
});
</script>

<style lang="scss">
#project {
  max-width: 1000px;
  justify-self: center;
}
p {
  img {
    width: 100%;
  }
}
</style>
