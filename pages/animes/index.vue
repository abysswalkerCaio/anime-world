<template>
  <div class="px-5 py-32 flex flex-col md:px-0 md:items-center">
    <div class="h-full w-full lg:w-[984px]">
      <form
        @submit.prevent="loadAnimes"
        class="flex flex-col gap-5 items-center"
      >
        <div class="flex w-full shadow-lg shadow-red-900/50 h-16">
          <input
            class="w-full h-full px-5 bg-zinc-800 focus:outline-none rounded-l-lg"
            type="search"
            id="title"
            name="title"
            autocomplete="off"
            placeholder="Procure por um anime..."
            v-model="search"
          />
          <button
            type="submit"
            class="bg-zinc-800 transition ease-in-out duration-300 hover:text-red-500 hover:bg-zinc-950 text-lg h-full w-16 rounded-r-lg"
          >
            <font-awesome-icon :icon="'fa-search'" />
          </button>
        </div>
        <div class="flex flex-col w-full h-16 gap-2">
          <div class="flex gap-3">
            <v-select
              v-model="filter.type"
              :items="type_options"
              label="Selecione um tipo..."
              variant="solo"
            >
            </v-select>
            <v-select
              v-model="filter.status"
              :items="status_options"
              label="Selecione um status..."
              variant="solo"
            >
            </v-select>
          </div>
          <div class="flex gap-3">
            <v-select
              v-model="filter.rating"
              :items="rating_options"
              label="Selecione uma faixa etária..."
              variant="solo"
            >
            </v-select>
            <v-select
              v-model="filter.sfw"
              :items="sfw_options"
              label="Selecione uma classificação..."
              variant="solo"
            >
            </v-select>
          </div>
        </div>
      </form>
      <!-- Aqui -->
      <div
        class="mt-48 grid gap-5 grid-cols-1 min-[460px]:grid-cols-2 md:grid-cols-3"
      >
        <div v-for="animes in anime">
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
      <div v-if="anime.length > 0" class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="anime_page"
                  class="my-4"
                  :length="anime_pagination.last_visible_page"
                  @click="loadAnimes"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      filter: {
        type: null,
        status: null,
        rating: null,
        sfw: null,
        genre: null,
      },
      type_options: [
        {
          title: "Todos",
          value: null,
        },
        {
          title: "TV",
          value: "&type=tv",
        },
        {
          title: "Movie",
          value: "&type=movie",
        },
        {
          title: "OVA",
          value: "&type=ova",
        },
        {
          title: "Special",
          value: "&type=special",
        },
        {
          title: "Music",
          value: "&type=music",
        },
      ],
      status_options: [
        {
          title: "Todos",
          value: null,
        },
        {
          title: "Airing",
          value: "&status=airing",
        },
        {
          title: "Complete",
          value: "&status=complete",
        },
        {
          title: "Upcoming",
          value: "&status=upcoming",
        },
      ],
      rating_options: [
        {
          title: "Todos",
          value: null,
        },
        {
          title: "All Ages",
          value: "&rating=g",
        },
        {
          title: "Children",
          value: "&rating=pg",
        },
        {
          title: "Teens 13 or Older",
          value: "&rating=pg13",
        },
        {
          title: "17+ (Violence or Profanity)",
          value: "&rating=r17",
        },
        {
          title: "Mild Nudity",
          value: "&rating=r",
        },
        {
          title: "Hentai",
          value: "&rating=rx",
        },
      ],
      sfw_options: [
        {
          title: "SFW e NSFW",
          value: null,
        },
        {
          title: "Somente SFW",
          value: "&sfw=true",
        },
      ],
      genre: [],
      anime: [],
      anime_pagination: [],
      anime_total: 0,
      anime_page: 1,
    };
  },
  async mounted() {
    const anime_data = await $fetch(
      `https://api.jikan.moe/v4/anime?page=${this.anime_page}&limit=24`
    );
    const genre_data = await $fetch("https://api.jikan.moe/v4/genres/anime");

    this.anime = anime_data.data;
    this.anime_pagination = anime_data.pagination;
    this.genre = genre_data.data;
  },
  methods: {
    async loadAnimes() {
      const filters = [
        this.filter.type,
        this.filter.status,
        this.filter.rating,
        this.filter.sfw,
        this.filter.genre,
      ];

      let animeUrl = `https://api.jikan.moe/v4/anime?page=${this.anime_page}&limit=24&q=${this.search}`;

      for (let i = 0; i < filters.length; i++) {
        if (filters[i] != null) {
          animeUrl = animeUrl + filters[i];
        }
      }

      const data = await $fetch(animeUrl);
      this.anime = data.data;
      this.anime_pagination = data.pagination;
    },
  },
};
</script>
