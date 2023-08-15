<template>
  <div class="d-block">
    <page-header
      page-header="שיתופי פעולה"
      content="גופים ואירגונים שיצרנו איתם טיולים נהדרים"
    ></page-header>
    <div
      class="mx-auto cards"
      :style="{ width: `${(8 / 12) * screenWidth}px` }"
    >
      <div
        v-for="card in collaborations"
        :key="collaborations.indexOf(card)"
        class="card bg-muted"
        :style="{
          width: '17%',
          marginLeft: '4.05%',
          display: 'flex',
          border: 'none',
        }"
      >
        <a :href="card.link">
          <img
            :src="require(`../assets/${card.img}`)"
            class="p-0"
            alt="collaborations_pic"
          />
          <p
            class="col-12 mx-auto"
            :style="{ fontSize: `${(16 * this.screenWidth) / 1250}px` }"
          >
            {{ card.line1 }}<br />
            {{ card.line2 }}
          </p>
        </a>
      </div>
    </div>
    <div
      class="mx-auto"
      :style="{
        width: `${(6 / 12) * screenWidth}px`,
        marginBottom: `${(20 * screenWidth) / 1250}px`,
      }"
    >
      <page-header
        content="ועוד עשרות בתי ספר, חדרי מורים, קהילות ומקומות עבודה מכל רחבי הארץ
רוצים גם לשתף איתנו פעולה? יש לכם רעיון ליוזמה משותפת?"
      ></page-header>
    </div>
    <btn-comp
      :screenWidth="screenWidth"
      @on-click="$router.replace('/contact')"
      buttonText="צרו קשר"
    ></btn-comp>
  </div>
</template>


<script>
import BtnComp from "./BtnComp.vue";
import PageHeader from "./PageHeader.vue";
export default {
  components: { PageHeader, BtnComp },
  props: ["screenWidth"],
  data() {
    return {
      collaborations: [
        { img: "Hy.jpg", line1: "מינהל חינוך", line2: "ירושלים" },
        { img: "jlm_variety.jpg", line1: "גווני", line2: "ירושלים" },
        { img: "Ab.png", line1: "אמפי", line2: "בגיא" },
        {
          img: "jlm_parents.jpg",
          line1: "יחידת ההורות",
          line2: "בעיריית ירושלים",
        },
        { img: "jlm_tolerance.jpg", line1: "ירושלים", line2: "סובלנית" },
        { img: "zionist (2).jpg", line1: "המועצה הציונית", line2: "בישראל" },
        {
          img: "solidarity_foundation.jpg",
          line1: "הבית לסולידריות",
          line2: "חברתית",
        },
        { img: "riseup.jpg", line1: "רייזאפ" },
      ],
    };
  },
};
</script>

<style scoped>
.cards {
  margin: 0, auto;
  margin-top: 4%;
  justify-content: center;
  display: inline-flex;
  flex-wrap: wrap;
}
.card {
  width: 25%;
  display: block;
  margin-left: 4.05%;
  display: flex;
  border: none;
  margin-bottom: 2%;
}
a {
  text-decoration: none;
  color: rgb(67, 66, 62);
  text-align: center;
}
img {
  width: 100%;
}
span {
  width: 50%;
  margin: 0, auto;
}
</style>