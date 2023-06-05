<template>
  <MyForm
    :inputs="inputs"
    :texts="texts"
    :files="files"
    :model="model"
    page-header="רשום משתמש נוסף"
    content="כאן אתה יכול להוסיף משתמשים על מנת שיוכלו לעזור בניהול האתר"
    :url="url"
    :validate="data"
    btn-text="רשום"
    request="put"
    @set-data="validate($event)"
  ></MyForm>
</template>


<script>
import { validateEditUser } from "../services/editUserValid";
import { URL } from "@/services/config";
import MyForm from "@/components/MyForm.vue";
import httpServices from "@/services/httpServices";
export default {
  data() {
    return {
      inputs: [
        { name: "email", label: "אימייל:", type: "email", key: "email" },
        { name: "name", label: "שם:", type: "name", key: "name" },
      ],
      texts: [
        { name: "about-writer", key: "about_writer", label: "קצת על הכותב..." },
      ],
      files: [{ name: "image", key: "image" }],
      url: `${URL}/users/update/${this.$route.params.id}`,
      data: {},
      model: {},
      id: this.$route.params.id,
    };
  },
  methods: {
    validate(data) {
      this.data = validateEditUser(Object.assign({}, data));
    },
    setModel() {
      httpServices
        .get(`${URL}/users/use/${this.id}`)
        .then((res) => {
          this.model = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.setModel();
  },
  components: { MyForm },
};
</script>