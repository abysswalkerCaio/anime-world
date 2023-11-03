<template>
  <header
    class="bg-zinc-800 fixed w-full h-16 flex items-center z-10 gap-2 md:justify-around md:px-5"
  >
    <div
      class="cursor-default h-full md:hidden inline-block px-6 hover:bg-zinc-950 group"
    >
      <div class="relative flex items-center justify-center gap-2 h-full">
        <font-awesome-icon
          class="text-xl absolute group-hover:rotate-180 transition duration-150 group-hover:opacity-0"
          :icon="'fa-bars'"
        />
        <font-awesome-icon
          class="text-xl opacity-0 group-hover:rotate-180 transition duration-150 group-hover:opacity-100"
          :icon="'fa-times'"
        />
      </div>
      <div
        class="hidden absolute left-0 z-10 w-60 h-fit bg-zinc-950 group-hover:flex group-hover:flex-col"
      >
        <NuxtLink to="/animes" class="px-4 py-2 hover:bg-zinc-700 w-full"
          >Animes</NuxtLink
        >
        <NuxtLink to="/mangas" class="px-4 py-2 hover:bg-zinc-700 w-full"
          >Mangás</NuxtLink
        >
        <NuxtLink to="/magazines" class="px-4 py-2 hover:bg-zinc-700 w-full"
          >Revistas</NuxtLink
        >
        <NuxtLink to="/seasons" class="px-4 py-2 hover:bg-zinc-700 w-full"
          >Temporadas</NuxtLink
        >
        <NuxtLink to="/genres" class="px-4 py-2 hover:bg-zinc-700 w-full"
          >Gêneros</NuxtLink
        >
        <NuxtLink
          to="/characters"
          class="px-4 border-zinc-700 border-t-2 py-2 hover:bg-zinc-700 w-full"
          >Personagens</NuxtLink
        >
        <NuxtLink to="/people" class="px-4 py-2 hover:bg-zinc-700 w-full"
          >Artistas</NuxtLink
        >
        <NuxtLink to="/producers" class="px-4 py-2 hover:bg-zinc-700 w-full"
          >Produtores</NuxtLink
        >
      </div>
    </div>
    <NuxtLink
      to="/"
      class="text-red-500 text-lg font-bold h-full flex items-center justify-center"
    >
      <img src="../img/anime-world-logo.png" />
    </NuxtLink>
    <nav class="max-[767px]:hidden flex h-full">
      <NuxtLink to="/animes" class="flex items-center px-5 hover:bg-zinc-950"
        >Animes</NuxtLink
      >
      <NuxtLink to="/mangas" class="flex items-center px-5 hover:bg-zinc-950"
        >Mangás</NuxtLink
      >
      <NuxtLink to="/magazines" class="flex items-center px-5 hover:bg-zinc-950"
        >Revistas</NuxtLink
      >
      <div
        class="relative cursor-default inline-block px-5 hover:bg-zinc-950 group"
      >
        <div class="flex items-center gap-2 h-full">
          Navegar
          <font-awesome-icon
            class="text-xs group-hover:rotate-180 transition duration-150"
            :icon="'chevron-down'"
          />
        </div>
        <div
          class="hidden absolute z-10 right-0 w-60 h-fit bg-zinc-950 group-hover:flex group-hover:flex-col"
        >
          <NuxtLink
            to="/seasons"
            class="px-4 py-2 hover:bg-zinc-700 w-full text-end"
            >Temporadas</NuxtLink
          >
          <NuxtLink
            to="/genres"
            class="px-4 py-2 hover:bg-zinc-700 w-full text-end"
            >Gêneros</NuxtLink
          >
          <NuxtLink
            to="/characters"
            class="px-4 py-2 border-zinc-700 border-t-2 hover:bg-zinc-700 w-full text-end"
            >Personagens</NuxtLink
          >
          <NuxtLink
            to="/people"
            class="px-4 py-2 hover:bg-zinc-700 w-full text-end"
            >Artistas</NuxtLink
          >
          <NuxtLink
            to="/producers"
            class="px-4 py-2 hover:bg-zinc-700 w-full text-end"
            >Produtores</NuxtLink
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      genres: [],
      mobileMenu: false,
      mobileSubmenu: false,
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
