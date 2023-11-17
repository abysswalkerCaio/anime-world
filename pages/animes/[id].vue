<template>
  <div class="px-5 py-20 flex flex-col md:flex-row md:px-0 justify-center">
    <div
      v-for="full_anime in anime"
      class="flex flex-col gap-4 md:flex-row h-full w-full lg:w-[984px]"
    >
      <div
        class="flex flex-col flex-none gap-2 min-[510px]:flex-row md:flex-col md:w-[300px]"
      >
        <img
          class="rounded-xl object-cover w-full h-[400px] min-[400px]:h-[600px] min-[510px]:h-[425px] shadow-lg shadow-red-900/50"
          :src="full_anime.images.jpg.large_image_url"
          :alt="full_anime.title"
        />
        <div class="flex flex-col gap-2 w-full">
          <div
            class="flex gap-2 justify-around px-1 py-2 rounded-lg bg-zinc-950"
          >
            <div class="text-lg md:text-xl flex flex-col text-center">
              <h3>Nota</h3>
              <p>
                <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
                {{ full_anime.score }}
              </p>
            </div>
            <div class="text-lg md:text-xl flex flex-col text-center">
              <h3 class="text-center">Ranking</h3>
              <p>
                <span class="text-red-500 font-bold">#</span>
                {{ full_anime.popularity }}
              </p>
            </div>
          </div>
          <div
            class="flex-col gap-2 justify-around p-2 rounded-lg bg-zinc-950 break-words min-[510px]:overflow-y-auto min-[510px]:h-[353px] md:h-fit"
          >
            <div class="flex flex-col gap-4">
              <div
                class="border-b-[1px] border-b-red-500 pb-1 gap-2 font-bold text-lg"
              >
                Informações
              </div>
              <div>
                <span class="font-bold text-red-200">Transmissão</span>
                <div class="text-sm">{{ full_anime.broadcast.string }}</div>
              </div>
              <div>
                <span class="font-bold text-red-200">Produtores</span>
                <div v-for="producers in full_anime.producers">
                  <NuxtLink
                    :to="`/producers/${producers.mal_id}`"
                    class="transition ease-out duration-300 hover:text-red-500 text-sm"
                    >{{ producers.name }}</NuxtLink
                  >
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Licenciantes</span>
                <div v-for="licensors in full_anime.licensors">
                  <NuxtLink
                    :to="`/producers/${licensors.mal_id}`"
                    class="transition ease-out duration-300 hover:text-red-500 text-sm"
                    >{{ licensors.name }}</NuxtLink
                  >
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Estúdios</span>
                <div v-for="studios in full_anime.studios">
                  <NuxtLink
                    :to="`/producers/${studios.mal_id}`"
                    class="transition ease-out duration-300 hover:text-red-500 text-sm"
                    >{{ studios.name }}</NuxtLink
                  >
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Gêneros</span>
                <div v-for="genres in full_anime.genres">
                  <span class="text-sm">{{ genres.name }}</span>
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Demografias</span>
                <div v-for="demographics in full_anime.demographics">
                  <span class="text-sm">{{ demographics.name }}</span>
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Externo</span>
                <div v-for="external in full_anime.external">
                  <NuxtLink
                    :to="external.url"
                    target="_blank"
                    class="transition ease-out duration-300 hover:text-red-500 text-sm"
                    >{{ external.name }}</NuxtLink
                  >
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Streaming</span>
                <div v-for="streaming in full_anime.streaming">
                  <NuxtLink
                    :to="streaming.url"
                    target="_blank"
                    class="transition ease-out duration-300 hover:text-red-500 text-sm"
                    >{{ streaming.name }}</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="border-b-[1px] border-b-red-500 pb-1 font-bold">
          <h1 class="text-xl md:text-2xl">{{ full_anime.title }}</h1>
          <h2 class="text-sm md:text-base text-zinc-500">
            {{ full_anime.title_japanese }}
          </h2>
        </div>
        <span class="text-sm text-zinc-300"
          >{{ full_anime.episodes }} Episodes / {{ full_anime.duration }} /
          {{ full_anime.status }}</span
        >
        <div
          class="text-xl md:text-2xl border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
        >
          Sinopse
        </div>
        <p class="text-sm text-zinc-300">{{ full_anime.synopsis }}</p>
        <div
          class="text-xl md:text-2xl border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
        >
          Background
        </div>
        <p class="text-sm text-zinc-300">{{ full_anime.background }}</p>
        <div
          class="flex justify-between border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
        >
          <h1 class="text-xl md:text-2xl">Episódios</h1>
          <div
            @click="episodesMenu = !episodesMenu"
            class="flex justify-center items-center gap-1 cursor-pointer select-none transition ease-in-out duration-300 hover:text-red-500"
          >
            <span class="text-sm">VER TODOS</span>
            <font-awesome-icon
              v-if="episodesMenu"
              :icon="'chevron-left'"
              class="text-xs"
            />
            <font-awesome-icon v-else :icon="'chevron-right'" class="text-xs" />
          </div>
        </div>
        <TransitionGroup name="episodes">
          <div
            v-if="episodesMenu && episodes.length > 0"
            v-for="episode in episodes"
          >
            <div
              class="bg-zinc-950 bg-gradient-to-r from-zinc-950 from-10% via-zinc-950 hover:to-red-500 to-100%"
            >
              <NuxtLink
                :to="episode.url"
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
              </NuxtLink>
            </div>
          </div>
        </TransitionGroup>
        <div v-if="!episodesMenu && episodes.length > 0">
          <div class="bg-zinc-950 p-2 text-center">
            Encontrados
            <span class="font-bold">{{
              formatSearch(episodes_pagination.last_visible_page)
            }}</span>
            páginas de episódios.
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { TransitionGroup } from "vue";

export default {
  components: { TransitionGroup },
  data() {
    return {
      anime: [],
      character: [],
      staff: [],
      episodes: [],
      episodes_pagination: [],
      episodes_total: 0,
      episodesMenu: false,
    };
  },
  async mounted() {
    const { id } = useRoute().params;
    this.loadAnime(id);
    this.loadAnimeCharacters(id);
    setTimeout(() => {
      this.loadAnimeStaff(id);
      this.loadAnimeEpisodes(id);
    }, "3000");
  },
  methods: {
    async loadAnime(id) {
      const data = await $fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
      this.anime = data;
    },
    async loadAnimeCharacters(id) {
      const data = await $fetch(
        `https://api.jikan.moe/v4/anime/${id}/characters`
      );
      this.character = data;
    },
    async loadAnimeStaff(id) {
      const data = await $fetch(`https://api.jikan.moe/v4/anime/${id}/staff`);
      this.staff = data;
    },
    async loadAnimeEpisodes(id) {
      const data = await $fetch(
        `https://api.jikan.moe/v4/anime/${id}/episodes?limit=10`
      );
      this.episodes = data.data;
      this.episodes_pagination = data.pagination;
    },
    formatSearch(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
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
