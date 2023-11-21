<template>
  <div class="py-24">
    <div class="px-5 flex flex-col md:px-0 md:items-center">
      <div class="w-full lg:w-[984px]">
        <div class="flex items-center text-lg">
          <NuxtLink
            class="flex items-center text-red-500 border-transparent border-2 p-3 rounded-xl transition duration-300 ease-in-out hover:text-red-300 hover:border-red-300"
            to="/characters"
          >
            <font-awesome-icon :icon="'fa-arrow-left'" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="mt-10 px-5 flex flex-col md:flex-row md:px-0 justify-center">
      <div v-if="character.length < 1">
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
        v-for="full_character in character"
        class="flex flex-col gap-4 md:flex-row h-full w-full lg:w-[984px]"
      >
        <div
          class="flex flex-col flex-none gap-2 min-[510px]:flex-row md:flex-col md:w-[300px]"
        >
          <img
            class="rounded-xl object-cover w-full h-[400px] min-[400px]:h-[600px] min-[510px]:h-[425px] shadow-lg shadow-red-900/50"
            :src="full_character.images.jpg.image_url"
            :alt="full_character.name + ' image'"
          />
          <div class="flex flex-col gap-2 w-full">
            <div
              class="flex gap-2 justify-around px-1 py-2 rounded-lg bg-zinc-950"
            >
              <div class="text-lg md:text-xl flex flex-col text-center">
                <h3>Favoritos</h3>
                <div v-if="full_character.favorites">
                  <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
                  {{ full_character.favorites }}
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
                  <span class="font-bold text-red-200">Apelidos</span>
                  <div
                    v-if="full_character.nicknames.length > 0"
                    v-for="nicknames in full_character.nicknames"
                  >
                    <span class="ext-sm">{{ nicknames }}</span>
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Animes</span>
                  <div
                    v-if="full_character.anime.length > 0"
                    v-for="anime in full_character.anime"
                    class="flex flex-col gap-2"
                  >
                    <div v-for="anime_data in anime">
                      <NuxtLink
                        :to="`/animes/${anime_data.mal_id}`"
                        class="transition ease-out duration-300 hover:text-red-500 text-sm"
                        >{{ anime_data.title }}</NuxtLink
                      >
                    </div>
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Mangás</span>
                  <div
                    v-if="full_character.manga.length > 0"
                    v-for="manga in full_character.manga"
                    class="flex flex-col gap-2"
                  >
                    <div v-for="manga_data in manga">
                      <NuxtLink
                        :to="`/mangas/${manga_data.mal_id}`"
                        class="transition ease-out duration-300 hover:text-red-500 text-sm"
                        >{{ manga_data.title }}</NuxtLink
                      >
                    </div>
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full font-bold">
          <h1 class="text-xl md:text-2xl">{{ full_character.name }}</h1>
          <h2 class="text-sm md:text-base text-zinc-500">
            {{ full_character.name_kanji }}
          </h2>
          <div
            class="text-xl md:text-2xl border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
          >
            Sinopse
          </div>
          <p
            v-if="full_character.about"
            class="text-sm text-zinc-300 leading-6"
          >
            {{ full_character.about }}
          </p>
          <span v-else class="text-sm text-zinc-300">Nada informado.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      character: [],
      character_id: "",
    };
  },
  async mounted() {
    const { id } = useRoute().params;
    this.character_id = id;
    this.loadCharacter(id);
  },
  methods: {
    async loadCharacter(id) {
      const data = await $fetch(
        `https://api.jikan.moe/v4/characters/${id}/full`
      );
      this.character = data;
    },
    formatSearch(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
    },
  },
};
</script>
