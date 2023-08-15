<template>
  <div class="col-10 col-sm-9 col-md-7 col-lg-6 col-xl-5 mx-auto">
    <div class="form-group">
      <label for="commits"> הוסף תגובה</label>
      <textarea name="commits" class="form-control" v-model="data.content">
      </textarea>
    </div>
    <div class="d-flex">
        <button @click="onSubmit" class="mx-auto">שלח</button>
    </div>
  </div>
  <alert :screenWidth="screenWidth" v-if="openAlert" header="הוספת תגובה" content="התגובה נוספה בהצלחה" replace="/#/manage-commits"></alert>
</template>

<script>
import { URL } from "@/services/config";
import httpServices from '@/services/httpServices';
import Alert from '@/components/Alert.vue';
export default {
  components: { Alert },
  props: ['screenWidth','alertContent', 'alertHeader'],
  data() {
    return {
      data: {
        content: "",
      },
      url: `${URL}/commits/`,
      openAlert: false
    };
  },
  methods: {
    onSubmit(){
        if(this.data.content){
        httpServices.post(this.url, this.data).then(
         this.openAlert = true   
        ).catch((err) => console.error(err))
        }
    }
  }
};
</script>