<template>
  <div class="px-5 py-20 flex flex-col md:flex-row md:px-0 justify-center">
    <div
      v-for="full_anime in anime"
      class="flex flex-col gap-2 md:flex-row h-full w-full lg:w-[984px]"
    >
      <div
        class="flex flex-col gap-2 min-[380px]:flex-row md:flex-col md:w-[300px]"
      >
        <img
          class="rounded-xl object-cover w-full max-w-[380px] h-[400px] min-[475px]:h-[425px] shadow-lg shadow-red-900/50"
          :src="full_anime.images.jpg.large_image_url"
          :alt="full_anime.title"
        />
        <div class="flex flex-col gap-2 w-full">
          <div class="flex gap-2 justify-around p-2 rounded-lg bg-zinc-900">
            <div
              class="text-2xl min-[380px]:text-xl md:text-2xl flex flex-col text-center"
            >
              <h3>Nota</h3>
              <p>
                <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
                {{ full_anime.score }}
              </p>
            </div>
            <div
              class="text-2xl min-[380px]:text-xl md:text-2xl flex flex-col text-center"
            >
              <h3 class="text-center">Ranking</h3>
              <p>
                <span class="text-red-500 font-bold">#</span>
                {{ full_anime.popularity }}
              </p>
            </div>
          </div>
          <div
            class="flex-col gap-2 justify-around p-2 rounded-lg bg-zinc-900 break-words min-[380px]:overflow-y-auto min-[380px]:h-[320px] min-[475px]:h-[345px] md:h-fit"
          >
            <div class="flex flex-col gap-4">
              <div
                class="border-b-2 border-b-red-500 pb-1 gap-2 font-bold text-lg"
              >
                Informações
              </div>
              <div>
                <span class="font-bold text-red-200">Transmissão: </span>
                <span class="text-sm">{{ full_anime.broadcast.string }}</span>
              </div>
              <div>
                <span class="font-bold text-red-200">Produtores:</span>
                <div v-for="producers in full_anime.producers">
                  <NuxtLink
                    :to="`/producers/${producers.mal_id}`"
                    class="transition ease-out duration-300 hover:text-red-500 text-sm"
                    >{{ producers.name }}</NuxtLink
                  >
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Licenciantes:</span>
                <div v-for="licensors in full_anime.licensors">
                  <NuxtLink
                    :to="`/producers/${licensors.mal_id}`"
                    class="transition ease-out duration-300 hover:text-red-500 text-sm"
                    >{{ licensors.name }}</NuxtLink
                  >
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Estúdios:</span>
                <div v-for="studios in full_anime.studios">
                  <NuxtLink
                    :to="`/producers/${studios.mal_id}`"
                    class="transition ease-out duration-300 hover:text-red-500 text-sm"
                    >{{ studios.name }}</NuxtLink
                  >
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Gêneros:</span>
                <div v-for="genres in full_anime.genres">
                  <span class="text-sm">{{ genres.name }}</span>
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Demografias:</span>
                <div v-for="demographics in full_anime.demographics">
                  <span class="text-sm">{{ demographics.name }}</span>
                </div>
              </div>
              <div>
                <span class="font-bold text-red-200">Externo:</span>
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
                <span class="font-bold text-red-200">Streaming:</span>
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
      <div class="flex-auto">
        Títulos, sinopse, background, personagens, artistas e relações em breve.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anime: [],
      character: [],
      staff: [],
    };
  },
  async mounted() {
    const { id } = useRoute().params;
    const anime_data = await $fetch(
      `https://api.jikan.moe/v4/anime/${id}/full`
    );
    const anime_characters_data = await $fetch(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    );
    const anime_staff_data = await $fetch(
      `https://api.jikan.moe/v4/anime/${id}/staff`
    );
    this.anime = anime_data;
    this.character = anime_characters_data;
    this.staff = anime_staff_data;
  },
};
</script>
