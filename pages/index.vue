<template>
  <main class="px-5 py-16 flex flex-col md:px-0 md:items-center">
    <div class="h-full w-full lg:w-[984px]">
      <div
        class="flex-none object-cover h-auto w-full flex items-center justify-center text-5xl font-bold"
      >
        <img src="../img/anime-world-banner.png" />
      </div>

      <!-- Top Animes -->
      <div class="mt-10">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TOP ANIMES</h1>
          <NuxtLink
            to="/animes"
            class="font-semibold transition ease-in-out duration-300 hover:text-red-500"
            >VER TODOS
            <font-awesome-icon
              class="text-xs md:text-sm"
              :icon="'arrow-right'"
            ></font-awesome-icon>
          </NuxtLink>
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
          class="mt-5 grid gap-5 grid-cols-1 min-[475px]:grid-cols-2 md:grid-cols-3"
        >
          <div v-for="animes in top_anime.slice(0, 6)">
            <AnimesAnimeCard
              :id="animes.mal_id"
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
      <div class="mt-10">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TOP MANGÁS</h1>
          <NuxtLink
            to="/mangas"
            class="font-semibold transition ease-in-out duration-300 hover:text-red-500"
            >VER TODOS
            <font-awesome-icon
              class="text-xs md:text-sm"
              :icon="'arrow-right'"
            ></font-awesome-icon>
          </NuxtLink>
        </div>
        <div v-if="top_manga.length < 1">
          <div
            class="mt-5 flex flex-col gap-5 justify-center items-center w-full bg-clip-text text-2xl md:text-5xl font-bold bg-gradient-to-r from-red-500 from-50% to-slate-200 to-100% pb-4"
          >
            <h1 class="text-transparent">Buscando maravilhas...</h1>
            <font-awesome-icon
              class="text-red-500 fa-spin"
              :icon="'spinner'"
            ></font-awesome-icon>
          </div>
        </div>
        <div
          v-else
          class="mt-5 grid gap-5 grid-cols-1 min-[475px]:grid-cols-2 md:grid-cols-3"
        >
          <div v-for="mangas in top_manga.slice(0, 6)">
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
      <div class="mt-10">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TOP PERSONAGENS</h1>
          <NuxtLink
            to="/characters"
            class="font-semibold transition ease-in-out duration-300 hover:text-red-500"
            >VER TODOS
            <font-awesome-icon
              class="text-xs md:text-sm"
              :icon="'arrow-right'"
            ></font-awesome-icon>
          </NuxtLink>
        </div>
        <div v-if="top_character.length < 1">
          <div
            class="mt-5 flex flex-col gap-5 justify-center items-center w-full bg-clip-text text-2xl md:text-5xl font-bold bg-gradient-to-r from-red-500 from-50% to-slate-200 to-100% pb-4"
          >
            <h1 class="text-transparent">Desbravando lendas...</h1>
            <font-awesome-icon
              class="text-red-500 fa-spin"
              :icon="'spinner'"
            ></font-awesome-icon>
          </div>
        </div>
        <div
          v-else
          class="mt-5 grid gap-5 grid-cols-1 min-[475px]:grid-cols-2 md:grid-cols-3"
        >
          <div v-for="characters in top_character.slice(0, 6)">
            <CharactersCharacterCard
              :id="characters.mal_id"
              :image="characters.images.jpg.image_url"
              :name="characters.name"
              :name_kanji="characters.name_kanji"
              :nickname="characters.nicknames"
              :about="characters.about"
            />
          </div>
        </div>
      </div>
      <!-- Fim Top Personagens -->

      <!-- Top Artistas -->
      <div class="mt-10">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 md:text-xl font-bold">TOP ARTISTAS</h1>
          <NuxtLink
            to="/people"
            class="font-semibold transition ease-in-out duration-300 hover:text-red-500"
            >VER TODOS
            <font-awesome-icon
              class="text-xs md:text-sm"
              :icon="'arrow-right'"
            ></font-awesome-icon>
          </NuxtLink>
        </div>
        <div v-if="top_people.length < 1">
          <div
            class="mt-5 flex flex-col gap-5 justify-center items-center w-full bg-clip-text text-2xl md:text-5xl font-bold bg-gradient-to-r from-red-500 from-50% to-slate-200 to-100% pb-4"
          >
            <h1 class="text-transparent">Artistas? Só um segundo...</h1>
            <font-awesome-icon
              class="text-red-500 fa-spin"
              :icon="'spinner'"
            ></font-awesome-icon>
          </div>
        </div>
        <div
          v-else
          class="mt-5 grid gap-5 grid-cols-1 min-[475px]:grid-cols-2 md:grid-cols-3"
        >
          <div v-for="people in top_people.slice(0, 6)">
            <PeopleCard
              :id="people.mal_id"
              :image="people.images.jpg.image_url"
              :name="people.name"
              :given_name="people.given_name"
              :alternate_name="people.alternate_names"
              :about="people.about"
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
