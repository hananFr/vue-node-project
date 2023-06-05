<template>
  <div dir="rtl">
    <MyNav :screen-width="screenWidth"></MyNav>
    <router-view :screen-width="screenWidth"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import MyNav from "./components/MyNav.vue";
import About from "./components/About.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { MyNav, About, Footer },
  data() {
    return {
      screenWidth: window.innerWidth,
    };
  },
  methods: {
    onResize() {
      this.screenWidth = window.innerWidth;

      if (window.innerWidth >= 576) this.screenWidth = window.innerWidth;
      else if (window.innerWidth > 520)
        this.screenWidth = window.innerWidth * 1.35;
      else if (window.innerWidth > 430)
        this.screenWidth = window.innerWidth * 1.35;
      else if (window.innerWidth > 370)
        this.screenWidth = window.innerWidth * 1.45;
      else if (window.innerWidth > 300)
        this.screenWidth = window.innerWidth * 1.5;
      else this.screenWidth = window.innerWidth * 1.65;
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Assistant&display=swap");
#app {
  font-family: "Assistant", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  overflow-x: hidden;
}

nav a {
  font-family: "Assistant", sans-serif;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
