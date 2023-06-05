<template>
  <MyForm
    :inputs="inputs"
    :texts="texts"
    :files="files"
    page-header="רשום משתמש נוסף"
    content="כאן אתה יכול להוסיף משתמשים על מנת שיוכלו לעזור בניהול האתר"
    :url="url"
    :validate="data"
    btn-text="רשום"
    request="post"
    @set-data="validate($event)"
  ></MyForm>
</template>


<script>
import { validateUser } from "../services/userValid";
import { URL } from "@/services/config";
import MyForm from "@/components/MyForm.vue";
export default {
  data() {
    return {
      inputs: [
        { name: "email", label: "אימייל:", type: "email", key: "email" },
        { name: "name", label: "שם:", type: "name", key: "name" },

        {
          name: "password",
          label: "סיסמה:",
          type: "password",
          key: "password",
        },
      ],
      texts: [
        { name: "about-writer", key: "about_writer", label: "קצת על הכותב..." },
      ],
      files: [{ name: "image", key: "image" }],
      url: `${URL}/users/`,
      data: {},
    };
  },
  methods: {
    validate(data) {
      this.data = validateUser(Object.assign({}, data));
    },
  },
  components: { MyForm },
};
</script>