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

      <form @submit.prevent="loadCharacters" class="mt-10 flex flex-col gap-5">
        <div class="flex gap-5 w-full">
          <v-text-field
            v-model="filter.search"
            class="w-full"
            label="Pesquise por um personagem..."
            variant="filled"
          />
          <button
            type="submit"
            class="bg-zinc-800 h-14 transition ease-in-out duration-300 hover:text-red-500 hover:bg-zinc-950 text-lg w-16 rounded-lg"
          >
            <font-awesome-icon :icon="'fa-search'" />
          </button>
        </div>
      </form>
      <div
        class="mt-5 mb-10 text-center md:text-lg"
        v-if="character.length > 0 && !loading"
      >
        Encontrados
        <span class="font-bold">{{ formatSearch(character_total.total) }}</span>
        personagens em
        <span class="font-bold">{{
          formatSearch(character_pagination.last_visible_page)
        }}</span>
        <span v-if="character_pagination.last_visible_page == 1"> página.</span>
        <span v-else> páginas.</span>
      </div>
      <div
        v-else-if="character.length < 1 && !loading"
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
        <div v-for="characters in character">
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
      <div
        v-if="
          character.length > 0 &&
          !loading &&
          character_pagination.last_visible_page > 1
        "
        class="text-center"
      >
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="character_page"
                  class="my-4"
                  :length="character_pagination.last_visible_page"
                  @click="loadCharacters"
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
      },
      filter_old: {
        search: "",
      },
      character: [],
      character_pagination: [],
      character_total: 0,
      character_page: 1,
    };
  },
  async mounted() {
    this.loading = true;

    const character_data = await $fetch(
      `https://api.jikan.moe/v4/characters?page=${this.character_page}&limit=24&q=`
    );

    this.character = character_data.data;
    this.character_pagination = character_data.pagination;
    this.character_total = this.character_pagination.items;

    this.loading = false;
  },
  methods: {
    formatSearch(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
    },
    async loadCharacters() {
      this.loading = true;
      const filters = [this.filter.search];
      const filters_old = [this.filter_old.search];

      if (JSON.stringify(filters_old) !== JSON.stringify(filters)) {
        this.filter_old.search = filters[0];
        this.character_page = 1;
      }

      let characterUrl = `https://api.jikan.moe/v4/characters?page=${this.character_page}&limit=24&q=`;

      for (let i = 0; i < filters.length; i++) {
        if (filters[i] != null) {
          characterUrl = characterUrl + filters[i];
        }
      }

      const data = await $fetch(characterUrl);
      this.character = data.data;
      this.character_pagination = data.pagination;
      this.character_total = this.character_pagination.items;

      this.loading = false;
    },
  },
};
</script>
