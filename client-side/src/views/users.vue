<template>
  <div class="container py-5">
    <table v-if="users" class="table">
      <tr class="border border-solid border-dark">
        <td>שם משתמש</td>
        <td>אימייל</td>
        <td>קבע ניהול</td>
        <td>מחיקת משתמשים</td>
      </tr>
      <tr
        v-for="user in users"
        :key="user._id"
        class="border border-solid border-dark"
      >
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td v-if="user.admin">
          <button class="btn btn-primary bg-primary" @click="setAdmin(user)">
            הסר מניהול
          </button>
        </td>

        <td v-if="!user.admin">
          <button class="btn btn-primary bg-primary" @click="setAdmin(user)">
            קבע כמנהל
          </button>
        </td>
        <td>
          <button
            class="btn btn-primary bg-primary"
            @click="openDialog(user._id)"
          >
            מחק משתמש
          </button>
        </td>
      </tr>
    </table>
    <Dialog
      content="האם אתה בטוח שברצונך למחוק את המשתמש הזה?"
      v-if="open"
      header="מחיקת משתמש"
      :screenWidth="screenWidth"
      :id="this.id"
      @accept="deleteUser($event)"
    ></Dialog>
    <Alert
      v-if="openAlert"
      content="המחיקה בוצעה בהצלחה"
      header="מחיקת משתמש"
      replace="/users"
    ></Alert>
  </div>
</template>

<script>
import httpServices from "@/services/httpServices";
import { URL } from "@/services/config";
import Dialog from "@/components/Dialog.vue";
import Alert from "@/components/Alert.vue";
export default {
  components: { Dialog, Alert },
  props: ["screenWidth"],
  data() {
    return {
      users: [],
      id: "",
      open: false,
      openAlert: false,
    };
  },
  methods: {
    setUsers() {
      httpServices.get(`${URL}/users/get-users`).then((res) => {
        this.users = res.data;
      });
    },
    async setAdmin(user) {
      if (user.admin) {
        await httpServices
          .put(`${URL}/users/admin/${user._id}`, { admin: false })
          .catch((err) => console.log(err));
      } else {
        await httpServices
          .put(`${URL}/users/admin/${user._id}`, { admin: true })
          .catch((err) => console.log(err));
      }
      this.setUsers();
    },
    async deleteUser(id) {
      await httpServices
        .delete(`${URL}/users/${id}`)
        .then(() => {
          this.open = false;
          this.openAlert = true;
        })
        .catch((err) => console.log(err));
    },
    openDialog(id) {
      this.id = id;
      this.open = true;
    },
  },
  mounted() {
    this.setUsers();
  },
};
</script>