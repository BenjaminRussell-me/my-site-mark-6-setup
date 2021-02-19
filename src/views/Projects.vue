<template>
  <div id="projectsWrapper">
    <div class="hexGrid">
      <div
        class="hexItem"
        v-for="(item, index) in dataState.data.data"
        :key="index"
        :path="`/Projects/Project?projectName=${item?.data?.id}`"
      >
        <router-link
          :to="`/Projects/Project?projectName=${item?.data?.id}`"
          class="hexContent"
        >
          <h5>{{ item?.data?.title }}</h5>
          <p>{{ item?.data?.date }}</p>
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
#projectsWrapper{
display: grid;
}
.hexGrid {
  --counter: 1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: -10vh 0 0 0;
  padding: 0;
  grid-gap: 2.5vw 5vw;
  align-self: center;
  @media screen and (max-width: 1080px){
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1.5vw 2vw;
  }
}
.hexItem {
  position: relative;
  grid-column:span 3;
  filter: drop-shadow(0 0 5px black);
  height: 0;
  padding-bottom: 90%;
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
