<template>
  <div class="mb-3">
    <label :for="name" class="form-label">{{ label }}</label>
    <textarea
      v-model="model"
      class="form-control"
      :name="name"
      rows="3"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: ["name", "model", "label"],
};
</script>