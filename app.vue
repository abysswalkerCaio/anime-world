<template>
  <div
    class="relative general-font bg-black text-white grid grid-rows-[1fr_120px] min-h-screen"
  >
    <Header></Header>
    <NuxtPage />
    <Footer></Footer>
  </div>
</template>

<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();
theme.global.name.value = "dark";

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

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
