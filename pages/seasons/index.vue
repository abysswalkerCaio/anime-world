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

      <form @submit.prevent="loadSeaons" class="mt-10 flex flex-col gap-5">
        <div class="flex flex-col w-full gap-2">
          <div class="flex gap-3">
            <v-select
              v-model="filter.year"
              :items="year_options"
              label="Selecione um ano..."
              variant="solo"
            >
            </v-select>
            <v-select
              v-model="filter.season"
              :items="season_options"
              label="Selecione uma temporada..."
              variant="solo"
            >
            </v-select>
            <button
              type="submit"
              class="bg-zinc-800 h-14 transition ease-in-out duration-300 hover:text-red-500 hover:bg-zinc-950 text-lg w-16 rounded-lg"
            >
              <font-awesome-icon :icon="'fa-search'" />
            </button>
          </div>
        </div>
      </form>
      <div
        class="mt-5 mb-10 text-center md:text-lg"
        v-if="season?.length > 0 && !loading"
      >
        Encontrados
        <span class="font-bold">{{ formatSearch(season_total.total) }}</span>
        animes em
        <span class="font-bold">{{
          formatSearch(season_pagination.last_visible_page)
        }}</span>
        <span v-if="season_pagination?.last_visible_page == 1"> página.</span>
        <span v-else> páginas.</span>
      </div>
      <div
        v-else-if="season?.length < 1 && !loading"
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
        class="mt-5 grid gap-5 grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3"
      >
        <div v-for="animes in season">
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
          season?.length > 0 &&
          !loading &&
          season_pagination?.last_visible_page > 1
        "
        class="text-center"
      >
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="season_page"
                  class="my-4"
                  :length="season_pagination.last_visible_page"
                  @click="loadSeaons"
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
        year: null,
        season: null,
      },
      filter_old: {
        year: null,
        season: null,
      },
      year_options: [],
      season_options: [
        {
          title: "Winter",
          value: "winter",
        },
        {
          title: "Spring",
          value: "spring",
        },
        {
          title: "Summer",
          value: "summer",
        },
        {
          title: "Fall",
          value: "fall",
        },
      ],
      year: [],
      season: [],
      season_pagination: [],
      season_total: 0,
      season_page: 1,
    };
  },
  async mounted() {
    this.loading = true;

    const season_list_data = await $fetch("https://api.jikan.moe/v4/seasons");

    this.year = season_list_data.data;

    this.year_options = this.year.map((item) => {
      return {
        title: item.year,
        value: item.year,
      };
    });

    this.filter.year = this.year_options[0].value;
    this.filter.season = this.season_options[0].value;

    const season_data = await $fetch(
      `https://api.jikan.moe/v4/seasons/${this.filter.year}/${this.filter.season}?page=${this.season_page}&limit=24`
    );

    this.season = season_data.data;
    this.season_pagination = season_data.pagination;
    this.season_total = this.season_pagination.items;

    this.loading = false;
  },
  methods: {
    formatSearch(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
    },
    async loadSeaons() {
      this.loading = true;

      const filters = [this.filter.year, this.filter.season];

      const filters_old = [this.filter_old.year, this.filter_old.season];

      if (JSON.stringify(filters_old) !== JSON.stringify(filters)) {
        this.filter_old.year = filters[0];
        this.filter_old.season = filters[1];

        this.season_page = 1;
      }

      let seasonUrl = `https://api.jikan.moe/v4/seasons/${this.filter.year}/${this.filter.season}?page=${this.season_page}&limit=24`;

      const data = await $fetch(seasonUrl);
      this.season = data.data;
      this.season_pagination = data.pagination;
      this.season_total = this.season_pagination.items;

      this.loading = false;
    },
  },
};
</script>
