<template>
  <div class="home col-12 d-block mx-0">
    <about :screen-width="responsiveScreen"></about>
    <website-cards :screen-width="responsiveScreen"></website-cards>
    <events :screen-width="screenWidth"></events>
    <collaborations :screen-width="responsiveScreen"></collaborations>
    <commits :screen-width="responsiveScreen"></commits>
  </div>
</template>

<script>
import About from "@/components/About.vue";
import WebsiteCards from "@/components/WebsiteCards.vue";
import Events from "@/components/Events.vue";
import Collaborations from "@/components/Collaborations.vue";
import Commits from "@/components/Commits.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  data() {
    return {
      screenWidth: window.innerWidth,
      responsiveScreen: window.innerWidth,
    };
  },
  methods: {
    onResize() {
      this.screenWidth = window.innerWidth;

      if (window.innerWidth >= 576) this.responsiveScreen = window.innerWidth;
      else if (window.innerWidth > 520)
        this.responsiveScreen = window.innerWidth * 1.35;
      else if (window.innerWidth > 430)
        this.responsiveScreen = window.innerWidth * 1.4;
      else if (window.innerWidth > 370)
        this.responsiveScreen = window.innerWidth * 1.45;
      else if (window.innerWidth > 300)
        this.responsiveScreen = window.innerWidth * 1.5;
      else this.responsiveScreen = window.innerWidth * 1.65;
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  components: {
    About,
    WebsiteCards,
    Events,
    Collaborations,
    Commits,
  },
};
</script>
