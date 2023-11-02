<template>
  <main class="px-5 py-16 flex flex-col md:px-0 md:items-center">
    <div class="h-full w-full md:flex-none md:w-[728px] lg:w-[984px]">
      <div
        class="bg-red-500 flex-none object-cover h-auto w-full flex items-center justify-center text-5xl font-bold"
      >
        <img src="../img/Anime World Banner.png" />
      </div>
      <div class="mt-5">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TOP ANIMES</h1>
          <div class="cursor-pointer">
            <NuxtLink class="font-semibold"
              >VER TODOS
              <font-awesome-icon
                class="text-xs md:text-sm"
                :icon="'arrow-right'"
              ></font-awesome-icon>
            </NuxtLink>
          </div>
        </div>
        <div v-if="top_anime.length < 1">
          <div
            class="mt-5 flex flex-col gap-5 justify-center items-center w-full bg-clip-text text-2xl md:text-5xl font-bold bg-gradient-to-r from-red-500 from-50% to-slate-200 to-100% pb-4"
          >
            <h1 class="text-transparent">Explorando mundos...</h1>
            <font-awesome-icon
              class="text-red-500 fa-spin"
              :icon="'spinner'"
            ></font-awesome-icon>
          </div>
        </div>
        <div
          v-else
          class="mt-5 grid gap-5 grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3"
        >
          <div v-for="animes in top_anime">
            <AnimeCard
              :id="animes.mal_id"
              :image="animes.images.jpg.large_image_url"
              :title="animes.title_english"
              :genre="animes.genres"
              :synopsis="animes.synopsis"
            />
          </div>
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
  created() {
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
