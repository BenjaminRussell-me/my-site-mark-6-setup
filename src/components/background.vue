<template>
  <div id="backgroundHolder">
    <canvas :width="canvasWidth" :height="canvasHeight" id="backgroundCanvas" />
  </div>
</template>

<script>
export default {
  name: "background",
  data() {
    return {
      canvasWidth: 1000,
      canvasHeight: 900
    };
  },
  props: {
    theme: {
      type: Object
    }
  },
  methods: {
    start(x, y) {
      const doc = document.body;
      this.canvasWidth = doc.clientWidth;
      this.canvasHeight = doc.clientHeight;

      this.draw(x, y);
    },
    draw(x, y) {
      const canvas = document.querySelector("#backgroundCanvas");
      const ctx = canvas.getContext("2d");
      const a = (2 * Math.PI) / 6;
      const r = 100;
      const hexagon = () => {
        ctx.beginPath();
        console.log("start");
        for (let i = 0; i < 6; i++) {
          console.log(i);
          ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
        }
        ctx.closePath();
        ctx.stroke();
      };
      hexagon();
    }
  },
  mounted() {
    this.start(100, 100);
  }
};
</script>
<style lang="scss" scoped>
canvas {
  background: red;
}
</style>
