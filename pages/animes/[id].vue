<template>
  <div class="py-24">
    <div class="px-5 flex flex-col md:px-0 md:items-center">
      <div class="w-full lg:w-[984px]">
        <div class="flex items-center text-lg">
          <NuxtLink
            class="flex items-center text-red-500 border-transparent border-2 p-3 rounded-xl transition duration-300 ease-in-out hover:text-red-300 hover:border-red-300"
            to="/animes"
          >
            <font-awesome-icon :icon="'fa-arrow-left'" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="mt-10 px-5 flex flex-col md:flex-row md:px-0 justify-center">
      <div v-if="anime.length < 1">
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
                <div v-if="full_anime.score">
                  <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
                  {{ full_anime.score }}
                </div>
                <span v-else>N/A</span>
              </div>
              <div class="text-lg md:text-xl flex flex-col text-center">
                <h3 class="text-center">Ranking</h3>
                <div v-if="full_anime.popularity">
                  <span class="text-red-500 font-bold">#</span>
                  {{ full_anime.popularity }}
                </div>
                <span v-else>N/A</span>
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
                  <div v-if="full_anime.broadcast.string" class="text-sm">
                    {{ full_anime.broadcast.string }}
                  </div>
                  <div v-else>Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Produtores</span>
                  <div
                    v-if="full_anime.producers.length > 0"
                    v-for="producers in full_anime.producers"
                  >
                    <NuxtLink
                      :to="`/producers/${producers.mal_id}`"
                      class="transition ease-out duration-300 hover:text-red-500 text-sm"
                      >{{ producers.name }}</NuxtLink
                    >
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Licenciantes</span>
                  <div
                    v-if="full_anime.licensors.length > 0"
                    v-for="licensors in full_anime.licensors"
                  >
                    <NuxtLink
                      :to="`/producers/${licensors.mal_id}`"
                      class="transition ease-out duration-300 hover:text-red-500 text-sm"
                      >{{ licensors.name }}</NuxtLink
                    >
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Estúdios</span>
                  <div
                    v-if="full_anime.studios.length > 0"
                    v-for="studios in full_anime.studios"
                  >
                    <NuxtLink
                      :to="`/producers/${studios.mal_id}`"
                      class="transition ease-out duration-300 hover:text-red-500 text-sm"
                      >{{ studios.name }}</NuxtLink
                    >
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Gêneros</span>
                  <div
                    v-if="full_anime.genres.length > 0"
                    v-for="genres in full_anime.genres"
                  >
                    <span class="text-sm">{{ genres.name }}</span>
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Demografias</span>
                  <div
                    v-if="full_anime.demographics.length > 0"
                    v-for="demographics in full_anime.demographics"
                  >
                    <span class="text-sm">{{ demographics.name }}</span>
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Externo</span>
                  <div
                    v-if="full_anime.external.length > 0"
                    v-for="external in full_anime.external"
                  >
                    <a
                      :href="external.url"
                      target="_blank"
                      class="transition ease-out duration-300 hover:text-red-500 text-sm"
                      >{{ external.name }}</a
                    >
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Streaming</span>
                  <div
                    v-if="full_anime.streaming.length > 0"
                    v-for="streaming in full_anime.streaming"
                  >
                    <a
                      :href="streaming.url"
                      target="_blank"
                      class="transition ease-out duration-300 hover:text-red-500 text-sm"
                      >{{ streaming.name }}</a
                    >
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <div class="border-b-[1px] border-b-red-500 pb-1 font-bold">
            <h1 class="text-xl md:text-2xl">{{ full_anime.title }}</h1>
            <h2 class="text-sm md:text-base text-zinc-500">
              {{ full_anime.title_japanese }}
            </h2>
          </div>
          <div class="text-sm text-zinc-300">
            <span v-if="full_anime.episodes"
              >{{ full_anime.episodes }} Episodes</span
            >
            <span v-else>Não informado.</span>
            / <span v-if="full_anime.duration">{{ full_anime.duration }}</span>
            <span v-else>Nada informado</span> /
            <span v-if="full_anime.status">{{ full_anime.status }}</span>
            <span v-else>Nada informado.</span>
          </div>
          <div
            class="text-xl md:text-2xl border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
          >
            Sinopse
          </div>
          <p v-if="full_anime.synopsis" class="text-sm text-zinc-300 leading-6">
            {{ full_anime.synopsis }}
          </p>
          <span v-else class="text-sm text-zinc-300">Nada informado.</span>
          <div
            class="text-xl md:text-2xl border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
          >
            Background
          </div>
          <p
            v-if="full_anime.background"
            class="text-sm text-zinc-300 leading-6"
          >
            {{ full_anime.background }}
          </p>
          <span v-else>Nada informado.</span>
          <div
            class="flex justify-between border-b-[1px] border-b-red-500 pb-1 mt-4"
          >
            <h1 class="text-xl md:text-2xl font-bold">Episódios</h1>
          </div>
          <NuxtLink
            :to="`episodes/${anime_id}`"
            class="flex items-center justify-center bg-zinc-950 rounded-lg p-2 text-lg md:text-xl font-bold gap-2 transition ease-in-out duration-300 hover:text-red-500"
          >
            VER TODOS
            <font-awesome-icon :icon="'fa-arrow-right'" />
          </NuxtLink>
          <div
            class="flex justify-between border-b-[1px] border-b-red-500 pb-1 mt-4"
          >
            <h1 class="text-xl md:text-2xl font-bold">Pesonagens</h1>
          </div>
          <NuxtLink
            :to="`characters/${anime_id}`"
            class="flex items-center justify-center bg-zinc-950 rounded-lg p-2 text-lg md:text-xl font-bold gap-2 transition ease-in-out duration-300 hover:text-red-500"
          >
            VER TODOS
            <font-awesome-icon :icon="'fa-arrow-right'" />
          </NuxtLink>
          <div
            class="flex justify-between border-b-[1px] border-b-red-500 pb-1 mt-4"
          >
            <h1 class="text-xl md:text-2xl font-bold">Staff</h1>
          </div>
          <NuxtLink
            :to="`staff/${anime_id}`"
            class="flex items-center justify-center bg-zinc-950 rounded-lg p-2 text-lg md:text-xl font-bold gap-2 transition ease-in-out duration-300 hover:text-red-500"
          >
            VER TODOS
            <font-awesome-icon :icon="'fa-arrow-right'" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anime: [],
      anime_id: "",
    };
  },
  async mounted() {
    const { id, title } = useRoute().params;
    this.anime_id = id;
    this.loadAnime(id);
  },
  methods: {
    async loadAnime(id) {
      const data = await $fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
      this.anime = data;
    },
    formatSearch(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
    },
  },
};
</script>
