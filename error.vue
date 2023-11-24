<template>
  <div>
    <Head>
      <Title>Algo está errado!</Title>
    </Head>
    <NuxtLayout>
      <div
        class="flex flex-col gap-4 min-h-screen w-full items-center justify-center general-font bg-zinc-950 px-4"
      >
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl 2xl:text-[80px] font-black text-red-500"
        >
          Ops!
        </h1>
        <p class="text-white opacity-50">
          Encontramos um problema, mas fica tranquilo! É só clicar no botão abaixo e continuar explorandos os milhares de universos!
        </p>
        <NuxtLink
          :to="'/'"
          class="text-red-500 text-center border-2 border-red-500 transition ease-out hover:text-red-300 hover:border-red-300 rounded-lg p-3 w-32"
        >
          Início
        </NuxtLink>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class:
      "scrollbar scrollbar-thumb-red-500 scrollbar-track-zinc-950 scrollbar-w-2",
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

.general-font {
  font-family: "Lato", sans-serif;
}
</style>
