<template>
  <div
    class="day"
    :style="{
      borderWidth: (screenWidth * 1) / 1590 + 'px',
      width: `${(1 / 7) * 100}%`,
      height: `${((this.screenWidth * 2) / 3 / 7) * 1.4}px`,
    }"
  >
    <div>
      <div
        :style="{ fontSize: (16 * this.screenWidth) / 1250 + 'px' }"
        className=" d-flex dates"
      >
        <p :style="{ paddingRight: '0.1%' }" class="float-right mr-0">
          {{ hebDate }}
        </p>
        <p class="date" :style="{ paddingLeft: '0.1%' }">
          {{ this.day.getDate() }}
        </p>
      </div>
      <div
        :style="{ fontSize: (25 * this.screenWidth) / 1250 + 'px' }"
        v-if="event"
        class="span mt-0"
      >
        <span>{{ event }} </span>
      </div>
    </div>
  </div>
</template>


<script>
import { HDate } from "@hebcal/core";

export default {
  props: ["event", "day", "screenWidth"],
  data() {
    return {
      hebDate: "",
      height: `${((this.screenWidth * 2) / 3 / 7) * 1.15}px`,
      fontSize: (16 * this.screenWidth) / 1250 + "px",
      spanFontSize: (22 * this.screenWidth) / 1250 + "px",
      width: (1 / 7) * 100 + "%",
      days_array: [
        "א",
        "ב",
        "ג",
        "ד",
        "ה",
        "ו",
        "ז",
        "ח",
        "ט",
        "י",
        'י"א',
        'י"ב',
        'י"ג',
        'י"ד',
        'ט"ו',
        'ט"ז',
        'י"ז',
        'י"ח',
        'י"ט',
        "כ",
        'כ"א',
        'כ"ב',
        'כ"ג',
        'כ"ד',
        'כ"ה',
        'כ"ו',
        'כ"ז',
        'כ"ח',
        'כ"ט',
        "ל",
      ],
    };
  },

  methods: {
    setHebDate() {
      this.hebDate = this.days_array[new HDate(this.day).day - 1];
    },
  },
  mounted() {
    this.setHebDate();
    window.addEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.day {
  display: block;
  background-color: rgb(248, 249, 250);
  color: black;
  border: solid;
  border-color: white;
  border-radius: 0;
  justify-content: center;
  padding: 0.5%;
  align-items: flex-start;
}

.dates {
  padding: 0;
  margin-bottom: 0;
}

.date {
  float: left;
  margin-right: auto;
}
.span {
  text-align: center;
  margin: 0;
  padding: 0;
  position: relative;
  top: -15px;
  padding-left: 10%;
  padding-right: 10%;
}
span {
  color: rgb(30, 123, 104);
  font-weight: bold;
  margin: 0;
  padding: 0;
}
</style>