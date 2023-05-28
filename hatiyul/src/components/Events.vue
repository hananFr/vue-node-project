<template>
  <div class="container-fluid" :style="{height: screenWidth + 'px'}">
    <div class="col-12 my-0 py-0 mb-2 mb-sm-3 mb-md-4 mb-lg-5">
      <page-header
        page-header="מה קורה החודש?"
        content="כל הפעילויות שלנו בחודש הקרוב"
      />
    </div>
    <div
      id="id_calendar"
      class="container"
      :style="{

      }"
    >
      <div class="month row">
        <div 
          class="days-header text-center px-0"
          v-for="day in days_in_week"
          :style="{textAlign: 'center', width: width, fontSize: `${22*this.screenWidth/1250}px`, borderWidth: (screenWidth * 1) / 1600 + 'px'}"
          :key="days_in_week.indexOf(day)"
        >
          <b
            class="pt-0 mt-0 mx-auto"
            >{{day}}</b
          >
        </div>
      </div>
      <div class="row">
        <day-event
          v-for="day in days"
          :days="days"
          :key="days.indexOf(day)"
          :day="day.date"
          :id="day.id"
          :event="day.event"
          :screen-width="screenWidth"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { URL } from "@/services/config";
import axios from "axios";
import PageHeader from "./PageHeader.vue";
import DayEvent from './DayEvent.vue';
import { HDate } from "@hebcal/core";
export default {
  props: ['screenWidth'],
  data() {
    return {
      days: [],
      defaultDate: new Date(),
      events: [],
      days_in_week: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
      width: `${1/7*100}%`,
    };
  },
  methods: {
    async setEvents(){
      await axios.get(`${URL}/cards/my-cards`)
        .then((res) => this.events = res.data)
        .catch((err) => console.log(err));
    },
    setDays() {
      let dates = [];
      for (let i = 0; i < 28; i++) {
        let dayInWeek = new Date();
        dayInWeek.setDate(this.defaultDate.getDate() - this.defaultDate.getDay() + i);
        let event = "";
        if (this.events && this.events[0]) {
          this.events.map((e) => {
            if (
              dayInWeek.getDate() === new Date(e.travelDate).getDate() &&
              dayInWeek.getMonth() === new Date(e.travelDate).getMonth() &&
              dayInWeek.getFullYear() === new Date(e.travelDate).getFullYear()
            )
              event = e.travelName;
          }); 
        }
        dates.push({
          date: new Date(
            dayInWeek.getFullYear(),
            dayInWeek.getMonth(),
            dayInWeek.getDate()
          ),
          id: i,
          event: event,
        });
      }
      
      this.days = dates;
    },
  },
  mounted(){
    this.setEvents()
    this.setDays()
  },
  watch:{
    events(){
      this.setDays()
    },
  },
  components: { PageHeader, DayEvent },
};
</script>

<style scoped>
.container-fluid{
  background: url('../assets/default.png');
  padding-top: 8%;
  background-repeat: no-repeat;
  background-size: cover;
}

.month{
  flex-wrap:nowrap ;
  color: white;
  overflow: hidden;
}
.days-header {
  border-color: white;
  display: flex;
  border-style: solid;
  background: rgb(30, 123, 104);;
  flex-wrap: nowrap;
  padding-top: 0.75%;
  padding-bottom: 0.75%;
  overflow: hidden;
  text-align: center;
}
</style>