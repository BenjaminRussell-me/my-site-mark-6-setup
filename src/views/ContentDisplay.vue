<template>
  <div>
    <h1>{{ query.value?.data?.title }}</h1>
    <div>
      <p>{{ query.value?.data?.about }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import faunadb from "faunadb";
export default defineComponent({
  name: "ContentDisplay",
  props: {
    contentName: {
      type: String, //comes from vue router
      require
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
        q.Get(q.Match(q.Index("content_by_id"), props.contentName || ""))
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
