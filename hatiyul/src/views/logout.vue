<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token")
      window.location = "/"
      console.log(localStorage.getItem('token'));
    },
  },
  mounted() {
    this.logout();
  },
};
</script>