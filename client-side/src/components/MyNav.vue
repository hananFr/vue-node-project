<template>
  <div class="container-fluid text-center d-flex align-items-end">
    <div class="col-1 d-block d-lg-none">
      <nav
        class="col-12 navbar align-items-start float-right mx-auto justify-content-center navbar-light d-lg-none w-100 h-200"
      >
        <span
          @click="toggleMenu"
          class="col-12 btn navbar-toggler-icon float-right"
        ></span>
      </nav>
      <mune
        @close="closeToggle($event)"
        class="d-block"
        :open="open"
        :nav-links="navLinks"
        :admin-links="adminLinks"
        :user-links="userLinks"
        :user="user"
        :screen-width="screenWidth"
      ></mune>
    </div>
    <div class="img-div col-10 col-md-4 col-lg-3 col-xl-2">
      <img
        class="d-flex mx-auto col-6 col-md-12 mr-md-3 mr-lg-4"
        src="../assets/logo.png"
        alt="logo_pic"
      />
    </div>
    <div class="container d-none d-lg-flex justify-content-end">
      <router-link
        v-for="link in navLinks"
        :key="navLinks.indexOf(link)"
        :class="link.class"
        :to="link.link"
        >{{ link.text }}</router-link
      >
    </div>
    <div class="dropdown ml-5 d-none d-lg-flex" v-if="user">
      <button
        @click="toggle"
        class="btn m-0 p-0 link btn-muted"
        type="button"
        id="dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        ניהול
      </button>
      <div
        v-if="dropdown"
        class="dropdown-menu d-block"
        aria-labelledby="dropdown"
      >
        <div class="d-block" v-if="user.admin">
          <router-link
            class="nav-item d-inline-block text-right col-12"
            v-for="link in adminLinks"
            :key="adminLinks.indexOf(link)"
            :class="link.class"
            @mouseover="() => (link.class = 'bg-primary link')"
            @mouseleave="() => (link.class = 'link')"
            :to="link.link"
            >{{ link.text }}</router-link
          >
        </div>
        <div class="d-block" v-if="user">
          <router-link
            class="nav-item d-inline-block text-right col-12"
            v-for="link in userLinks"
            :key="userLinks.indexOf(link)"
            :class="link.class"
            @mouseover="() => (link.class = 'bg-primary link')"
            @mouseleave="() => (link.class = 'link')"
            :to="link.link"
            >{{ link.text }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentUser } from "@/services/userService";
import Mune from "./Mune.vue";
export default {
  components: { Mune },
  props: ["screenWidth"],
  data() {
    return {
      user: {},
      open: false,
      dropdown: false,
      navLinks: [
        { link: "/", class: "home-link", text: "דף הבית" },
        { link: "/about", class: "link", text: "הכירו אותנו" },
        { link: "/travels", class: "link", text: "טיולים" },
        { link: "/social-projects", class: "link", text: "פרוייקטים חברתיים" },
        { link: "/contact", class: "link", text: "יצירת קשר" },
      ],
      adminLinks: [
        { link: "/create-card", class: "link", text: "יצירת סיור חדש" },
        { link: "/users", class: "link", text: "משתמשים" },
        { link: "/signup", class: "link", text: "רשום משתמש" },
        { link: "/manage-commits", class: "link", text: "נהל תגובות" },
      ],
      userLinks: [
        { link: "", class: "link", text: "ערוך פרופיל" },
        { link: "/logout", class: "link", text: "התנתק" },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.open = true;
    },
    closeToggle(close) {
      this.open = close;
    },
    toggle() {
      !this.dropdown ? (this.dropdown = true) : (this.dropdown = false);
    },
    closeDropdown(e) {
      const element = document.getElementById("dropdown");
      if (e.target !== element) {
        this.dropdown = false;
      }
    },
  },
  mounted() {
    const user = getCurrentUser();
    this.user = user;
    if (user) this.userLinks[0].link = `edit-profile/${user._id}`;
    window.addEventListener("click", this.closeDropdown);
  },
};
</script>
<style scoped>
.container {
  display: flex;
  width: 80%;
  float: left;
  margin-left: 0;
  padding-left: 0;
  margin-top: 15%;
}
.img-div {
  float: right;
  justify-content: center;
  margin-right: 5%;
}

img {
  margin-right: 5%;
}
.home-link {
  color: lightseagreen;
  display: flex;
  font-size: 28px;
  font-weight: bold;
  margin-left: 5%;
  text-decoration: none;
}
.link {
  color: rgb(67, 66, 62);
  font-size: 28px;
  text-decoration: none;
  margin-left: 5%;
}
.dropdown-menu {
  text-align: right;
  display: none;
  top: 48px;
  left: 0px;
}

</style>