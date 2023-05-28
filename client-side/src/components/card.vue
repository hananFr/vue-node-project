<template>
  <div
    v-if="card"
    @click="open"
    class="text-decoration-none card the-card d-flex btn p-0 text-right"
    :style="{
      width: `${(cardWidth / 100) * screenWidth}px`,
      marginBottom: (48 * screenWidth) / 1250 + 'px',
    }"
  >
    <img
      :src="card.travelImage"
      class="card-img-top m-0 p-0"
      :alt="card.travelName"
      :style="{
        height:
          ((((0.85 * 486.4) / 368) * cardWidth) / 100) * screenWidth + 'px',
      }"
    />
    <div
      :style="{
        height:
          ((((0.35 * 486.4) / 368) * cardWidth) / 100) * screenWidth + 'px',
      }"
      class="card-body d-flex align-items-center"
    >
      <div class="d-block">
        <h5
          :style="{
            fontSize: `${(((30 / 368) * cardWidth) / 100) * screenWidth}px`,
          }"
          class=""
        >
          {{ card.travelName }}
        </h5>
        <p
          :style="{
            fontSize: `${(((26 / 368) * cardWidth) / 100) * screenWidth}px`,
          }"
          class="card-text"
        >
          {{ card.headerContext }}
        </p>
      </div>
      
    </div>
  </div>
  <div v-if="this.openCard">
      <travel  @close="openCard=$event" :card="card"></travel>
    </div>
</template>

<script>
import Travel from './Travel.vue';
export default {
  components: { Travel },
  props: ["card", "screenWidth", "cardWidth"],
  data() {
    return {
      openCard: false,
    };
  },
  methods: {
    open() {
      this.openCard = true;
    },
    close() {
      this.openCard = false;
    },
  },
};
</script>

<style scoped>
.the-card {
  border-radius: 0px;
  border-width: 0px;
  border: none;
  color: white;
  margin-right: 3.4%;
  margin-left: 3.4%;
}
.the-card img {
  display: flex;
  border-radius: 0px;
  border-width: 0px;
}
.card-body {
  background: rgb(30, 123, 104);
  color: white;
  height: 15%;
  padding-left: 10%;
  padding-right: 10%;
  text-decoration: none;
}
h5 {
  font-weight: bold;
  padding: 0%;
  margin-bottom: 5%;
}
</style>