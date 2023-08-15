<template>
  <div
    class="container-fluid col-12"
    :style="{
      minHeight: height + 'px',
    }"
  >
    <div class="d-flex col-12">
      <div class="d-block col-12">
        <div
          v-once
          class="page-header"
          :style="{ paddingBottom: (40 * screenWidth) / 1250 + 'px' }"
        >
          <page-header
            class=""
            page-header="הטיולים שלנו"
            content="לחצו על אחד הטיולים כדי לראות את כל הפרטים עליו"
          ></page-header>
        </div>
        <div
          v-if="cards"
          class="d-flex cards col-12 mx-auto justify-content-center text-center"
        >
          <card
            v-for="card in cards"
            :screen-width="screenWidth"
            :key="cards.indexOf(card)"
            :card="card"
            :cardWidth="cardWidth"
          ></card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { URL } from "@/services/config";
import httpServices from "@/services/httpServices";
import PageHeader from "@/components/PageHeader.vue";
import Card from "@/components/Card.vue";
export default {
  components: { PageHeader, Card },
  props: ["screenWidth"],
  data() {
    return {
      cardWidth: 23,
      cards: [],
      height:
        (630 * 1 * this.screenWidth) / 1250 +
        (((486.4 / 368) * 23) / 100) * 1 * this.screenWidth,
      lines: 0,
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth >= 803) {
        this.cardWidth = 23;
        this.lines = Math.ceil(this.cards.length / 3);
      } else if (window.innerWidth > 520) {
        this.cardWidth = 27;
        this.lines = Math.ceil(this.cards.length / 2);
      } else if (window.innerWidth > 430) {
        this.cardWidth = 31;
        this.lines = Math.ceil(this.cards.length);
      } else if (window.innerWidth > 341) {
        this.cardWidth = 34;
        this.lines = Math.ceil(this.cards.length);
      } else if (window.innerWidth > 300) {
        this.cardWidth = 36;
        this.lines = Math.ceil(this.cards.length);
      } else {
        this.cardWidth = 38;
        this.lines = Math.ceil(this.cards.length);
      }
    },
    setHeight(screenWidth, lines, cardWidth) {
      this.height =
        (400 * lines * screenWidth) / 1250 +
        (((486.4 / 368) * cardWidth) / 100) * lines * screenWidth;
      if (lines === 1) this.height += (250 * lines * screenWidth) / 1250;
      if (window.innerWidth < 300) this.height += (150 * screenWidth) / 1250;
      if (window.innerWidth < 200) this.height += (50 * screenWidth) / 1250;
      if (window.innerWidth < 160) this.height += (100 * screenWidth) / 1250;
      if (window.innerWidth < 90) this.height += (300 * screenWidth) / 1250;
      if (window.innerWidth < 75) this.height += (300 * screenWidth) / 1250;
    },
    updateImageHeight() {
      const container = document.querySelector(".container-fluid");
      const backgroundImage =
        getComputedStyle(container).getPropertyValue("background-image");
      const imageUrl = backgroundImage.slice(4, -1).replace(/"/g, "");

      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const imageRatio = image.width / image.height;
        const containerHeight = container.offsetHeight;
        const containerWidth = container.offsetWidth;
        const containerRatio = containerWidth / containerHeight;
        if (containerRatio < imageRatio) {
          container.style.backgroundSize = `auto ${containerHeight}px`;
        } else {
          const imageWidth = containerHeight * imageRatio;
          container.style.backgroundSize = `${imageWidth}px ${containerHeight}px`;
        }
      };
    },
  },
  watch: {
    cards() {
      this.onResize();
      this.setHeight(this.screenWidth, this.lines, this.cardWidth);
    },
    screenWidth(value) {
      this.onResize();
      this.setHeight(value, this.lines, this.cardWidth);
    },
    height() {
      this.updateImageHeight();
    },
  },
  mounted() {
    httpServices
      .get(URL + "/cards/my-cards")
      .then((res) => {
        const cards = res.data.sort(
          (a, b) => new Date(a.travelDate) - new Date(b.travelDate)
        );
        this.cards = cards;
        this.onResize();
      })
      .catch((err) => alert(err));
    window.addEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.container-fluid {
  align-items: center;
  background: url("../assets/default.png");
  background-size: cover;
  justify-content: center;
  display: flex;
}

.cards {
  display: flex;
  padding-right: 5%;
  padding-left: 5%;
  flex-wrap: wrap;
}
</style>
