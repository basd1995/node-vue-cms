<template>
  <button @click="save">{{buttonName}}</button>
</template>
<script>
export default {
  data() {
    return {
      buttonName: "按钮",
      model: {
        name: "caosong"
      }
    };
  },
  methods: {
    async save() {
      const res = await this.$http.post("categories", this.model);
      console.log(res);
    }
  }
};
</script>
