<template>
  <main class="px-5 py-16 flex flex-col md:px-0 md:items-center">
    <div class="h-full w-full lg:w-[984px]">
      <div
        class="flex-none h-auto w-full flex items-center justify-center text-4xl font-bold"
      >
        <img src="../img/anime-world-full.png" />
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
        <div v-if="season_now.length < 1">
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
        <div v-if="top_anime.length < 1">
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

      <!-- Top Mangás -->
      <div class="mt-12">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TOP MANGÁS</h1>
          <NuxtLink
            to="/mangas"
            class="font-semibold text-sm md:text-base transition ease-in-out duration-300 hover:text-red-500"
            >MANGÁS
            <font-awesome-icon :icon="'arrow-right'"></font-awesome-icon>
          </NuxtLink>
        </div>
        <div v-if="top_manga.length < 1">
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
          <div v-for="mangas in top_manga">
            <MangasMangaCard
              :id="mangas.mal_id"
              :image="mangas.images.jpg.large_image_url"
              :title="mangas.title"
              :title_japanese="mangas.title_japanese"
              :genre="mangas.genres"
              :synopsis="mangas.synopsis"
            />
          </div>
        </div>
      </div>
      <!-- Fim Top Mangás -->

      <!-- Top Characters -->
      <div class="mt-12">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TOP PERSONAGENS</h1>
          <NuxtLink
            to="/characters"
            class="font-semibold text-sm md:text-base transition ease-in-out duration-300 hover:text-red-500"
            >PERSONAGENS
            <font-awesome-icon :icon="'arrow-right'"></font-awesome-icon>
          </NuxtLink>
        </div>
        <div v-if="top_character.length < 1">
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
          <div v-for="characters in top_character">
            <CharactersCharacterCard
              :id="characters.mal_id"
              :image="characters.images.jpg.image_url"
              :name="characters.name"
              :name_kanji="characters.name_kanji"
              :nickname="characters.nicknames"
              :favorite="characters.favorites"
              :about="characters.about"
            />
          </div>
        </div>
      </div>
      <!-- Fim Top Personagens -->

      <!-- Top Artistas -->
      <div class="mt-12">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TOP ARTISTAS</h1>
          <NuxtLink
            to="/people"
            class="font-semibold text-sm md:text-base transition ease-in-out duration-300 hover:text-red-500"
            >ARTISTAS
            <font-awesome-icon :icon="'arrow-right'"></font-awesome-icon>
          </NuxtLink>
        </div>
        <div v-if="top_people.length < 1">
          <div
            class="mt-5 flex flex-col gap-5 justify-center items-center w-full bg-clip-text text-4xl pb-4"
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
          <div v-for="people in top_people">
            <PeopleCard
              :id="people.mal_id"
              :image="people.images.jpg.image_url"
              :name="people.name"
              :given_name="people.given_name"
              :alternate_name="people.alternate_names"
              :favorite="people.favorites"
              :about="people.about"
            />
          </div>
        </div>
      </div>
      <!-- Fim Top Artistas -->

      <!-- Top Artistas -->
      <div class="mt-12">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">ESTÚDIOS</h1>
          <NuxtLink
            to="/people"
            class="font-semibold text-sm md:text-base transition ease-in-out duration-300 hover:text-red-500"
            >ESTÚDIOS
            <font-awesome-icon :icon="'arrow-right'"></font-awesome-icon>
          </NuxtLink>
        </div>
        <div v-if="producers.length < 1">
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
          <div v-for="producers in producers">
            <ProducersProducerCard
              :id="producers.mal_id"
              :image="producers.images.jpg.image_url"
              :favorite="producers.favorites"
              :count="producers.count"
              :title="producers.titles"
              :about="producers.about"
            />
          </div>
        </div>
      </div>
      <!-- Fim Top Artistas -->
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      season_now: [],
      top_anime: [],
      top_manga: [],
      top_character: [],
      top_people: [],
      producers: [],
    };
  },
  mounted() {
    this.loadSeasonNow();
    this.loadTopAnimes();
    setTimeout(() => {
      this.loadTopMangas();
      this.loadTopCharacters();
    }, "3000");
    setTimeout(() => {
      this.loadTopPeople();
      this.loadProducers();
    }, "6000");
  },
  methods: {
    async loadSeasonNow() {
      const data = await $fetch(
        "https://api.jikan.moe/v4/seasons/now?limit=6"
      ).catch((error) => error.data);
      this.season_now = data.data;
    },
    async loadTopAnimes() {
      const data = await $fetch(
        "https://api.jikan.moe/v4/top/anime?limit=6"
      ).catch((error) => error.data);
      this.top_anime = data.data;
    },
    async loadTopMangas() {
      const data = await $fetch(
        "https://api.jikan.moe/v4/top/manga?limit=6"
      ).catch((error) => error.data);
      this.top_manga = data.data;
    },
    async loadTopCharacters() {
      const data = await $fetch(
        "https://api.jikan.moe/v4/top/characters?limit=6"
      ).catch((error) => error.data);
      this.top_character = data.data;
    },
    async loadTopPeople() {
      const data = await $fetch(
        "https://api.jikan.moe/v4/top/people?limit=6"
      ).catch((error) => error.data);
      this.top_people = data.data;
    },
    async loadProducers() {
      const data = await $fetch(
        "https://api.jikan.moe/v4/producers?limit=6"
      ).catch((error) => error.data);
      this.producers = data.data;
    },
  },
};
</script>
