<template>
  <div
    class="relative bg-black text-white grid grid-rows-[1fr_120px] min-h-screen"
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
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
