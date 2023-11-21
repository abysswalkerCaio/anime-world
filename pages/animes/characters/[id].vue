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
      <TransitionGroup name="characters">
        <div
          v-if="characters.length > 0 && !loading"
          class="mt-10 flex flex-col gap-3"
        >
          <h1 class="text-xl md:text-2xl mb-5 font-bold">
            Lista de personagens
          </h1>
          <div v-for="character in characters">
            <div
              class="bg-zinc-950 bg-gradient-to-r from-zinc-950 from-10% via-zinc-950 hover:to-red-500 to-100%"
            >
              <NuxtLink
                :to="`/characters/${character.character.mal_id}`"
                class="flex gap-4"
              >
                <div class="w-28 min-h-[175px] h-auto flex-none">
                  <img
                    :src="character.character.images.jpg.image_url"
                    :alt="character.name + ' image'"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="flex flex-col py-2 justify-between">
                  <h1 class="text-lg md:text-xl">
                    {{ character.character.name }}
                  </h1>
                  <h2 class="text-zinc-400 md:text-lg">
                    {{ character.role }}
                  </h2>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </TransitionGroup>
      <div v-if="loading">
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
        v-else-if="characters.length < 1 && !loading"
        class="mt-5 mb-10 text-center md:text-lg"
      >
        Nenhum resultado encontrado.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anime_id: "",
      characters: [],
      loading: true,
    };
  },
  mounted() {
    const { id } = useRoute().params;
    this.anime_id = id;
    this.loadAnimeCharacters(id);
  },
  methods: {
    async loadAnimeCharacters(id) {
      const data = await $fetch(
        `https://api.jikan.moe/v4/anime/${this.anime_id}/characters`
      );
      this.characters = data.data;
      this.loading = false;
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
