<template>
  <link-component
    v-for="(item, index) in query.value.data"
    :key="index"
    :path="`/Content/ContDisplay?contentName=${item.data.id}`"
    :title="`${item.data.title} ${item.data.project}`"
  >
  </link-component>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import faunadb from "faunadb";
import linkComponent from "@/components/linkComponent.vue";
interface Content {
  project: string;
  title: string;
}
export default defineComponent({
  name: "ProjectsContent",
  components: {
    linkComponent
  },
  props: {
    projectName: {
      type: String,
      default: "testProject"
    }
  },
  setup(props) {
    const q = faunadb.query;
    const query = reactive({ value: {} });
    function apiCall() {
      const client = new faunadb.Client({
        secret: process.env.VUE_APP_KEY
      });
      const idk = client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("content_by_project"), props.projectName)),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      );
      idk.then(function(response) {
        query.value = response;
        console.log(query.value);
      });
    }
    onMounted(() => apiCall());
    return { query };
  }
});
</script>

<style scoped></style>
