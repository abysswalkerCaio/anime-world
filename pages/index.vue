<template>
  <main class="px-5 py-16 flex flex-col md:px-0 md:items-center">
    <Head>
      <Title>{{ title }}</Title>
    </Head>
    <div class="h-full w-full lg:w-[984px]">
      <div
        class="flex-none h-auto w-full flex items-center justify-center text-4xl font-bold"
      >
        <img src="../img/anime-world-full.png" alt="Anime World banner" />
      </div>

      <!-- Top Season Now -->
      <div class="mt-12">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TEMPORADA ATUAL</h1>
          <NuxtLink
            to="/seasons"
            class="font-semibold text-sm md:text-base transition ease-in-out duration-300 hover:text-red-500"
            >TEMPORADAS
            <font-awesome-icon :icon="'arrow-right'"></font-awesome-icon>
          </NuxtLink>
        </div>
        <div v-if="season_now?.length < 1">
          <div
            class="mt-5 flex flex-col gap-5 justify-center items-center w-full bg-clip-text text-4xl font-bold pb-4"
          >
            <font-awesome-icon
              class="text-red-500 fa-spin"
              :icon="'spinner'"
            ></font-awesome-icon>
          </div>
        </div>
        <div
          v-else
          class="mt-5 grid gap-5 grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3"
        >
          <div v-for="animes in season_now">
            <AnimesAnimeCard
              :id="animes.mal_id"
              :score="animes.score"
              :scored_by="animes.scored_by"
              :episode="animes.episodes"
              :duration="animes.duration"
              :image="animes.images.jpg.large_image_url"
              :title="animes.title"
              :title_japanese="animes.title_japanese"
              :genre="animes.genres"
              :synopsis="animes.synopsis"
            />
          </div>
        </div>
      </div>
      <!-- Fim Season Now -->

      <!-- Top Animes -->
      <div class="mt-12">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TOP ANIMES</h1>
          <NuxtLink
            to="/animes"
            class="font-semibold text-sm md:text-base transition ease-in-out duration-300 hover:text-red-500"
            >ANIMES
            <font-awesome-icon :icon="'arrow-right'"></font-awesome-icon>
          </NuxtLink>
        </div>
        <div v-if="top_anime?.length < 1">
          <div
            class="mt-5 flex flex-col gap-5 justify-center items-center w-full bg-clip-text text-4xl font-bold pb-4"
          >
            <font-awesome-icon
              class="text-red-500 fa-spin"
              :icon="'spinner'"
            ></font-awesome-icon>
          </div>
        </div>
        <div
          v-else
          class="mt-5 grid gap-5 grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3"
        >
          <div v-for="animes in top_anime">
            <AnimesAnimeCard
              :id="animes.mal_id"
              :score="animes.score"
              :scored_by="animes.scored_by"
              :episode="animes.episodes"
              :duration="animes.duration"
              :image="animes.images.jpg.large_image_url"
              :title="animes.title"
              :title_japanese="animes.title_japanese"
              :genre="animes.genres"
              :synopsis="animes.synopsis"
            />
          </div>
        </div>
      </div>
      <!-- Fim Top Animes -->
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      title: "Anime World",
      season_now: [],
      top_anime: [],
    };
  },
  mounted() {
    this.loadSeasonNow();
    this.loadTopAnimes();
  },
  methods: {
    async loadSeasonNow() {
      const data = await $fetch(
        "https://api.jikan.moe/v4/seasons/now?limit=12"
      ).catch((error) => error.data);
      this.season_now = data.data;
    },
    async loadTopAnimes() {
      const data = await $fetch(
        "https://api.jikan.moe/v4/top/anime?limit=12"
      ).catch((error) => error.data);
      this.top_anime = data.data;
    },
  },
};
</script>
