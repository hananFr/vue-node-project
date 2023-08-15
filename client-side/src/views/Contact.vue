<template>
  <my-form
    :inputs="inputs"
    :texts="texts"
    :selects="selects"
    @set-data="validate($event)"
    :request="request"
    :url="url"
    :validate="data"
    btn-text="צור קשר"
    page-header="צור קשר"
    content="כאן תוכל להשאיר לנו הודעה ונחזור אליך בהקדם"
  ></my-form>
</template>


<script>
import myForm from "@/components/MyForm.vue";
import { URL } from "@/services/config";
import { validateMessage } from "@/services/messageValid";

export default {
  components: { myForm },
  data() {
    return {
      inputs: [
        { name: "name", key: "name", label: "שם:", type: "text" },
        { name: "email", key: "email", label: "אימייל:", type: "email" },
        { name: "phone", key: "phone", label: "טלפון:", type: "phone" },
      ],
      selects: [
        {
          key: "favoriteAccess",
          name: "favoriteAccess",
          defaultValue: "דרך פנייה מועדפת",
          options: ["דרך פנייה מועדפת", "אימייל", "טלפון"],
        },
      ],
      texts: [
        {
          key: "message",
          name: "message",
          label: "ההודעה שלך:",
        },
      ],
      data: {},
      url: `${URL}/messages/`,
      request: "post",
    };
  },
  methods: {
    validate(data) {
      const validate = validateMessage(data);
      if (typeof validate !== "string") this.data = validate;
    },
  },
};
</script>