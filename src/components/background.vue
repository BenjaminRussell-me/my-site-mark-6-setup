<template>
  <div id="backgroundHolder">
    <canvas style="height:100vh; width:100vw;" id="backgroundCanvas" />
  </div>
</template>

<script>
export default {
  name: "background",
  props: {
    theme: {
      type: Object
    }
  },
  methods: {
    draw(x, y) {
      const canvas = document.querySelector("#backgroundCanvas");
      const ctx = canvas.getContext("2d");
      const a = (2 * Math.PI) / 6;
      const r = 50;
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
    this.draw(50, 50);
  }
};
</script>
<style lang="scss" scoped>
canvas {
}
</style>
