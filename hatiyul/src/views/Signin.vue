<script>

import { URL } from "@/services/config";
import MyForm from "@/components/myForm.vue";
import { login } from '@/services/userService';
import validateSignIn from "@/services/loginValid";
export default {
  data() {
    return {
      inputs: [
        { name: "email", label: "אימייל:", type: "email", key: "email" },
        {
          name: "password",
          label: "סיסמה:",
          type: "password",
          key: "password",
        },
      ],
      btnText: 'התחבר',
      data: {},
    };
  },
  methods: {
    validate(fields) {
      let data = validateSignIn(fields);
      this.data = data;
    },
  },

  components: { MyForm },
};
</script>

<template>
  <MyForm
    :inputs="inputs"
    page-header="התחבר!"
    content="כאן אתה יכול להתחבר לחשבונך"
    :btnText="btnText"
    :is-login="true"
    :validate="data"
    @set-data="validate($event)"
  ></MyForm>
</template>
