<template>
  <my-form
    request="put"
    :url="url"
    @set-data="validate($event)"
    :validate="data"
    pageHeader="ערוך את הסיור"
    :inputs="inputs"
    :texts="texts"
    :files="files"
    :selects="selects"
    :isLogin="false"
    :model="model"
    :dates="dates"
    btn-text="צור סיור"
  ></my-form>
</template>

<script>
import { URL } from "@/services/config";
import myForm from "@/components/MyForm.vue";
import { CardValid } from "@/services/validateCard";
import httpServices from "@/services/httpServices";

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
      url: `${URL}/cards/${this.$route.params.id}`,
      model: {},
      data: {},
      id: this.$route.params.id,
    };
  },
  methods: {
    setModel() {
      httpServices
        .get(`${URL}/cards/${this.id}`)
        .then((res) => {
          const data = res.data;
          let keyToDelete = ["_id", "user_id", "travelNumber"];
          for (let key of keyToDelete) delete data[key];
          data.travelDate = new Date(data.travelDate);
          this.model = data;
        })
        .catch((err) => console.log(err));
    },

    validate(data) {
      this.data = CardValid(Object.assign({}, data));
    },
  },
  mounted() {
    this.setModel();
  },
};
</script>
