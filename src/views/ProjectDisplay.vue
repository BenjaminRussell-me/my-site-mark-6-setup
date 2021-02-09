<template>
  <div id="project">
    <router-link :to="'/Projects'">
      <button>back</button>
    </router-link>
    <h1>{{ query.value?.data?.title }}</h1>
    <ProjectsContent :projectName="projectName"></ProjectsContent>
    <div v-html="markdown.text"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import faunadb from "faunadb";
import marked from "marked";
import DOMPurify from "dompurify";
import ProjectsContent from "@/components/projects/ProjectsContent.vue";
export default defineComponent({
  name: "ProjectDisplay",
  props: {
    projectName: {
      type: String //comes from vue router
    }
  },
  components: {
    ProjectsContent
  },
  setup(props) {
    const query = reactive({ value: {} });
    const q = faunadb.query;
    const markdown = reactive({ text: "" });
    function useMarkdown(x: any) {
      const sanitized = DOMPurify.sanitize(x.data.about);
      markdown.text = marked(sanitized);
    }
    function apiCall() {
      const client = new faunadb.Client({
        secret: process.env.VUE_APP_KEY
      });
      const idk = client.query(
        q.Get(q.Match(q.Index("projects_by_id"), props.projectName || ""))
      );
      idk.then(function(response) {
        query.value = response;
        let x: any = {};
        x = response;
        x.data.about;
        useMarkdown(x);
      });
    }

    onMounted(() => apiCall());
    return { query, markdown };
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
