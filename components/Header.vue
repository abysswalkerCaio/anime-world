<template>
  <header
    class="bg-zinc-800 fixed w-full h-16 flex items-center z-10 gap-2 md:justify-around md:px-5 select-none"
  >
    <div
      @click="mobileMenu = !mobileMenu"
      :class="{ 'bg-zinc-900': mobileMenu }"
      class="cursor-pointer h-full w-16 md:hidden inline-block px-6 hover:bg-zinc-900"
    >
      <div class="relative flex items-center justify-center gap-2 h-full">
        <transition name="fade">
          <font-awesome-icon
            v-if="!mobileMenu"
            class="text-xl absolute"
            :icon="'fa-bars'"
          />
          <font-awesome-icon v-else class="text-xl" :icon="'fa-times'" />
        </transition>
      </div>
      <transition name="slide-fade">
        <div
          v-if="mobileMenu"
          class="flex flex-col absolute left-0 z-10 w-[172px] h-fit bg-zinc-900"
        >
          <NuxtLink to="/animes" class="px-4 py-2 hover:bg-zinc-700 w-full"
            >Animes</NuxtLink
          >
          <NuxtLink to="/mangas" class="px-4 py-2 hover:bg-zinc-700 w-full"
            >Mangás</NuxtLink
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
            >Estúdios</NuxtLink
          >
        </div>
      </transition>
    </div>
    <NuxtLink to="/" class="h-full flex items-center justify-center">
      <img src="../img/anime-world-logo.png" alt="Anime World logo" />
    </NuxtLink>
    <nav class="max-[767px]:hidden flex h-full">
      <NuxtLink to="/animes" class="flex items-center px-5 hover:bg-zinc-900"
        >Animes</NuxtLink
      >
      <NuxtLink to="/mangas" class="flex items-center px-5 hover:bg-zinc-900"
        >Mangás</NuxtLink
      >
      <div
        @click="menu = !menu"
        :class="{ 'bg-zinc-900': menu }"
        class="relative cursor-pointer inline-block px-5 hover:bg-zinc-900 group"
      >
        <div class="flex relative items-center gap-2 h-full">
          Navegar
          <font-awesome-icon
            v-if="!menu"
            class="text-xs"
            :icon="'fa-chevron-down'"
          />
          <font-awesome-icon v-else class="text-xs" :icon="'fa-chevron-up'" />
        </div>
        <transition name="slide-fade">
          <div
            v-if="menu"
            class="flex flex-col absolute z-10 right-0 w-[310.767px] h-fit bg-zinc-900"
          >
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
              >Estúdios</NuxtLink
            >
          </div>
        </transition>
      </div>
    </nav>
    <div
      class="flex justify-center items-center last:ml-auto md:last:ml-0 w-[100px] h-full text-2xl"
    >
      <font-awesome-icon
        @click="qrCodeModal = true"
        :icon="'fa-qrcode'"
        class="cursor-pointer transition ease-in-out duration-300 hover:text-red-500"
      />
      <UModal v-model="qrCodeModal">
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-sm min-[400px]:text-base font-semibold leading-6 text-black"
              >
                Deseja acessar o site pelo seu celular?
              </h3>
              <button
                class="p-2 px-4 text-xl outline-none outlin transition ease-in-out duration-300 hover:text-red-500"
                @click="qrCodeModal = false"
              >
                <font-awesome-icon :icon="'fa-times'" />
              </button>
            </div>
          </template>
          <img src="../img/anime-world-qr-code.png" alt="Anime World QR Code" />
        </UCard>
      </UModal>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      mobileMenu: false,
      qrCodeModal: false,
    };
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: rotate(-180deg);
  opacity: 0;
}
</style>
