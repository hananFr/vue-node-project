<template>
  <div
    :style="{
      fontSize: (screenWidth * 20) / 1590 + 'px',
      width: (1 / 7) * 100 + '%',
      height: `${(100 * screenWidth) / 1590}px`,
    }"
    :class="`${this.class} all`"
    @click="setTheDate"
  >
    <div class="dates">
      <p class="h-date">
        {{ hebDate.day }}
      </p>
      <p class="day">
        {{ date.getDate() }}
      </p>
    </div>
    <div v-if="shabes" class="span mx-auto">
      <span>שבת </span>
    </div>
    <div class="span mx-auto">
      <span>{{ event }} </span>
    </div>
  </div>
</template>

<script>
import {
  toJewishDate,
  formatJewishDate,
  toHebrewJewishDate,
  formatJewishDateInHebrew,
  toGregorianDate,
  JewishMonth,
} from "jewish-date";

export default {
  props: ["date", "class", "screenWidth"],
  data() {
    return {
      hebDate: toHebrewJewishDate(toJewishDate(this.date)),
      event: "",
      shabes: false,
    };
  },
  methods: {
    setTheDate() {
      this.$emit("set-date", this.date);
    },
    checkHolidays(date) {
      date.getDay() == 6 ? (this.shabes = true) : (this.shabes = false);
      const newDate = toJewishDate(date);

      if (newDate.day >= 25 && newDate.day <= 30 && newDate.month == 3) {
        return "חנוכה";
      } else if (newDate.day <= 2 && newDate.month == 4) {
        return "חנוכה";
      } else if (newDate.day == 10 && newDate.month == 4) {
        return "עשרה בטבת";
      } else if (newDate.day == 15 && newDate.month == 5) {
        return "טו בשבט";
      } else if (newDate.day == 14 && newDate.month == 6) {
        return "פורים";
      } else if (newDate.day == 15 && newDate.month == 6) return "שושן פורים";
      else if (newDate.day == 22 && newDate.month == 7) {
        return "אסרו חג";
      } else if (newDate.day == 18 && newDate.month == 8) {
        return "לג בעומר";
      } else if (newDate.day == 6 && newDate.month == 9) {
        return "שבועות";
      } else if (newDate.day == 17 && newDate.month == 10 && date != 6) {
        return "צום יז בתמוז";
      } else if (newDate.day == 18 && newDate.month == 10 && date == 0) {
        return "צום יז בתמוז";
      } else if (newDate.day == 9 && newDate.month == 11 && date != 6) {
        return "תשעה באב";
      } else if (newDate.day == 10 && newDate.month == 11 && date == 0) {
        return "תשעה באב";
      } else if (newDate.day == 15 && newDate.month == 11) {
        return "טו באב";
      } else if (newDate.day == 1 && newDate.month != 1) {
        return "ראש חודש";
      } else if (newDate.month == 1 && newDate.day == 1) {
        return "ראש השנה";
      } else if (newDate.month == 1 && newDate.day == 22) {
        return "שמיני עצרת";
      } else if (newDate.month == 1 && newDate.day == 23) {
        return "אסרו חג";
      } else if (newDate.month == 1 && newDate.day == 10) {
        return "יום כיפור";
      } else if (newDate.day >= 15 && newDate.day <= 21) {
        if (newDate.month == 1) return "סוכות";
        else if (newDate.month == 7) return "פסח";
      } else if (newDate.month == 4 && newDate == 3) {
        let hebDate = toJewishDate(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - 3
        );
        if (hebDate == 29) {
          return "חנוכה";
        }
      }
    },
  },
  mounted() {
    this.event = this.checkHolidays(this.date);
  },
  watch: {
    date(value) {
      this.hebDate = toHebrewJewishDate(toJewishDate(value));
      this.event = this.checkHolidays(value);
    },
  },
};
</script>

<style  scoped>
.all {
  padding: 0;
  background: white;
  border: 1px;
  border-style: solid;
  border-color: lightgray;
  border-radius: 0;
  display: grid;
  flex-wrap: wrap;
}
.date {
  display: flex;
  background: rgb(30, 123, 104);
  color: white;
}
.dates {
  display: flex;
  width: 100%;
}
.in-month {
  display: flex;
}
.non-in-month {
  display: flex;
}
.h-date {
  display: flex;
  float: right;
  margin-right: 1%;
}
.day {
  display: flex;
  float: left;
  margin-right: auto;
  justify-content: flex-end;
}
.span {
  align-self: start;
}
</style>