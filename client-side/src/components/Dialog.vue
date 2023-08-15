<template>
  <div class="container-fluid" :style="{ width: '100%', height: height }">
    <div class="container" :style="{ width: (1 / 2) * screenWidth + 'px' }">
      <div class="header">
        <b>
          {{ header }}
        </b>
      </div>
      <div class="d-block align-items-start content">
        <p>{{ content }}</p>
      </div>
      <div class="buttons d-flex mx-auto">
        <button class="btn btn-warning d-flex" @click="onAccept">אשר</button>
        <button class="btn btn-warning d-flex" @click="onCancel">בטל</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["content", "id", "screenWidth", "header"],
  data() {
    return {
      height: window.innerHeight + "px",
    };
  },
  methods: {
    onAccept() {
      this.$emit("accept", this.id);
    },
    onCancel() {
      this.$emit("cancel", false);
    },
  },
};
</script>

<style scoped>
.container-fluid {
  left: 0;
  top: 0;
  display: flex;
  padding: 0;
  align-items: center;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  z-index: 9999;
}
.header {
  background: red;
  padding: 1%;
  margin-top: 2%;
  width: 100%;
}
.container {
  justify-content: center;
  text-align: center;
  background: rgba(125, 255, 170, 1);
  border-radius: 5px;
  padding: 0;
}
.content {
  margin: 3%;
}
.buttons {
  justify-content: center;
  margin: 1%;
}
button {
  margin: 1%;
}
</style>