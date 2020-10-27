<template>
  <router-link
    v-for="(item, index) in query.value.data"
    :key="index"
    :to="`/Content/ContDisplay?contentName=${item.data.id}`"
  >
    <p>{{ item.data.title }} {{ item.data.project }}</p>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import faunadb from "faunadb";
interface Content {
  project: string;
  title: string;
}
export default defineComponent({
  name: "ProjectsContent",
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
