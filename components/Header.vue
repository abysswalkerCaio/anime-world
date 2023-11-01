<template>
  <header
    class="bg-zinc-800 fixed w-full h-16 flex items-center z-10 gap-2 md:justify-around md:px-5"
  >
    <div
      :class="'cursor-pointer w-16 h-full text-center hover:bg-zinc-950 md:hidden'"
    >
      <button @click="active = !active" class="h-full w-full">
        <font-awesome-icon class="text-2xl" v-if="active" :icon="'fa-times'" />
        <font-awesome-icon class="text-2xl" v-else :icon="'fa-bars'" />
      </button>
      <nav>
        <transition class="navbar">
          <div
            v-show="active"
            class="navbar bg-zinc-950 cursor-default absolute w-60 overflow-y-auto h-[322px] z-10 flex flex-col"
          >
            <NuxtLink
              to="/animes"
              class="cursor-pointer w-full text-start hover:bg-zinc-700 px-5 py-2"
              >Animes</NuxtLink
            >
            <NuxtLink
              to="/mangas"
              class="cursor-pointer w-full text-start hover:bg-zinc-700 px-5 py-2"
              >Mangás</NuxtLink
            >
            <NuxtLink
              to="magazines"
              class="cursor-pointer w-full text-start hover:bg-zinc-700 px-5 py-2"
              >Revistas</NuxtLink
            ><NuxtLink
              to="seasons"
              class="cursor-pointer w-full text-start hover:bg-zinc-700 px-5 py-2"
              >Temporadas</NuxtLink
            >
            <div
              @click="subActive = !subActive"
              class="cursor-pointer w-full text-start flex justify-between items-center hover:bg-zinc-700 px-5 py-2"
            >
              <span>Gêneros</span>
              <font-awesome-icon v-if="subActive" :icon="'fa-chevron-up'" />
              <font-awesome-icon v-else :icon="'fa-chevron-down'" />
            </div>
            <div
              v-show="subActive"
              class="cursor-pointer w-full text-sm text-start bg-neutral-800"
            >
              <span
                class="flex flex-col hover:bg-neutral-900 px-7 py-2"
                v-for="genre in genres"
                >{{ genre.name }}</span
              >
            </div>
            <NuxtLink
              to="characters"
              class="cursor-pointer w-full text-start hover:bg-zinc-700 px-5 py-2"
              >Personagens</NuxtLink
            >
            <NuxtLink
              to="people"
              class="cursor-pointer w-full text-start hover:bg-zinc-700 px-5 py-2"
              >Pessoas</NuxtLink
            >
            <NuxtLink
              to="producers"
              class="cursor-pointer w-full text-start hover:bg-zinc-700 px-5 py-2"
              >Produtores</NuxtLink
            >
          </div>
        </transition>
      </nav>
    </div>
    <NuxtLink
      to="/"
      class="text-red-500 text-lg font-bold h-full flex items-center justify-center"
    >
      <img src="../img/Anime World Logo.png" />
    </NuxtLink>
  </header>
</template>

<script>
export default {
  data() {
    return {
      genres: [],
      active: false,
      subActive: false,
    };
  },
  mounted() {
    this.loadGenres();
  },
  methods: {
    async loadGenres() {
      const data = await $fetch("https://api.jikan.moe/v4/genres/anime").catch(
        (error) => error.data
      );
      this.genres = data.data;
    },
  },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
