<template>
  <div>
    <div class="hexGrid">
      <div
        class="hexItem"
        v-for="(item, index) in dataState.data.data"
        :key="index"
        :path="`/Projects/Project?projectName=${item.data.id}`"
      >
        <router-link
          :to="`/Projects/Project?projectName=${item.data.id}`"
          class="hexContent"
        >
          <h5>{{ item.data.title }}</h5>
          <p>{{ item.data.date }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import {dataStore} from '../store/data'
export default defineComponent({
  name: "Projects",
  components: {},
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

    onMounted(() => dataStore.getData(true,'all_projects', null));
    return { projectData, openProject, dataState: dataStore.getState()};
  }
});
</script>

<style scoped lang="scss">
$amount: 4;
.hexGrid {
  --counter: 1;
  display: grid;
  grid-template-columns: repeat($amount, 1fr, 2fr) 1fr;
  margin: 0;
  padding: 0;
  grid-gap: 2.5rem 5rem;
}
.hexItem {
  position: relative;
  grid-column: 1 / span 3;
  grid-row: calc(var(--counter) + var(--counter)) / span 2;
  filter: drop-shadow(0 0 10px rgba(#444, 0.08));
  height: 0;
  padding-bottom: 90%;
  @for $i from 1 through $amount {
    &:nth-of-type(#{$amount}n + #{$i}) {
      grid-column: #{$i + $i - 1} / span 3;
      @if $i % 2 == 0 {
        grid-row: calc(var(--counter) + var(--counter) - 1) / span 2;
      }
    }
  }

  @for $i from 1 through 20 {
    &:nth-of-type(n + #{$i * $amount + 1}) {
      --counter: #{$i + 1};
    }
  }
}

.hexContent {
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 1.125rem;
  color: #111111;
  background: linear-gradient(to right, hsl(208, 70%, 40%), hsl(166, 70%, 40%))
    fixed;
  clip-path: polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 25%;
  text-decoration: none;
  text-align: center;
  transition: transform 0.24s ease-out;
  box-sizing: border-box;
}
</style>
