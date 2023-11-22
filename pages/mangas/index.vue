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

      <form @submit.prevent="loadMangas" class="mt-10 flex flex-col gap-5">
        <div class="flex gap-5 w-full">
          <v-text-field
            v-model="filter.search"
            class="w-full"
            label="Pesquise por um mangá..."
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
        v-if="manga?.length > 0 && !loading"
      >
        Encontrados
        <span class="font-bold">{{ formatSearch(manga_total.total) }}</span>
        mangás em
        <span class="font-bold">{{
          formatSearch(manga_pagination.last_visible_page)
        }}</span>
        <span v-if="manga_pagination?.last_visible_page == 1"> página.</span>
        <span v-else> páginas.</span>
      </div>
      <div
        v-else-if="manga.length < 1 && !loading"
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
        <div v-for="mangas in manga">
          <MangasMangaCard
            :id="mangas.mal_id"
            :score="mangas.score"
            :scored_by="mangas.scored_by"
            :chapter="mangas.chapters"
            :volume="mangas.volumes"
            :image="mangas.images.jpg.large_image_url"
            :title="mangas.title"
            :title_japanese="mangas.title_japanese"
            :genre="mangas.genres"
            :synopsis="mangas.synopsis"
          />
        </div>
      </div>
      <div
        v-if="
          manga?.length > 0 && !loading && manga_pagination?.last_visible_page > 1
        "
        class="text-center"
      >
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="manga_page"
                  class="my-4"
                  :length="manga_pagination.last_visible_page"
                  @click="loadMangas"
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
        genre: null,
        producer: null,
      },
      filter_old: {
        search: "",
        type: null,
        status: null,
        genre: null,
        producer: null,
      },
      type_options: [
        {
          title: "Todos",
          value: null,
        },
        {
          title: "Manga",
          value: "&type=manga",
        },
        {
          title: "Novel",
          value: "&type=novel",
        },
        {
          title: "Light novel",
          value: "&type=lightnovel",
        },
        {
          title: "One-shot",
          value: "&type=oneshot",
        },
        {
          title: "Doujin",
          value: "&type=doujin",
        },
        {
          title: "Manhwa",
          value: "&type=manhwa",
        },
        {
          title: "Manhua",
          value: "&type=manhua",
        },
      ],
      status_options: [
        {
          title: "Todos",
          value: null,
        },
        {
          title: "Publishing",
          value: "&status=publishing",
        },
        {
          title: "Complete",
          value: "&status=complete",
        },
        {
          title: "Hiatus",
          value: "&status=hiatus",
        },
        {
          title: "Discontinued",
          value: "&status=discontinued",
        },
        {
          title: "Upcoming",
          value: "&status=upcoming",
        },
      ],
      genre_options: [],
      genre: [],
      manga: [],
      manga_pagination: [],
      manga_total: 0,
      manga_page: 1,
    };
  },
  async mounted() {
    this.loading = true;

    const manga_data = await $fetch(
      `https://api.jikan.moe/v4/manga?page=${this.manga_page}&limit=24&q=`
    );
    const genre_data = await $fetch("https://api.jikan.moe/v4/genres/manga");

    this.manga = manga_data.data;
    this.manga_pagination = manga_data.pagination;
    this.manga_total = this.manga_pagination.items;
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
    formatSearch(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
    },
    async loadMangas() {
      this.loading = true;

      const filters = [
        this.filter.search,
        this.filter.type,
        this.filter.status,
        this.filter.genre,
      ];

      const filters_old = [
        this.filter_old.search,
        this.filter_old.type,
        this.filter_old.status,
        this.filter_old.genre,
      ];

      if (JSON.stringify(filters_old) !== JSON.stringify(filters)) {
        this.filter_old.search = filters[0];
        this.filter_old.type = filters[1];
        this.filter_old.status = filters[2];
        this.filter_old.genre = filters[3];

        this.manga_page = 1;
      }
      let mangaUrl = `https://api.jikan.moe/v4/manga?page=${this.manga_page}&limit=24&q=`;

      for (let i = 0; i < filters.length; i++) {
        if (filters[i] != null) {
          mangaUrl = mangaUrl + filters[i];
        }
      }

      const data = await $fetch(mangaUrl);
      this.manga = data.data;
      this.manga_pagination = data.pagination;
      this.manga_total = this.manga_pagination.items;

      this.loading = false;
    },
  },
};
</script>
