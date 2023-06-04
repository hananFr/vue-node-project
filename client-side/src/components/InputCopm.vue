<template>
  <div :id="id" class="form-group">
    <label :for="name" class="form-label">{{ label }}</label>
    <input
      v-model="input"
      :type="type"
      class="form-control"
      :name="name"
      @change="setInput"
    />
  </div>
</template>

<script>
export default {
  props: ["name", "type", "label", "model", "id"],
  data() {
    return {
      input: "",
    };
  },
  methods: {
    setInput() {
      this.$emit("set-value", this.input);
    },
  },
  watch: {
    model(value) {
      this.input = value;
    },
  },
};
</script>