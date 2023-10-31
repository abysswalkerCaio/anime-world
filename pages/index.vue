<template>
  <main class="py-16 px-20">
    <Carousel />
    <div class="flex flex-col">
      <h1 class="mt-5">Animes</h1>
      <div class="flex flex-col">
        <span v-if="top_anime.length < 1" class="opacity-70"
          >Carregando informações...</span
        >
        <div v-for="(animes, index) in top_anime" :key="index">
          <img :src="animes.images.jpg.image_url" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      top_anime: [],
      top_manga: [],
      top_character: [],
      top_people: [],
    };
  },
  mounted() {
    this.loadTopAnimes();
    this.loadTopMangas();
    setTimeout(() => {
      this.loadTopCharacters();
      this.loadTopPeople();
    }, "3000");
  },
  methods: {
    async loadTopAnimes() {
      const data = await $fetch("https://api.jikan.moe/v4/top/anime").catch(
        (error) => error.data
      );
      this.top_anime = data.data;
    },
    async loadTopMangas() {
      const data = await $fetch("https://api.jikan.moe/v4/top/manga").catch(
        (error) => error.data
      );
      this.top_manga = data.data;
    },
    async loadTopCharacters() {
      const data = await $fetch(
        "https://api.jikan.moe/v4/top/characters"
      ).catch((error) => error.data);
      this.top_character = data.data;
    },
    async loadTopPeople() {
      const data = await $fetch("https://api.jikan.moe/v4/top/people").catch(
        (error) => error.data
      );
      this.top_people = data.data;
    },
  },
};
</script>
