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
            fill: `hsl(${theme.hsla.h + hueSkew},${theme.hsla.s}%,0%)`
          }"
          class="cls-1"
          points="145.2 491 4.62 247.5 145.2 4 426.37 4 566.96 247.5 426.37 491 145.2 491"
        />
        <path
          :style="{
            fill: `hsl(${theme.hsla.h + hueSkew},${theme.hsla.s}%,${theme.hsla.l - 10}%)`
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
            fill: `hsl(${theme.hsla.h},${theme.hsla.s}%,${theme.hsla.l - 10}%)`
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
            fill: `hsl(${theme.hsla.h},${theme.hsla.s}%,${theme.hsla.l - 10}%)`
          }"
          class="cls-2"
          d="M424.06,8,562.34,247.5,424.06,487H147.51L9.24,247.5,147.51,8H424.06m4.62-8H142.89L0,247.5,142.89,495H428.68l142.9-247.5L428.68,0Z"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
export default defineComponent({
  name: "hexagon",
  props: {
    theme: {
      type: Object
    },
    idEdit: {
      type: Number,
      default: 0
    },
    hueSkew:{
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const hexPosition = reactive({});
    function getSize() {
      const holder: HTMLElement | null = document.querySelector(
        `#hexHolder${props.idEdit}`
      );
      const width: number | undefined = holder?.offsetWidth;
    }
    function getRandomPercentage() {
      return Math.floor(Math.random() * Math.floor(40));
    }
    function getPosition() {
      const littleHex: HTMLElement | null = document.querySelector(
        `#little1${props.idEdit}`
      );
      const littleHex2: HTMLElement | null = document.querySelector(
        `#little2${props.idEdit}`
      );
      const hexes = [littleHex, littleHex2];
      let counter = 0;
      hexes.forEach((hex, i) => {
        setTimeout(() => {
          counter++;
          if (!hex?.classList.contains("animate")) {
            hex?.classList.add("animate");
          }
          if (hex !== null) {
            if (counter === 2) {
              hex.style.cssText = `margin-top:${getRandomPercentage()}%;margin-left:${getRandomPercentage()}%`;
            } else {
              hex.style.cssText = `margin-top:${getRandomPercentage() +
              getRandomPercentage()}%;margin-left:${getRandomPercentage() +
              getRandomPercentage()}%`;
            }
          }
        }, i * 500);
      });
      setTimeout(() => {
        window.requestAnimationFrame(getPosition);
      }, 4000);
    }

    onMounted(() => {
      getPosition();
    });
    return { hexPosition };
  }
});
</script>

<style scoped lang="scss">
.hexHolders {
  display: grid;
  position: relative;
}
.bigHex {
  grid-area: 1/1/1/1;
  position: relative;
  align-self: center;
  justify-self: center;
}
.littleHex {
  grid-area: 1/1/1/1;
  width: 50%;
  opacity: 0;
  transform-origin: center;
  position: absolute;
}
.animate {
  animation: pop 4s forwards linear infinite;
}
.cls-1 {
  fill: #086f87;
}
.cls-2 {
  fill: #00cdfc;
}

@keyframes pop {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    transform: scale(0.9) rotate(60deg);
    opacity: 1;
  }
  55% {
    transform: scale(1) rotate(80deg);
    opacity: 1;
  }
  60% {
    transform: scale(1) rotate(82deg);
    opacity: 0.5;
  }
  100% {
    transform: scale(1) rotate(100deg);
    opacity: 0;
  }
}
</style>
