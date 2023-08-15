<template>
  <div
    class="container-fluid"
    :style="{ width: '100%', minHeight: height + 'px' }"
  >
    <div class="scrollable-container col-12 col-xl-5">
      <div
        id="travel"
        :style="{
          width: '100%',
          height: '70%',
          background: `url(${card.travelImage})`,
        }"
      >
        <img
          :width="'100%'"
          class="close"
          @click="closeCard($event)"
          :src="require('../assets/close.png')"
          alt="close_item"
        />
      </div>
      <div class="header">
        <b>
          {{ card.travelName }}
        </b>
      </div>
      <div class="d-block align-items-start content">
        <p>{{ card.travelDescription }}</p>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: ["card"],
  data() {
    return {
      height: window.innerHeight,
      screenWidth: window.innerWidth,
    };
  },
  methods: {
    closeCard() {
      this.$emit("close", false);
    },
    onResize() {
      this.height = window.innerHeight;
      this.screenWidth = window.innerWidth;
      const container = document.getElementById("travel");
      container.onload = () => {
        this.containerHeight = container.offsetWidth;
      };
    },
    updateImageHeight() {
      const container = document.querySelector("#travel");
      const backgroundImage =
        getComputedStyle(container).getPropertyValue("background-image");
      const imageUrl = backgroundImage.slice(4, -1).replace(/"/g, "");
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const containerHeight = container.offsetHeight;
        const containerWidth = container.offsetWidth;
        container.style.backgroundSize = `${containerWidth}px ${containerHeight}px`;
      };
    },
  },
  mounted() {
    this.updateImageHeight();
    this.onResize();

    window.addEventListener("resize", this.updateImageHeight);
    window.addEventListener("resize", this.onResize);
    window.addEventListener("load", this.onResize);
  },
};
</script>

<style scoped>
.container-fluid {
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 9999;
}
#travel {
  background-size: cover;
}
.scrollable-container {
  background: rgba(255, 255, 255, 0.8);
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 0px;
}
#travel {
  background-size: cover;
  background-position: center;
}
.close {
  float: right;
  width: 30px;
}
</style>