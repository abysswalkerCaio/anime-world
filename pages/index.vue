<template>
  <main class="py-20"></main>
</template>

<script>
export default {
  data() {
    return {
      anime: [],
    };
  },
  mounted() {
    this.loadAnimes();
  },
  methods: {
    async loadAnimes() {
      const data = await $fetch("https://api.jikan.moe/v4/anime").catch(
        (error) => error.data
      );
      this.anime = data.data;
    },
  },
};
</script>
