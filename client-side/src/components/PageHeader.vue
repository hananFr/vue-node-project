<template>
  <div>
    <h2 :style="{ fontSize: `${(30 * screenWidth) / 1250}px` }">
      {{ pageHeader }}
    </h2>
    <div
      :style="{
        fontSize: `${(22 * screenWidth) / 1250}px`,
        lineHeight: `${(28.8 * screenWidth) / 1250}px`,
      }"
      class="p"
    >
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pageHeader", "content"],
  data() {
    return {
      screenWidth: document.body.getBoundingClientRect().width,
    };
  },
  methods: {
    onResize() {
      if (document.body.getBoundingClientRect().width >= 580)
        this.screenWidth = document.body.getBoundingClientRect().width;
      else if (document.body.getBoundingClientRect().width > 520)
        this.screenWidth = document.body.getBoundingClientRect().width * 1.35;
      else if (document.body.getBoundingClientRect().width > 430)
        this.screenWidth = document.body.getBoundingClientRect().width * 1.6;
      else if (document.body.getBoundingClientRect().width > 370)
        this.screenWidth = document.body.getBoundingClientRect().width * 1.8;
      else if (document.body.getBoundingClientRect().width > 300)
        this.screenWidth = document.body.getBoundingClientRect().width * 1.82;
      else this.screenWidth = document.body.getBoundingClientRect().width * 2;
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Assistant:wght@700&display=swap");
h2 {
  color: rgb(30, 123, 104);
  font-weight: bold;
  font-family: "Assistant", sans-serif;
  margin-top: 0;
  margin-bottom: 5px;
  padding: 0;
}
.p {
  margin: 0;
  color: rgb(67, 66, 62);
  font-weight: 460;
}
</style>