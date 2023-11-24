<template>
  <div class="py-24">
    <Head>
      <Title>{{ title }}</Title>
    </Head>
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
      <div v-if="character?.length < 1">
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
            class="rounded-xl object-cover w-full h-[400px] min-[400px]:h-[600px] min-[510px]:h-[425px] min-[510px]:max-w-[300px] shadow-lg shadow-red-900/50"
            :src="full_character.images.jpg.image_url"
            :alt="full_character.name + ' image'"
          />
          <div class="flex flex-col gap-2 w-full">
            <div
              class="flex gap-2 justify-around px-1 py-2 rounded-lg bg-zinc-950"
            >
              <div class="text-lg md:text-xl flex flex-col text-center">
                <h3>Favoritos</h3>
                <div v-if="full_character?.favorites">
                  <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
                  {{ formatSearch(full_character.favorites) }}
                </div>
                <span v-else>N/A</span>
              </div>
            </div>
            <div
              class="flex-col gap-2 justify-around p-2 rounded-lg bg-zinc-950 break-words scrollbar scrollbar-thumb-red-500 scrollbar-w-2 min-[510px]:overflow-y-auto min-[510px]:h-[353px] md:h-fit"
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
                    v-if="full_character?.nicknames.length > 0"
                    v-for="nicknames in full_character.nicknames"
                  >
                    <span class="text-sm">{{ nicknames }}</span>
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Animes</span>
                  <div
                    v-if="full_character?.anime.length > 0"
                    v-for="anime in full_character.anime"
                  >
                    <NuxtLink
                      v-for="anime_data in anime"
                      :to="`/animes/${anime_data.mal_id}`"
                      class="underline underline-offset-4 decoration-zinc-400 transition ease-out duration-300 hover:text-red-500 hover:decoration-red-800 text-sm h-full w-fit"
                      >{{ anime_data.title }}</NuxtLink
                    >
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Mangás</span>
                  <div
                    v-if="full_character?.manga.length > 0"
                    v-for="manga in full_character.manga"
                  >
                    <NuxtLink
                      v-for="manga_data in manga"
                      :to="`/mangas/${manga_data.mal_id}`"
                      class="underline underline-offset-4 decoration-zinc-400 transition ease-out duration-300 hover:text-red-500 hover:decoration-red-800 text-sm w-fit"
                      >{{ manga_data.title }}</NuxtLink
                    >
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <div class="font-bold">
            <h1 class="text-xl md:text-2xl">{{ full_character.name }}</h1>
            <h2 class="text-sm md:text-base text-zinc-500">
              {{ full_character.name_kanji }}
            </h2>
          </div>
          <div
            class="text-xl md:text-2xl border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
          >
            Sobre
          </div>
          <p
            v-if="full_character?.about"
            class="text-sm text-zinc-300 leading-6"
          >
            {{ full_character.about }}
          </p>
          <span v-else class="text-sm text-zinc-300">Nada informado.</span>
          <div
            class="text-xl md:text-2xl border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
          >
            Dubladores
          </div>
          <TransitionGroup name="characters">
            <div v-if="full_character?.voices" class="flex flex-col gap-3">
              <div v-for="voices in full_character.voices">
                <div
                  class="bg-zinc-950 bg-gradient-to-r from-zinc-950 from-10% via-zinc-950 hover:to-red-500 to-100%"
                >
                  <NuxtLink
                    :to="`/people/${voices.person.mal_id}`"
                    class="flex gap-4"
                  >
                    <div class="w-28 min-h-[175px] h-auto flex-none">
                      <img
                        :src="voices.person.images.jpg.image_url"
                        :alt="voices.person.name + ' photo'"
                        class="h-full w-full object-cover"
                      />
                    </div>
                    <div class="flex flex-col py-2 justify-between">
                      <h1 class="text-lg md:text-xl mb-2">
                        {{ voices.person.name }}
                      </h1>
                      <h2 class="text-zinc-400 md:text-lg">
                        {{ voices.language }}
                      </h2>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </TransitionGroup>
          <div
            v-if="!full_character?.voices"
            class="mt-5 mb-10 text-center md:text-lg"
          >
            Nenhum resultado encontrado.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Anime World - ...",
      character: [],
      character_id: "",
    };
  },
  mounted() {
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
      this.title = "Anime World - " + this.character.data.name;
    },
    formatSearch(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
    },
  },
};
</script>

<style>
.characters-enter-active {
  transition: all 0.4s ease-out;
}

.characters-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.characters-enter-from,
.characters-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
