<template>
  <div
    class="container-fluid col-12"
    :style="{ height: `${(750 * this.screenWidth) / 1350}px` }"
  >
    <div class="container col-12">
      <div
        class="col-12"
        :style="{
          fontSize: `${(26 * this.screenWidth) / 1250}px`,
          paddingBottom: `${(20 * screenWidth) / 1250}px`,
        }"
      >
        <b>דברים טובים שכתבו לנו</b>
      </div>
      <div
        class="commits justify-between col-12"
        :style="{ fontSize: `${(22 * this.screenWidth) / 1250}px` }"
      >
        <div
          v-for="commit in getCommits"
          class="commit"
          :key="commits.indexOf(commit)"
          :style="commit.style"
        >
          <p>"{{ commit.content }}"</p>
        </div>

        <p />
      </div>
    </div>
  </div>
</template>

<script>
import { URL } from "@/services/config";
import axios from "axios";
export default {
  props: ["screenWidth"],

  data() {
    return {
      commits: [],
      commitsToShow: [],
      counter: 0,
    };
  },

  methods: {
    async setCommits() {
      await axios
        .get(`${URL}/commits`)
        .then((res) => {
          this.commits = res.data;
          this.counter = res.data.length;
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    this.setCommits();
    window.setInterval(() => this.counter++, 5000);
  },
  computed: {
    getCommits() {
      if (this.commits[0]) {
        const commits = [];
        for (var i = 0; i < 5; i++) {
          if (i === 0)
            commits.push({
              content:
                this.commits[(this.counter - i) % this.commits.length].content,
              style: {
                margin: 0,
                right: (-200 * this.screenWidth) / 1250 + "px",
                position: "relative",
                zIndex: 0,
              },
            });
          if (i === 1)
            commits.push({
              content:
                this.commits[(this.counter - i) % this.commits.length].content,
              style: {
                margin: 0,
                right: (-100 * this.screenWidth) / 1250 + "px",
                position: "relative",
                zIndex: 0,
              },
            });
          else if (i === 2)
            commits.push({
              content:
                this.commits[(this.counter - i) % this.commits.length].content,
              style: { margin: 0, position: "relative", zIndex: 0 },
            });
          else if (i === 3)
            commits.push({
              content:
                this.commits[(this.counter - i) % this.commits.length].content,
              style: {
                margin: 0,
                left: (-100 * this.screenWidth) / 1250 + "px",
                position: "relative",
                zIndex: 0,
              },
            });
          else if (i === 4)
            commits.push({
              content:
                this.commits[(this.counter - i) % this.commits.length].content,
              style: {
                margin: 0,
                left: (-200 * this.screenWidth) / 1250 + "px",
                position: "relative",
                zIndex: 0,
              },
            });
        }
        return commits;
      } else return "wrong";
    },
  },
};
</script>

<style scoped>
.container-fluid {
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../assets/bg2.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  width: 100%;
  padding: 0;
  margin: 0;
}
.container {
  width: 100%;
  padding: 0;
  margin: 0;
  justify-content: center;
}
.commits {
  display: flex;
  font-style: italic;
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0, auto;
}
.commit {
  display: flex;
  text-align: center;
  width: 22%;
  position: relative;
  margin: 0;
}
</style>