<template>
  <div class="hexHolders" :id="`hexHolder${idEdit}`">
    <svg
      class="bigHex"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 571.58 495"
    >
      <g>
        <polygon
          :style="{
            fill: `hsl(${theme.hsla.h},${theme.hsla.s}%,${theme.hsla.l}%)`
          }"
          class="cls-1"
          points="145.2 491 4.62 247.5 145.2 4 426.37 4 566.96 247.5 426.37 491 145.2 491"
        />
        <path
          :style="{
            fill: `hsl(${theme.hsla.h},${theme.hsla.s}%,${theme.hsla.l - 10}%)`
          }"
          class="cls-2"
          d="M424.06,8,562.34,247.5,424.06,487H147.51L9.24,247.5,147.51,8H424.06m4.62-8H142.89L0,247.5,142.89,495H428.68l142.9-247.5L428.68,0Z"
        />
      </g>
    </svg>
    <svg
      class="littleHex"
      :id="`little1${idEdit}`"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 571.58 495"
    >
      <g>
        <polygon
          :style="{
            fill: `hsla(${theme.hsla.h},${theme.hsla.s}%,${theme.hsla.l}%, 0)`
          }"
          points="145.2 491 4.62 247.5 145.2 4 426.37 4 566.96 247.5 426.37 491 145.2 491"
        />
        <path
          :style="{
            fill: `hsl(${theme.hsla.h},${theme.hsla.s}%,${theme.hsla.l}%)`
          }"
          class="cls-2"
          d="M424.06,8,562.34,247.5,424.06,487H147.51L9.24,247.5,147.51,8H424.06m4.62-8H142.89L0,247.5,142.89,495H428.68l142.9-247.5L428.68,0Z"
        />
      </g>
    </svg>
    <svg
        class="littleHex"
        :id="`little2${idEdit}`"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 571.58 495"
    >
      <g>
        <polygon
            :style="{
            fill: `hsla(${theme.hsla.h},${theme.hsla.s}%,${theme.hsla.l}%, 0)`
          }"
            points="145.2 491 4.62 247.5 145.2 4 426.37 4 566.96 247.5 426.37 491 145.2 491"
        />
        <path
            :style="{
            fill: `hsl(${theme.hsla.h},${theme.hsla.s}%,${theme.hsla.l}%)`
          }"
            class="cls-2"
            d="M424.06,8,562.34,247.5,424.06,487H147.51L9.24,247.5,147.51,8H424.06m4.62-8H142.89L0,247.5,142.89,495H428.68l142.9-247.5L428.68,0Z"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "hexagon",
  props: {
    theme: {
      type: Object
    },
    idEdit: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const hexPosition = reactive({});
    function getSize() {
      const holder:HTMLElement | null = document.querySelector(`#hexHolder${props.idEdit}`)
      const width:number | undefined = holder?.offsetWidth
    }
    // function getPosition() {
    //
    // }
    return { hexPosition };
  }
});
</script>

<style scoped lang="scss">
.hexHolders{
  display: grid;
}
.bigHex {
  grid-area: 1/1/1/1;
}
.littleHex {
  grid-area: 1/1/1/1;
  width: 30%;
}
.cls-1 {
  fill: #086f87;
}
.cls-2 {
  fill: #00cdfc;
}
</style>
