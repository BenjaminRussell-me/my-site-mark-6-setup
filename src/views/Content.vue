<template>
  <div>
    <decorated-link
      v-for="(item, index) in query.value.data"
      :key="index"
      :path="`/Content/ContDisplay?contentName=${item.data.id}`"
      :date="item.data.date"
      :title="item.data.title"
      :theme="theme"
    >
    </decorated-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import faunadb from "faunadb";
import decoratedLink from "@/components/decoratedLink.vue";
export default defineComponent({
  name: "Content",
  components: {
    decoratedLink
  },
  props:{
    theme:{
      type: Object
    }
  },
  setup() {
    const q = faunadb.query;
    const query = reactive({ value: {} });
    function apiCall() {
      const client = new faunadb.Client({
        secret: process.env.VUE_APP_KEY
      });
      const idk = client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_content"))),
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
