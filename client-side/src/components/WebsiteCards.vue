<template>
  <div
    class="container col-12 justify-content-center"
    :style="{
      marginBottom: (20 * screenWidth) / 1250 + 'px',
      marginTop: (30 * screenWidth) / 1250 + 'px',
    }"
  >
    <div class="row m-0">
      <page-header
        class="py-sm-4 py-xl-5"
        :page-header="'בואו לטייל איתנו'"
        :content="'בחרו לאיזה טיול תרצו להצטרף'"
      ></page-header>
    </div>
    <div
      v-if="cardsToShow"
      class="d-flex _cards col-12 row mx-auto justify-content-center text-center"
    >
      <card
        :cardWidth="cardWidth"
        v-for="card in cardsToShow"
        :screen-width="screenWidth"
        :key="cards.indexOf(card)"
        :card="card"
      ></card>
    </div>
    <div>
      <btn-comp
        buttonText="לכל הטיולים"
        @on-click="$router.replace('/travels')"
        :screenWidth="screenWidth"
      ></btn-comp>
    </div>
  </div>
</template>

<script>
import { URL } from "@/services/config";
import PageHeader from "./PageHeader.vue";
import BtnComp from "./BtnComp.vue";
import Card from "./Card.vue";

const axios = require("axios");
export default {
  props: ["screenWidth"],
  components: { PageHeader, BtnComp, Card },
  data() {
    return {
      cards: [],
      cardsToShow: [],
      cardWidth: 23,
    };
  },
  methods: {
    onResize(data) {
      if (window.innerWidth >= 576) {
        this.cardWidth = 23;
      } else if (window.innerWidth > 520) {
        this.cardWidth = 27;
      } else if (window.innerWidth > 430) {
        this.cardWidth = 31;
      } else if (window.innerWidth > 370) {
        this.cardWidth = 34;
      } else if (window.innerWidth > 300) {
        this.cardWidth = 36;
      } else {
        this.cardWidth = 38;
      }
      if (typeof data !== "array" && data.type === "resize")
        this.showCards(this.cards);
      else this.showCards(data);
    },
    showCards(cards) {
      let cardsArray = Array.from([cards][0]);
      let cardsToShow;
      if (cardsArray && cardsArray[1]) {
        if (
          document.body.getBoundingClientRect().width < 576 &&
          document.body.getBoundingClientRect().width >= 521
        ) {
          cardsToShow = [cardsArray[0], cardsArray[1]];
        } else if (document.body.getBoundingClientRect().width <= 520) {
          cardsToShow = [cardsArray[0]];
        } else cardsToShow = cardsArray;
      } else {
        cardsToShow = cardsArray;
      }
      this.cardsToShow = cardsToShow;
    },
    async onMount() {
      await axios
        .get(`${URL}/cards/website`)
        .then((res) => {
          const cards = res.data.sort(
            (a, b) => new Date(a.travelDate) - new Date(b.travelDate)
          );
          this.cards = cards;
          this.onResize(cards);
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.onMount();
    window.addEventListener("resize", this.onResize);
  },
};
</script>
<style scoped>
.container {
  display: contents;
}
._cards {
  padding-right: 5%;
  padding-left: 5%;
}
</style>
