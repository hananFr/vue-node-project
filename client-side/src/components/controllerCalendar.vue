<template>
  <div class="controller" :style="{fontSize: 26 * screenWidth / 1590 +'px'}">
    <b class="btn btn-primary bold mx-3" @click="changeMonth(-1)"> {{ `<` }} </b>
    <b class="month mx-2">{{ months[defaultDate.getMonth()] }}</b>
    <b class="month mx-2"
      >{{ hebMonths[hebDefault] }}-{{ hebMonths[hebEnd] }}</b
    >
    <b @click="changeMonth(1)" class="btn btn-primary bold mx-3"> {{ `>` }} </b>
  </div>
</template>

<script>
import { HDate } from "@hebcal/core";

export default {
  props: ["defaultDate", 'screenWidth'],
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      hebMonths: [
        "",
        "ניסן",
        "אייר",
        "סיוון",
        "תמוז",
        "אב",
        "אלול",
        "תשרי",
        "חשוון",
        "כסלו",
        "טבת",
        "שבט",
        "אדר",
      ],
      endMonth: new Date(this.defaultDate.getFullYear(), this.defaultDate.getMonth() + 1, 0),
      hebDefault: new HDate(this.defaultDate).getMonth(),
      hebEnd: new HDate(),
    };
  },
  methods: {
    setEndMonth() {
      const newDate = new Date();
      newDate.setFullYear(this.defaultDate.getFullYear());
      newDate.setMonth(this.defaultDate.getMonth() + 1);
      newDate.setDate(0);
      this.endMonth = newDate;
      this.hebDefault = new HDate(this.defaultDate).getMonth();
      this.hebEnd = new HDate(newDate).getMonth();
    },
    changeMonth(num) {
      this.$emit("set-month", num);
    },
  },
  mounted() {
    console.log();
    this.setEndMonth();
  },
  watch: {
    defaultDate() {
      this.setEndMonth();
    },
  },
};
</script>

<style scoped>
.controller {
  width: 100%;
  border: 1px;
  border-style: solid;
  border-color: black;
  background: rgb(30, 123, 104);
}
</style>