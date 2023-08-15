<template>
  <div class="justify-content-center mx-auto">
    <button class="btn btn-warning mx-1 my-1" @click="toggle(true)">
      בחר תאריך
    </button>
    <button class="btn btn-warning mx-0 my-1" @click="toggle(false)">
      בטל
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    toggle(value) {
      this.$emit("toggle", value);
    },
  },
};
</script>
