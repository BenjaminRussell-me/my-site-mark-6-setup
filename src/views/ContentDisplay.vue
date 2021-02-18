<template>
  <div id="content">
    <router-link :to="'/Content'">
      <button>back</button>
    </router-link>
    <h1>{{ dataState?.data?.data?.title }}</h1>
    <div>
      <p>{{ dataState?.data?.data?.about }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { dataStore } from "../store/data"
import faunadb from "faunadb";
export default defineComponent({
  name: "ContentDisplay",
  props: {
    contentName: {
      type: String, //comes from vue router
      required: true,
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
    onMounted(() => {dataStore.getData(false,"content_by_id", props.contentName)});
    return { query, dataState: dataStore.getState()};
  }
});
</script>

<style scoped lang="scss">
#content {
  max-width: 1000px;
  justify-self: center;
}
</style>
