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
      <TransitionGroup name="openings">
        <div v-if="themes && !loading" class="mt-10 flex flex-col gap-3">
          <h1 class="text-xl md:text-2xl mb-5 font-bold">Lista de aberturas</h1>
          <div v-for="theme in themes.openings">
            <div class="bg-zinc-950 text-gray-300 flex flex-col p-2 gap-2">
              <h1>{{ theme }}</h1>
            </div>
          </div>
        </div>
      </TransitionGroup>
      <TransitionGroup name="endings">
        <div v-if="themes && !loading" class="mt-10 flex flex-col gap-3">
          <h1 class="text-xl md:text-2xl mb-5 font-bold">
            Lista de encerramentos
          </h1>
          <div v-for="theme in themes.endings">
            <div class="bg-zinc-950 text-gray-300 flex flex-col p-2 gap-2">
              <h1>{{ theme }}</h1>
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
        v-else-if="themes.length < 1 && !loading"
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
      themes: [],
      loading: true,
    };
  },
  mounted() {
    const { id } = useRoute().params;
    this.anime_id = id;
    this.loadAnimeThemes(id);
  },
  methods: {
    async loadAnimeThemes(id) {
      const data = await $fetch(`https://api.jikan.moe/v4/anime/${id}/themes`);
      this.themes = data.data;
      this.loading = false;
    },
  },
};
</script>

<style>
.openings-enter-active {
  transition: all 0.4s ease-out;
}

.openings-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.openings-enter-from,
.openings-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.endings-enter-active {
  transition: all 0.4s ease-out;
}

.endings-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.endings-enter-from,
.endings-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
