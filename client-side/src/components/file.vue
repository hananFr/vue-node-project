<template>
  <div class="mb-3">
    <label for="image" class="form-label">הוסף תמונה</label>
    <input @change="setFile" type="file" name="name" />
    <div>
      <img
        class="mx-auto"
        id="id_img"
        :width="(200 * screenWidth) / 1250 + 'px'"
        :height="(200 * screenWidth) / 1250 + 'px'"
        :src="imageSrc"
        alt="img_uploaded"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "screenWidth"],
  data() {
    return {
      imageSrc: "",
    };
  },
  methods: {
    setFile(event) {
      this.$emit("set-file", event.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },
  },
};
</script>

<style scoped>
img {
  overflow: scroll;
  display: contents;
  flex-wrap: wrap;
}
</style>