<template>
  <div>Promotions</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
  name: "Promotions",
  mounted() {
    this.fetchPromotions();
  },
  computed: {
    ...mapGetters({ allPromotions: 'allPromotions' }),
  },
  methods: {
    ...mapActions({ fetchPromotions: "fetchPromotions" }),
  }
};

</script>

<style scoped></style>
