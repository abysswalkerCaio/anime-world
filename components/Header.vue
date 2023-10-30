<template>
  <header
    class="bg-zinc-800 fixed w-full h-16 flex items-center justify-between z-10 md:justify-around pl-5 md:px-5"
  >
    <h1 class="text-orange-500 h-full flex items-center justify-center">
      Anime World
    </h1>
    <div
      :class="'cursor-pointer w-16 h-full text-center hover:bg-slate-950 md:hidden'"
    >
      <button @click="open" class="h-full w-full">
        <font-awesome-icon class="text-2xl" v-if="active" :icon="'fa-times'" />
        <font-awesome-icon class="text-2xl" v-else :icon="'fa-bars'" />
      </button>
      <nav v-if="active">
        <div
          class="bg-slate-950 cursor-default absolute w-60 overflow-y-scroll h-72 z-10 right-0 flex flex-col"
        >
          <NuxtLink
            class="cursor-pointer w-full text-end hover:bg-zinc-700 px-5 py-2"
            >Animes</NuxtLink
          >
          <NuxtLink
            class="cursor-pointer w-full text-end hover:bg-zinc-700 px-5 py-2"
            >Mangás</NuxtLink
          >
          <NuxtLink
            class="cursor-pointer w-full text-end hover:bg-zinc-700 px-5 py-2"
            >Revistas</NuxtLink
          ><NuxtLink
            class="cursor-pointer w-full text-end hover:bg-zinc-700 px-5 py-2"
            >Temporadas</NuxtLink
          >
          <div
            @click="openSubmenu"
            class="cursor-pointer w-full text-end flex justify-between items-center hover:bg-zinc-700 px-5 py-2"
          >
            <font-awesome-icon v-if="subActive" :icon="'fa-chevron-up'" />
            <font-awesome-icon v-else :icon="'fa-chevron-down'" />
            <span>Gêneros</span>
          </div>
          <div
            v-if="subActive"
            class="cursor-pointer w-full text-sm text-end bg-neutral-800"
          >
            <span
              class="flex flex-col hover:bg-neutral-900 px-7 py-2"
              v-for="genre in genres"
              >{{ genre.name }}</span
            >
          </div>
          <NuxtLink
            class="cursor-pointer w-full text-end hover:bg-zinc-700 px-5 py-2 border-t-2 border-zinc-700"
            >Personagens</NuxtLink
          >
          <NuxtLink
            class="cursor-pointer w-full text-end hover:bg-zinc-700 px-5 py-2"
            >Pessoas</NuxtLink
          >
          <NuxtLink
            class="cursor-pointer w-full text-end hover:bg-zinc-700 px-5 py-2"
            >Produtores</NuxtLink
          >
        </div>
      </nav>
    </div>
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
    open() {
      this.active = !this.active;
    },
    openSubmenu() {
      this.subActive = !this.subActive;
    },
  },
};
</script>
