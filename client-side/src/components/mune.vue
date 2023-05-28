<template>
  <div
    v-if="open"
    :style="{ height: screenHeight + 'px', alignItems: align, fontSize: 28*screenWidth/450 +'px' }"
    class="menu-container d-flex text-center justify-content-center"

  >
    <button class="btn btn-muted" @click="handleClick">X</button>
    <div class="container d-block text-center justify-content-center">
      <router-link
        @click="handleClick"
        class="d-block"
        v-for="link in navLinks"
        :key="navLinks.indexOf(link)"
        :class="link.class"
        :to="link.link"
        >{{ link.text }}</router-link
      >
      <div v-if="user && user.admin">
        <router-link
          class="d-block"
          @click="handleClick"
          v-for="link in adminLinks"
          :key="adminLinks.indexOf(link)"
          :class="link.class"
          :to="link.link"
          >{{ link.text }}</router-link
        >
      </div>
      <div v-if="user">
        <router-link
          @click="handleClick"
          class="d-block"
          v-for="link in userLinks"
          :key="userLinks.indexOf(link)"
          :class="link.class"
          :to="link.link"
          >{{ link.text }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["open", "navLinks", "adminLinks", "userLinks", "user","screenWidth"],
  data() {
    return {
      screenHeight: window.innerHeight,
      align: 'center'
    };
  },
  methods: {
    onResize() {
      this.screenHeight = window.innerHeight;
      if(this.user) this.align = 'start'
      if(!this.user) this.align = 'center'
    },
    handleClick() {
      this.$emit("close", this.input);
    },
  },
  mounted() {
    window.addEventListener("load", this.onResize);
    window.addEventListener("resize", this.onResize);
    
  },
};
</script>


<style scoped>
.menu-container {
  opacity: 94%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

button {
  position: absolute;
  left: 4px;
  top: 4px;
}

.home-link {
  color: lightseagreen;
  font-weight: bold;
  margin-left: 6%;
  text-decoration: none;
}
.link {
  color: rgb(67, 66, 62);
  text-decoration: none;
  margin-left: 6%;
}
</style>
