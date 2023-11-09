<template>
  <header
    class="bg-zinc-800 fixed w-full h-16 flex items-center z-10 gap-2 md:justify-around md:px-5"
  >
    <div
      @click="mobileMenu = !mobileMenu"
      class="cursor-pointer h-full md:hidden inline-block px-6 hover:bg-zinc-900"
    >
      <div class="relative flex items-center justify-center gap-2 h-full">
        <font-awesome-icon
          v-if="!mobileMenu"
          class="text-xl"
          :icon="'fa-bars'"
        />
        <font-awesome-icon v-else class="text-xl" :icon="'fa-times'" />
      </div>
      <div
        v-if="mobileMenu"
        class="flex flex-col absolute left-0 z-10 w-60 h-fit bg-zinc-900"
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
        <NuxtLink to="/characters" class="px-4 py-2 hover:bg-zinc-700 w-full"
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
      <NuxtLink to="/animes" class="flex items-center px-5 hover:bg-zinc-900"
        >Animes</NuxtLink
      >
      <NuxtLink to="/mangas" class="flex items-center px-5 hover:bg-zinc-900"
        >Mangás</NuxtLink
      >
      <NuxtLink to="/magazines" class="flex items-center px-5 hover:bg-zinc-900"
        >Revistas</NuxtLink
      >
      <div
      @click="menu = !menu"
        class="relative cursor-pointer inline-block px-5 hover:bg-zinc-900 group"
      >
        <div  class="flex items-center gap-2 h-full">
          Navegar
          <font-awesome-icon
          v-if="!menu"
          class="text-xs"
          :icon="'fa-chevron-down'"
        />
        <font-awesome-icon v-else class="text-xs" :icon="'fa-chevron-up'" />
        </div>
        <div v-if="menu" class="flex flex-col absolute z-10 right-0 w-60 h-fit bg-zinc-900">
          <NuxtLink
            to="/seasons"
            class="px-4 py-2 hover:bg-zinc-700 w-full text-end"
            >Temporadas</NuxtLink
          >
          <NuxtLink
            to="/characters"
            class="px-4 py-2 hover:bg-zinc-700 w-full text-end"
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
      menu: false,
      mobileMenu: false,
    };
  },
};
</script>
