<template>
  <main class="py-20 px-5">
    <h1>Animes</h1>
    <span v-if="top_anime.length < 1" class="opacity-70"
      >Carregando informações...</span
    >
    <div v-for="animes in top_anime">
      <span class="opacity-70">{{ animes.title_english }}</span>
    </div>
    <h1 class="mt-5">Mangás</h1>
    <span v-if="top_manga.length < 1" class="opacity-70"
      >Carregando informações...</span
    >
    <div v-for="mangas in top_manga">
      <span class="opacity-70">{{ mangas.title_english }}</span>
    </div>
    <h1 class="mt-5">Personagens</h1>
    <span v-if="top_character.length < 1" class="opacity-70"
      >Carregando informações...</span
    >
    <div v-for="characters in top_character">
      <span class="opacity-70">{{ characters.name }}</span>
    </div>
    <h1 class="mt-5">Pessoas</h1>
    <span v-if="top_people.length < 1" class="opacity-70"
      >Carregando informações...</span
    >
    <div v-for="people in top_people">
      <span class="opacity-70">{{ people.name }}</span>
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
