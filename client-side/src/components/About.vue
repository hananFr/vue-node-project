<template>
  <div
    id="about"
    class="about justify-content-center"
    :style="{ height: `${(1167 / 2184) * this.screenWidth}px` }"
  >
    <div>
      <page-header class="page-header" :screenWidth="screenWidth" :style="{width: `${(51/100) * screenWidth}px`}" :content="content" :pageHeader="header">
        הטיול העירוני הוא מיזם חברתי וחינוכי שנולד בתקופת הקורונה מתוך הצורך
        להוציא את הילדות והילדים מהמסכים אל הטבע הסובב אותם.<br />
        המטרה שלנו בטיול העירוני היא לאפשר לכל ילד וילדה להצטרף לטיולים, בלי קשר
        למצב הכלכלי של משפחתם. לכל פעילות יש תעריף דיפרנציאלי, כשהרעיון הוא שכל
        משפחה משלמת כמה שהיא יכולה. משפחה שמשלמת את התעריף הגבוה מסבסדת משפחות
        אחרות שאין ביכולתן לשלם את המחיר המלא. אנחנו לא נכנסים לאנשים לכיס ולא
      לוקחים פרטי כרטיס אשראי, כל זאת מתוך רצון לארגן טיולים נגישים בהתחשבות
        מקסימלית בפגיעה הכלכלית הקשה של ימי הקורונה.
      </page-header>
    </div>
  </div>
</template>

<script>
import PageHeader from "./PageHeader.vue";
export default {
  props: ["screenWidth"],
  components: { PageHeader },
  data() {
    return {
      header: "קצת עלינו",
    };
  },
};
</script>
<style scoped>
.about {
  background-image: url("../assets/1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;
  display: flex;
  width: 100%;
}
.page-header {
  background: white;
  justify-content: center;
  margin: 0, auto;
  opacity: 75%;
  padding: 1.8% 2%;
  text-align: justify;
  display: inline-block;
}
</style>