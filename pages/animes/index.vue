<template>
  <div class="px-5 py-24 flex flex-col md:px-0 md:items-center">
    <div class="h-full w-full lg:w-[984px]">
      <div class="flex items-center text-lg">
        <NuxtLink
          class="flex items-center text-red-500 border-transparent border-2 p-3 rounded-xl transition duration-300 ease-in-out hover:text-red-300 hover:border-red-300"
          to="/"
        >
          <font-awesome-icon :icon="'fa-arrow-left'" />
        </NuxtLink>
      </div>

      <form @submit.prevent="loadAnimes" class="mt-10 flex flex-col gap-5">
        <div class="flex gap-5 w-full">
          <v-text-field
            v-model="filter.search"
            class="w-full"
            label="Pesquise por um anime..."
            variant="filled"
          />
          <button
            type="submit"
            class="bg-zinc-800 h-14 transition ease-in-out duration-300 hover:text-red-500 hover:bg-zinc-950 text-lg w-16 rounded-lg"
          >
            <font-awesome-icon :icon="'fa-search'" />
          </button>
        </div>
        <div class="flex flex-col w-full gap-2">
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
              v-model="filter.genre"
              :items="genre_options"
              label="Selecione um gênero..."
              variant="solo"
              :clearable="true"
            >
            </v-select>
          </div>
        </div>
      </form>
      <div
        class="mt-5 mb-10 text-center md:text-lg"
        v-if="anime.length > 0 && !loading"
      >
        <span class="font-bold">{{ anime_total.total }}</span> animes em
        <span class="font-bold">{{ anime_pagination.last_visible_page }}</span>
        <span v-if="anime_pagination.last_visible_page == 1"> página.</span>
        <span v-else> páginas.</span>
      </div>
      <div
        v-else-if="anime.length < 1 && !loading"
        class="mt-5 mb-10 text-center md:text-lg"
      >
        Nenhum resultado encontrado.
      </div>
      <div class="mt-5" v-if="loading">
        <div
          class="flex flex-col gap-5 justify-center items-center w-full text-4xl font-bold"
        >
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
        <div v-for="animes in anime">
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
      <div
        v-if="
          anime.length > 0 && !loading && anime_pagination.last_visible_page > 1
        "
        class="text-center"
      >
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
      loading: true,
      filter: {
        search: "",
        type: null,
        status: null,
        rating: null,
        genre: null,
        producer: null,
      },
      filter_old: {
        search: "",
        type: null,
        status: null,
        rating: null,
        genre: null,
        producer: null,
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
      genre_options: [],
      genre: [],
      anime: [],
      anime_pagination: [],
      anime_total: 0,
      anime_page: 1,
    };
  },
  async mounted() {
    this.loading = true;

    const anime_data = await $fetch(
      `https://api.jikan.moe/v4/anime?page=${this.anime_page}&limit=24&q=`
    );
    const genre_data = await $fetch("https://api.jikan.moe/v4/genres/anime");

    this.anime = anime_data.data;
    this.anime_pagination = anime_data.pagination;
    this.anime_total = this.anime_pagination.items;
    this.genre = genre_data.data;

    this.genre_options = this.genre.map((item) => {
      return {
        title: item.name,
        value: "&genres=" + item.mal_id,
      };
    });

    this.loading = false;
  },
  methods: {
    async loadAnimes() {
      this.loading = true;

      const filters = [
        this.filter.search,
        this.filter.type,
        this.filter.status,
        this.filter.rating,
        this.filter.genre,
      ];

      const filters_old = [
        this.filter_old.search,
        this.filter_old.type,
        this.filter_old.status,
        this.filter_old.rating,
        this.filter_old.genre,
      ];

      if (JSON.stringify(filters_old) !== JSON.stringify(filters)) {
        this.filter_old.search = filters[0];
        this.filter_old.type = filters[1];
        this.filter_old.status = filters[2];
        this.filter_old.rating = filters[3];
        this.filter_old.genre = filters[4];

        this.anime_page = 1;
      }
      let animeUrl = `https://api.jikan.moe/v4/anime?page=${this.anime_page}&limit=24&q=`;

      for (let i = 0; i < filters.length; i++) {
        if (filters[i] != null) {
          animeUrl = animeUrl + filters[i];
        }
      }

      const data = await $fetch(animeUrl);
      this.anime = data.data;
      this.anime_pagination = data.pagination;
      this.anime_total = this.anime_pagination.items;

      this.loading = false;
    },
  },
};
</script>
