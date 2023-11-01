<template>
  <main class="px-5 py-16 flex flex-col md:px-0 md:items-center">
    <div class="h-full w-full md:flex-none md:w-[728px] lg:w-[984px]">
      <div
        class="bg-red-500 h-96 w-full flex items-center justify-center text-5xl font-bold"
      ></div>
      <div class="mt-5">
        <div
          class="flex items-center justify-between w-full h-10 border-l-4 border-red-500"
        >
          <h1 class="ml-2 text-xl font-bold">TOP ANIMES</h1>
          <div class="cursor-pointer">
            <NuxtLink class="font-semibold"
              >VER TODOS
              <font-awesome-icon
                class="text-sm"
                :icon="'arrow-right'"
              ></font-awesome-icon>
            </NuxtLink>
          </div>
        </div>
        <div
          class="mt-5 grid gap-4 grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3"
        >
          <div v-for="animes in top_anime">
            <AnimeCard
              :image="animes.images.jpg.large_image_url"
              :title="animes.title_english"
              :status="animes.status"
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
