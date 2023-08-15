<template>
  <my-form
    request="post"
    :url="url"
    @set-data="validate($event)"
    :validate="data"
    pageHeader="צור טיול חדש"
    :inputs="inputs"
    :texts="texts"
    :files="files"
    :selects="selects"
    :isLogin="false"
    :dates="dates"
    btn-text="צור סיור"
  ></my-form>
</template>

<script>
import { URL } from "@/services/config";
import myForm from "@/components/MyForm.vue";
import { CardValid } from "@/services/validateCard";

export default {
  components: { myForm },
  data() {
    return {
      inputs: [
        {
          name: "travelName",
          label: "שם הטיול",
          type: "text",
          key: "travelName",
        },
        {
          name: "headerContext",
          label: "כותרת משנה",
          type: "text",
          key: "headerContext",
        },

        {
          name: "travelAddress",
          label: "מקום מפגש",
          type: "text",
          key: "travelAddress",
        },
      ],
      selects: [
        {
          key: "travelCategory",
          name: "travelCategory",
          defaultValue: "בחר קטגוריה",
          options: ["בחר קטגוריה", "זוגות", "משפחות", "בתי ספר", "קבוצות"],
        },
      ],
      texts: [
        {
          name: "travelDescription",
          key: "travelDescription",
          label: "תיאור הטיול",
        },
      ],
      files: [{ name: "travelImage", key: "travelImage" }],
      dates: [{ date: new Date(), defaultName: "def1", key: "travelDate" }],
      url: `${URL}/cards/uploads`,
      data: {},
    };
  },
  methods: {
    validate(data) {
      this.data = CardValid(Object.assign({}, data));
    },
  },
};
</script>
