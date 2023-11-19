<template>
  <div class="px-5 py-24 flex flex-col md:px-0 md:items-center">
    <div class="h-full w-full lg:w-[984px]">
      <div class="flex items-center text-lg">
        <NuxtLink
          class="flex items-center text-red-500 border-transparent border-2 p-3 rounded-xl transition duration-300 ease-in-out hover:text-red-300 hover:border-red-300"
          :to="`/animes/${anime_id}`"
        >
          <font-awesome-icon :icon="'fa-arrow-left'" />
        </NuxtLink>
      </div>
      <TransitionGroup name="episodes">
        <div v-if="episodes.length > 0" class="mt-10 flex flex-col gap-3">
          <div v-for="episode in episodes">
            <div
              class="bg-zinc-950 bg-gradient-to-r from-zinc-950 from-10% via-zinc-950 hover:to-red-500 to-100%"
            >
              <a
                :href="episode.url"
                target="_blank"
                class="flex gap-5 py-2 px-5"
              >
                <div class="text-red-500 w-10">
                  <div class="flex items-center justify-center h-full">
                    <span class="px-2 text-xl font-bold">{{
                      episode.mal_id
                    }}</span>
                  </div>
                </div>
                <div class="flex flex-col">
                  <h1>{{ episode.title }}</h1>
                  <h2 class="text-zinc-400">{{ episode.title_japanese }}</h2>
                </div>
              </a>
            </div>
          </div>
        </div>
      </TransitionGroup>
      <div v-if="episodes.length < 1">
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
        v-if="
          episodes.length > 0 &&
          !loading &&
          episodes_pagination.last_visible_page > 1
        "
        class="text-center"
      >
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="episodes_page"
                  class="my-4"
                  :length="episodes_pagination.last_visible_page"
                  @click="loadAnimeEpisodes"
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
import { TransitionGroup } from "vue";

export default {
  components: {
    TransitionGroup,
  },
  data() {
    return {
      anime_id: "",
      episodes: [],
      episodes_pagination: [],
      episodes_page: 1,
      loading: false,
    };
  },
  mounted() {
    const { id } = useRoute().params;
    this.anime_id = id;
    this.loadAnimeEpisodes(id);
  },
  methods: {
    async loadAnimeEpisodes(id) {
      const data = await $fetch(
        `https://api.jikan.moe/v4/anime/${this.anime_id}/episodes?page=${this.episodes_page}`
      );
      this.episodes = data.data;
      this.episodes_pagination = data.pagination;
    },
  },
};
</script>

<style>
.episodes-enter-active {
  transition: all 0.4s ease-out;
}

.episodes-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.episodes-enter-from,
.episodes-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
