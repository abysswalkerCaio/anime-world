<template>
  <footer class="bg-zinc-800 py-5 flex-col">
    <div class="flex justify-center gap-4">
      <NuxtLink
        class="text-3xl transition ease-in-out duration-300 hover:text-red-500"
        to="https://www.instagram.com/abysswalkercaio/"
        target="_blank"
      >
        <font-awesome-icon :icon="'fa-brands fa-instagram'" />
      </NuxtLink>
      <NuxtLink
        class="text-3xl transition ease-in-out duration-300 hover:text-red-500"
        to="https://br.pinterest.com/abysswalkerCaio/"
        target="_blank"
      >
        <font-awesome-icon :icon="'fa-brands fa-pinterest'" />
      </NuxtLink>
      <NuxtLink
        class="text-3xl transition ease-in-out duration-300 hover:text-red-500"
        to="https://github.com/abysswalkerCaio"
        target="_blank"
      >
        <font-awesome-icon :icon="'fa-brands fa-github'" />
      </NuxtLink>
    </div>
    <span class="flex justify-center mt-4 opacity-60">@ 2023 Caio Costa</span>
  </footer>
</template>
