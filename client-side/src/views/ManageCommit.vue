<template>
  <div class="container-fluid">
    <page-header
      pageHeader="ניהול תגובות"
      content="כאן תוכל להוסיף ולמחוק תגובות מדף הבית"
    ></page-header>
    <table v-if="commits" class="table">
      <tr v-for="commit in commits" :key="commit._id">
        <td>{{ commit.content }}</td>
        <td>
          <button class="btn bg-primary" @click="openDialog(commit._id)">
            מחק
          </button>
        </td>
      </tr>
    </table>
    <div v-if="dialog">
      <Dialog
        content="התגובה הזאת תימחק, האם אתה בטוח?"
        @accept="deleteCommit($event)"
        @cancel="dialog = $event"
        :screenWidth="screenWidth"
        :id="id"
        header="מחיקת תגובה"
      ></Dialog>
    </div>
    <div v-if="alert">
      <Alert
        content="התגובה הוסרה בהצלחה"
        :screenWidth="screenWidth"
        header="מחיקת תגובה"
        replace="/#/manage-commits"
      ></Alert>
    </div>
    <create-commit :screen-width="screenWidth"></create-commit>
  </div>
</template>

<script>
import { URL } from "@/services/config";
import httpServices from "@/services/httpServices";
import PageHeader from "@/components/PageHeader.vue";
import Dialog from "@/components/Dialog.vue";
import CreateCommit from "@/components/CreateCommit";
import Alert from "@/components/Alert.vue";

export default {
  components: { PageHeader, Dialog, CreateCommit, Alert, CreateCommit },
  props: ["screenWidth"],
  data() {
    return {
      commits: [],
      dialog: false,
      alert: false,
      id: "",
    };
  },
  methods: {
    openDialog(id) {
      this.id = id;
      this.dialog = true;
    },

    async setCommits() {
      await httpServices
        .get(`${URL}/commits/`)
        .then((res) => {
          this.commits = res.data;
        })
        .catch((err) => console.error(err));
    },
    deleteCommit(id) {
      httpServices
        .delete(`${URL}/commits/${id}`)
        .then((this.alert = true))
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    this.setCommits();
  },
};
</script>

<style scoped>
tr {
  border: gainsboro;
  border-style: solid;
  border-width: 1px;
}
</style>