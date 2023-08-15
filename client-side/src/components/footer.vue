<template>
  <div
    class="footer m-0 d-flex"
    :style="{ height: `${(719 / 2184) * screenWidth}px` }"
  >
    <div class="container col-7 d-flex text-right">
      <div
        class="col-4 col-md-3 d-block"
        :style="{ fontSize: `${(23 * screenWidth) / 1250}px` }"
      >
        <router-link
          :style="{ marginBottom: `${(screenWidth * 20) / 1250}px` }"
          class="home-link d-block text-decoration-none"
          to="/"
          ><b>הטיול העירוני</b> <br />
          משהו טוב על הדרך</router-link
        >
        <router-link class="link d-block text-decoration-none" to="/about"
          >הכירו אותנו</router-link
        >
        <router-link class="link" to="/travels">הטיולים שלנו</router-link>
        <router-link class="link" to="/social-projects"
          >פרוייקטים חברתיים</router-link
        >
        <router-link class="link" to="/contact">יצירת קשר</router-link>
      </div>
      <div class="links d-flex">
        <a
          v-for="link in links"
          class="media-link"
          :key="links.indexOf(link)"
          :href="link.link"
          ><img
            :src="require(`../assets/${link.image}`)"
            :style="{ width: `${(52 * screenWidth) / 1250}px` }"
        /></a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      screenWidth: document.body.getBoundingClientRect().width,
      links: [
        { image: "mail.png", link: "https://www.gmail.com" },
        { image: "facebook.png", link: "https://www.facebook.com/hatiyulha" },
        {
          image: "massenger.png",
          link: "https://www.facebook.com/messages/t/106179537991619",
        },
        {
          image: "whatsapp.png",
          link: "https://api.whatsapp.com/send?phone=972503934628&app=facebook&entry_point=page_cta&fbclid=IwAR35IgfywMLZ0DGuYqEN6jgPCVTF8xoBccKPb4UHOK57Lysk50l-sA_flBI",
        },
      ],
    };
  },
  methods: {
    onResize() {
      this.screenWidth = document.body.getBoundingClientRect().width;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.footer {
  align-items: center;
  background: url("../assets/footer.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  display: flex;
  margin: 0%;
  width: 100%;
}

.home-link {
  display: block;
  color: white;
  text-decoration: none;
  text-align: right;
}
.link {
  display: block;
  color: white;
  text-decoration: none;
  text-align: right;
  margin-bottom: 5%;
}
.links {
  align-items: center;
  float: left;
  margin-right: 25%;
}
.media-link {
  margin-left: 10%;
}
</style>