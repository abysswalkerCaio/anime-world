<template>
  <div class="px-5 py-20">
    <!-- Mal_ID/Small Image/Title/Type/Source/Episodes/Status/Rating/Score/Rank/Popularity/Members/Favorites/ -->
    <h1>Título</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anime: [],
    };
  },
  mounted() {
    this.loadTopAnimes();
  },
  methods: {
    async loadTopAnimes() {
      const data = await $fetch("https://api.jikan.moe/v4/anime").catch(
        (error) => error.data
      );
    },
  },
};
</script>
