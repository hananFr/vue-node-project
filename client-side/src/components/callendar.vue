<template>
  <div
    :style="{
      height: height + 'px',
      width: '100%',
      fontSize: (20 * screenWidth) / 1590 + 'px',
    }"
    class="container-fluid"
  >
    <div
      class="container col-12 col-sm-9 col-md-8 col-lg-7 col-xl-6 d-flex mx-auto my-0 py-0 px-0"
    >
      <div class="d-block header-callendar col-12 px-0 mx-0">
        <div>
          <ControllerCalendar
            :screenWidth="screenWidth"
            :default-date="defaultDate"
            @set-month="changeMonth"
          ></ControllerCalendar>
        </div>
        <div class="d-flex col-12 mx-0">
          <div
            :style="{ width: (1 / 7) * 100 + '%' }"
            v-for="day in daysInWeek"
            :key="daysInWeek.indexOf(day)"
            class="day mx-0"
          >
            <b class="mx-auto"> {{ " " + day + " " }} </b>
          </div>
        </div>
        <div class="d-flex body-callendar">
          <day
            :screen-width="screenWidth"
            @set-date="handleClick"
            v-for="day in days"
            :key="days.indexOf(day)"
            :date="day.date"
            :class="day.class"
          ></day>
        </div>
      </div>
      <footer-calendar @toggle="handleBtn"></footer-calendar>
    </div>
  </div>
</template>

<script>
import ControllerCalendar from "./ControllerCalendar.vue";
import Day from "./Day.vue";
import FooterCalendar from "./FooterCalendar.vue";
export default {
  components: { ControllerCalendar, Day, FooterCalendar },
  props: ["date", "toggle"],
  data() {
    return {
      open: this.toggle,
      height: window.innerHeight,
      selectedDate: this.date,
      defaultDate: new Date(this.date.getFullYear(), this.date.getMonth(), 1),
      days: [],
      daysInWeek: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
      screenWidth: window.innerWidth,
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth >= 576) this.screenWidth = window.innerWidth;
      else if (window.innerWidth > 520)
        this.screenWidth = window.innerWidth * 1.5;
      else if (window.innerWidth > 430)
        this.screenWidth = window.innerWidth * 1.6;
      else if (window.innerWidth > 370)
        this.screenWidth = window.innerWidth * 1.8;
      else if (window.innerWidth > 300)
        this.screenWidth = window.innerWidth * 1.95;
      else this.screenWidth = window.innerWidth * 2;

      this.height = window.innerHeight;
    },

    setDaysInMonth(defaultDate) {
      const newDate = new Date(
        defaultDate.getFullYear(),
        defaultDate.getMonth() + 1,
        0
      );
      return newDate.getDate();
    },
    setDays(defaultDate) {
      let dates = [];
      const daysInMonth = this.setDaysInMonth(defaultDate);
      const newDate = new Date(
        defaultDate.getFullYear(),
        defaultDate.getMonth(),
        1
      );
      let daysInCallendar;
      if (
        (newDate.getDay() == 5 && daysInMonth == 31) ||
        (newDate.getDay() == 6 && daysInMonth == 31) ||
        (newDate.getDay() == 6 && daysInMonth == 30)
      )
        daysInCallendar = 42;
      else if (
        (newDate.getDay() !== 5 &&
          newDate.getDay() !== 6 &&
          daysInMonth == 31) ||
        (newDate.getDay() !== 6 && daysInMonth == 30) ||
        daysInMonth == 29 ||
        (newDate.getDay() !== 0 && daysInMonth == 28)
      )
        daysInCallendar = 35;
      else if (daysInMonth == 28 && newDate.getDay() == 0) daysInCallendar = 28;

      newDate.setDate(newDate.getDate() - newDate.getDay());
      for (let i = 0; i < daysInCallendar; i++) {
        let className;
        const day = new Date(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate() + i
        );
        if (
          day.getDate() == this.selectedDate.getDate() &&
          day.getMonth() == this.selectedDate.getMonth()
        )
          className = "date";
        else if (day.getMonth() == defaultDate.getMonth())
          className = "in-month btn";
        else if (day.getMonth() !== defaultDate.getMonth())
          className = "non-in-month btn";
        dates.push({ date: day, class: className });
      }

      this.days = dates;
    },
    handleClick(date) {
      this.selectedDate = date;
    },
    handleBtn(value) {
      if (value === true) {
        this.$emit("set-date", this.selectedDate);
        this.$emit("close", false);
      } else {
        this.selectedDate = this.date;
        this.$emit("close", false);
      }
    },
    changeMonth(num) {
      const newDate = new Date();
      newDate.setFullYear(this.defaultDate.getFullYear());
      newDate.setMonth(this.defaultDate.getMonth() + num);
      newDate.setDate(this.defaultDate.getDate());
      this.defaultDate = newDate;
    },
  },
  mounted() {
    console.log(this.defaultDate);
    this.setDays(this.defaultDate);
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  watch: {
    toggle(value) {
      this.open = value;
    },
    selectedDate(value) {
      const newDate = new Date();
      newDate.setFullYear(this.selectedDate.getFullYear());
      newDate.setMonth(value.getMonth());
      newDate.setDate(1);
      this.days = [];
    },
    days(dates) {
      const arr = Array.from([dates][0]);

      if (!arr[0]) {
        const newDate = new Date();
        newDate.setFullYear(this.selectedDate.getFullYear());
        newDate.setMonth(this.selectedDate.getMonth());
        newDate.setDate(1);
        this.defaultDate = newDate;
      }
    },
    defaultDate(value) {
      this.setDays(value);
    },
  },
};
</script>

<style scoped>
.container-fluid {
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  z-index: 9999;
}
.container {
  opacity: 1;
  align-items: center;
  border-radius: 6px;
  display: flex;
  flex-wrap: wrap;
}
.header-controller {
  display: block;
  background: white;
}
.day {
  display: flex;
  background: white;
  border: 1px;
  border-style: solid;
  border-color: lightgray;
  text-align: center;
}
.body-callendar {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>